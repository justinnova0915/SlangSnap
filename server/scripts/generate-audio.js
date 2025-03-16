import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Google Cloud Text-to-Speech client
const ttsClient = new textToSpeech.TextToSpeechClient({
  keyFilename: path.join(__dirname, '..', 'google-credentials.json')
});

// AWS clients initialization
const loadAwsConfig = () => {
  const hasCredentials = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY;
  
  console.log('AWS Environment Variables Status:', {
    hasCredentials,
    region: process.env.AWS_REGION || 'us-east-2'
  });

  return {
    region: process.env.AWS_REGION || 'us-east-2',
    credentials: hasCredentials ? {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    } : undefined
  };
};

// Initialize S3 client if credentials are available
let s3Client;
try {
  s3Client = new S3Client(loadAwsConfig());
  console.log('S3 client initialized');
} catch (error) {
  console.warn('Failed to initialize S3 client:', error.message);
  s3Client = null;
}

// Log AWS configuration for debugging
console.log('AWS Configuration:', {
  region: 'us-east-2',
  hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
  hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY
});

const ddbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const docClient = DynamoDBDocumentClient.from(ddbClient);

// Terms to generate audio for
const terms = [
  {
    term_id: 'on_the_ball',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est purus, ultrices in porttitor in, accumsan non quam. Nam consectetur porttitor rhoncus. Curabitur eu est et leo feugiat auctor vel quis lorem. Ut et ligula dolor, sit amet consequat lorem. Aliquam porta eros sed velit imperdiet egestas. Maecenas tempus eros ut diam ullamcorper id dictum libero tempor. Donec quis augue quis magna condimentum lobortis. Quisque imperdiet ipsum vel magna viverra rutrum. Cras viverra molestie urna, vitae vestibulum turpis varius id. Nulla facilisi",
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Neural2-F',
      ssmlGender: 'FEMALE'
    }
  }
];

export async function generateAudio(text, outputPath, voice) {
  console.log('Generating audio:', { text, outputPath, voice });
  
  try {
    // Verify AWS credentials are loaded
    const credentials = await s3Client.config.credentials();
    if (!credentials) {
      throw new Error('AWS credentials not loaded');
    }
    console.log('AWS credentials verified');
    // Configure the synthesis request
    const request = {
      input: { text },
      voice: voice || {
        languageCode: 'en-US',
        name: 'en-US-Neural2-F',
        ssmlGender: 'FEMALE'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: 0,
        speakingRate: 1
      },
    };

    // Perform the text-to-speech request
    const [response] = await ttsClient.synthesizeSpeech(request);
    
    // Write the binary audio content to disk
    await fs.writeFile(outputPath, response.audioContent, 'binary');
    console.log('Audio content written to file:', outputPath);
    
    // Double check file exists and has content
    const stats = await fs.stat(outputPath);
    console.log(`Generated audio file size: ${stats.size} bytes`);
    
    if (stats.size === 0) {
      throw new Error('Generated audio file is empty');
    }

    // Upload to S3
    const s3Key = `audio-examples/${path.basename(outputPath)}`;
    await uploadToS3(outputPath, s3Key);
    
    return s3Key;
  } catch (error) {
    console.error('Speech generation error:', error);
    throw error;
  }
}

async function uploadToS3(filePath, key) {
  if (!s3Client) {
    console.log('S3 client not available - skipping upload');
    return null;
  }

  try {
    const fileContent = await fs.readFile(filePath);
    
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: fileContent,
      ContentType: 'audio/mp3'
    });
    
    await s3Client.send(command);
    console.log('File uploaded to S3 successfully');
    return key;
  } catch (error) {
    console.error('Error uploading to S3:', error.message);
    return null;
  }
}

async function createDynamoRecord(termId, audioKey) {
  const command = new PutCommand({
    TableName: 'audio_examples',
    Item: {
      term_id: termId,
      audio_key: audioKey,
      created_at: new Date().toISOString(),
      voice_id: 'en-US-Jenny' 
    }
  });
  
  return docClient.send(command);
}

async function main() {
  const tempDir = path.join(process.cwd(), 'temp');
  console.log('Temp directory:', tempDir);
  
  // Create temp directory if it doesn't exist
  try {
    await fs.mkdir(tempDir, { recursive: true });
    console.log('Temp directory created/verified');
  } catch (err) {
    console.error('Error creating temp directory:', err);
    throw err;
  }
  
  for (const term of terms) {
    try {
      console.log(`\nProcessing term: ${term.term_id}`);
      console.log('Text:', term.text);
      
      // Generate audio file
      const outputPath = path.join(tempDir, `${term.term_id}.mp3`); // Note: Changed to .mp3
      console.log('Output path:', outputPath);
      
      await generateAudio(term.text, outputPath, term.voice);
      
      // Verify file exists and has content
      const stats = await fs.stat(outputPath);
      console.log('Generated file size:', stats.size);
      if (stats.size === 0) {
        throw new Error('Generated audio file is empty');
      }
      
      // Upload to S3
      const s3Key = `audio-examples/${term.term_id}.wav`;
      console.log('Uploading to S3:', s3Key);
      await uploadToS3(outputPath, s3Key);
      console.log('Uploaded to S3 successfully');
      
      // Create DynamoDB record
      console.log('Creating DynamoDB record');
      await createDynamoRecord(term.term_id, s3Key);
      console.log('DynamoDB record created successfully');
      
      // Clean up temp file
      console.log('Cleaning up temp file');
      await fs.unlink(outputPath);
      console.log('Temp file removed');
      
    } catch (error) {
      console.error(`\nError processing term ${term.term_id}:`, error);
      // Continue with next term instead of stopping
      continue;
    }
  }
  
  // Clean up temp directory only if empty
  try {
    const files = await fs.readdir(tempDir);
    if (files.length === 0) {
      await fs.rmdir(tempDir);
      console.log('Temp directory removed');
    } else {
      console.log('Temp directory not empty, skipping removal');
      console.log('Remaining files:', files);
    }
  } catch (err) {
    console.error('Error handling temp directory cleanup:', err);
  }
}

main().catch(console.error);