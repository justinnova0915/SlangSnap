import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const execPromise = promisify(exec);

// AWS clients initialization
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
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
    text: "She's always on the ball with her project deadlines.",
    voice_id: 'Microsoft David Desktop', // Default Windows voice
  },
  // Add more terms as needed
];

// We could later add more voices like:
// 'Microsoft Zira Desktop' (female voice)
// 'Microsoft Mark Desktop'
// Check actual available voices in the PowerShell output

async function generateAudio(text, outputPath, voiceId) {
  console.log('Generating audio:', { text, outputPath, voiceId });
  
  const scriptPath = path.join(process.cwd(), 'scripts', 'generate-speech.ps1');
  
  try {
    // Execute the PowerShell script with parameters
    const command = `powershell -NoProfile -NonInteractive -File "${scriptPath}" -Text "${text}" -OutputPath "${outputPath}" -VoiceId "${voiceId || ''}"`;
    
    const { stdout, stderr } = await execPromise(command, { maxBuffer: 1024 * 1024 });
    
    // Process stdout line by line
    if (stdout) {
      stdout.split('\n').forEach(line => {
        if (line.trim()) console.log('PS >', line.trim());
      });
    }
    
    // Process stderr and throw if any errors
    if (stderr) {
      stderr.split('\n').forEach(line => {
        if (line.trim()) console.error('PS Error >', line.trim());
      });
      throw new Error('PowerShell script reported errors');
    }
    
    // Double check file exists and has content
    const stats = await fs.stat(outputPath);
    console.log(`Generated audio file size: ${stats.size} bytes`);
    
    if (stats.size === 0) {
      throw new Error('Generated audio file is empty');
    }
  } catch (error) {
    console.error('Speech generation error:', error);
    throw error;
  }
}

async function uploadToS3(filePath, key) {
  const fileContent = await fs.readFile(filePath);
  
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: fileContent,
    ContentType: 'audio/wav'
  });
  
  return s3Client.send(command);
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
      const outputPath = path.join(tempDir, `${term.term_id}.wav`);
      console.log('Output path:', outputPath);
      
      await generateAudio(term.text, outputPath, term.voice_id);
      
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