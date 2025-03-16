import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import fs from 'fs/promises';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAudio } from './generate-audio.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const ddbClient = new DynamoDBClient({
  region: 'us-east-2',  // Hardcoding region as fallback
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

// Log for debugging
console.log('AWS Configuration:', {
  region: process.env.AWS_REGION || 'us-east-2',
  hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
  hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY
});

const docClient = DynamoDBDocumentClient.from(ddbClient);

const difficulties = ['beginner', 'intermediate', 'advanced'];
const categories = ['business', 'sports', 'relationships', 'education', 'technology', 'everyday'];
const videoStyles = ['professional', 'casual', 'educational'];

async function promptForIdiomDetails() {
  const questions = [
    {
      type: 'input',
      name: 'idiom',
      message: 'What is the idiom?',
      validate: input => input.length > 0
    },
    {
      type: 'input',
      name: 'meaning',
      message: 'What is the meaning of this idiom?',
      validate: input => input.length > 0
    },
    {
      type: 'list',
      name: 'difficulty',
      message: 'Select the difficulty level:',
      choices: difficulties
    },
    {
      type: 'list',
      name: 'category',
      message: 'Select the category:',
      choices: categories
    },
    {
      type: 'input',
      name: 'example1',
      message: 'Enter the first example usage:',
      validate: input => input.length > 0
    },
    {
      type: 'input',
      name: 'example2',
      message: 'Enter the second example usage (optional):',
    }
  ];

  return inquirer.prompt(questions);
}

async function promptForVideoDetails() {
  const questions = [
    {
      type: 'input',
      name: 'context',
      message: 'Describe the scene for the video (e.g., "A person quickly responding in a business meeting"):',
      validate: input => input.length > 0
    },
    {
      type: 'list',
      name: 'style',
      message: 'Select the video style:',
      choices: videoStyles
    }
  ];

  return inquirer.prompt(questions);
}

async function generateAndUploadVideo(idiom, context, style) {
  console.log('\nGenerating video...');
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [
      path.join(process.cwd(), 'server', 'video-generation', 'test_generation.py'),
      '--idiom', idiom,
      '--context', context,
      '--style', style
    ]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Video Generation: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Video Generation Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Video generation failed with code ${code}`));
      }
    });
  });
}

async function addNewIdiom() {
  try {
    console.log('=== Add New Idiom to SlangSnap ===\n');
    
    // Step 1: Collect idiom details
    console.log('Step 1: Basic Information');
    const idiomDetails = await promptForIdiomDetails();
    
    // Step 2: Collect video generation details
    console.log('\nStep 2: Video Generation Details');
    const videoDetails = await promptForVideoDetails();
    
    const termId = uuidv4();
    
    // Step 3: Save to terms_table
    console.log('\nSaving idiom details...');
    await docClient.send(new PutCommand({
      TableName: 'terms_table',
      Item: {
        term_id: termId,
        idiom: idiomDetails.idiom,
        meaning: idiomDetails.meaning,
        difficulty: idiomDetails.difficulty,
        category: idiomDetails.category,
        examples: [
          idiomDetails.example1,
          ...(idiomDetails.example2 ? [idiomDetails.example2] : [])
        ],
        created_at: new Date().toISOString()
      }
    }));
    
    // Step 4: Generate audio files
    console.log('\nGenerating audio files...');
    const tempDir = path.join(process.cwd(), 'temp');
    
    // Create temp directory if it doesn't exist
    await fs.mkdir(tempDir, { recursive: true });
    
    const voices = [
      {
        languageCode: 'en-US',
        name: 'en-US-Neural2-F',
        ssmlGender: 'FEMALE'
      },
      {
        languageCode: 'en-US',
        name: 'en-US-Neural2-D',
        ssmlGender: 'MALE'
      }
    ];

    for (const voice of voices) {
      const outputPath = path.join(tempDir, `${termId}_${voice.ssmlGender.toLowerCase()}.mp3`);
      await generateAudio(idiomDetails.idiom, outputPath, voice);
      console.log(`Generated ${voice.ssmlGender.toLowerCase()} voice audio`);
    }
    
    // Step 5: Generate video
    await generateAndUploadVideo(
      idiomDetails.idiom,
      videoDetails.context,
      videoDetails.style
    );
    
    console.log('\n✅ Successfully added new idiom!');
    console.log(`ID: ${termId}`);
    console.log('You can now find this idiom in the app.');
    
  } catch (error) {
    console.error('Error adding idiom:', error);
    process.exit(1);
  }
}

// Start the script
addNewIdiom();