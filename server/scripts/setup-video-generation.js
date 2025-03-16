import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import AWS from 'aws-sdk';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { S3 } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const dynamodb = new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Video generation function
export async function generateVideo({
  idiom,
  context,
  style,
  outputPath = './temp'
}) {
  const id = uuidv4();
  const videoPath = path.join(outputPath, `${id}.mp4`);
  
  // Ensure output directory exists
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  try {
    // Create record in DynamoDB
    await dynamodb.putItem({
      TableName: 'IdiomVideos',
      Item: {
        id: { S: id },
        idiom: { S: idiom },
        context: { S: context },
        style: { S: style },
        status: { S: 'processing' },
        createdAt: { S: new Date().toISOString() }
      }
    });

    // Call Python script for video generation
    await new Promise((resolve, reject) => {
      const pythonProcess = spawn(
        'python',
        [
          path.join(__dirname, '../video-generation/generate_video.py'),
          '--idiom', idiom,
          '--context', context,
          '--style', style,
          '--output', videoPath
        ],
        { 
          env: {
            ...process.env,
            PYTHONPATH: path.join(__dirname, '../video-generation/stable-video-diffusion')
          }
        }
      );

      pythonProcess.stdout.on('data', (data) => {
        console.log(`Video Generation Output: ${data}`);
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

    // Upload to S3
    const s3Key = `videos/${id}.mp4`;
    await s3.putObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: s3Key,
      Body: fs.createReadStream(videoPath)
    });

    // Update DynamoDB record
    await dynamodb.updateItem({
      TableName: 'IdiomVideos',
      Key: { id: { S: id } },
      UpdateExpression: 'SET #status = :status, videoUrl = :url',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': { S: 'completed' },
        ':url': { S: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${s3Key}` }
      }
    });

    return {
      id,
      videoUrl: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${s3Key}`
    };

  } catch (error) {
    // Update DynamoDB record with error
    await dynamodb.updateItem({
      TableName: 'IdiomVideos',
      Key: { id: { S: id } },
      UpdateExpression: 'SET #status = :status, errorMessage = :error',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': { S: 'failed' },
        ':error': { S: error.message }
      }
    });

    throw error;
  } finally {
    // Cleanup local file
    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
  }
}