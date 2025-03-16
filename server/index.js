import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { generateVideo } from './scripts/setup-video-generation.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config();

// Initialize AWS Clients
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

// Create a DynamoDB Document client for easier interaction
const docClient = DynamoDBDocumentClient.from(ddbClient);

const app = express();
app.use(express.json());
app.use(cors());

// Test endpoint
app.get('/api/auth/test', (req, res) => {
  res.json({ status: 'ok' });
});

// MongoDB connection
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/slangsnap', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Full error details:', JSON.stringify(err, null, 2));
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  preferences: {
    mode: { type: String, enum: ['zoomer', 'classic'], default: null },
    interests: [String],
    notifications: {
      daily: { type: Boolean, default: false },
      streaks: { type: Boolean, default: false },
      community: { type: Boolean, default: false }
    },
    soundEffects: { type: Boolean, default: false }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Registration attempt:', {
      username: req.body.username,
      email: req.body.email
    });
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username or email already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login attempt:', { email: req.body.email });
    
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      console.log('Login failed: Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user
    console.log('Searching for user with email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Protected route example
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user preferences
app.get('/api/user/preferences', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('preferences');
    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user preferences
app.put('/api/user/preferences', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.preferences = {
      ...user.preferences,
      ...req.body
    };
    await user.save();
    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// List all terms/lessons
app.get('/api/terms', authenticateToken, async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    
    // Scan command to get all terms (with optional filters)
    const scanCommand = {
      TableName: 'terms_table'
    };

    // Add filters if provided
    if (category || difficulty) {
      let filterExpression = [];
      let expressionValues = {};

      if (category) {
        filterExpression.push('category = :category');
        expressionValues[':category'] = category;
      }
      if (difficulty) {
        filterExpression.push('difficulty = :difficulty');
        expressionValues[':difficulty'] = difficulty;
      }

      if (filterExpression.length > 0) {
        scanCommand.FilterExpression = filterExpression.join(' AND ');
        scanCommand.ExpressionAttributeValues = expressionValues;
      }
    }

    const { Items } = await docClient.send(new ScanCommand(scanCommand));
    res.json(Items);

  } catch (error) {
    console.error('List terms error:', error);
    res.status(500).json({ message: 'Error listing terms', error: error.message });
  }
});

// Get audio example url for a term
app.get('/api/audio/:termId', authenticateToken, async (req, res) => {
  try {
    const { termId } = req.params;
    
    // Get audio info from DynamoDB
    const getCommand = new GetCommand({
      TableName: 'audio_examples',
      Key: { term_id: termId }
    });
    
    const { Item } = await docClient.send(getCommand);
    if (!Item) {
      return res.status(404).json({ message: 'Audio example not found' });
    }
    
    // Generate presigned URL for audio file
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: Item.audio_key
    });
    
    const audioUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });
    res.json({
      audioUrl,
      voiceId: Item.voice_id,
      createdAt: Item.created_at
    });
    
  } catch (error) {
    console.error('Get audio error:', error);
    res.status(500).json({ message: 'Error getting audio example', error: error.message });
  }
});

// Get video url and term details
app.get('/api/videos/:termId', authenticateToken, async (req, res) => {
  try {
    const { termId } = req.params;

    // Get term info from DynamoDB
    const getCommand = new GetCommand({
      TableName: 'terms_table',
      Key: { term_id: termId }
    });

    const { Item } = await docClient.send(getCommand);
    
    if (!Item) {
      return res.status(404).json({ message: 'Term not found' });
    }

    // Generate presigned URL for video
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: Item.video_key
    });

    const videoUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });

    res.json({
      ...Item,
      videoUrl
    });

  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ message: 'Error getting video', error: error.message });
  }
});
// Generate video for idiom
app.post('/api/videos/generate', authenticateToken, async (req, res) => {
  try {
    const { idiom, context, style } = req.body;

    // Validate input
    if (!idiom || !context || !style) {
      return res.status(400).json({
        message: 'Missing required fields: idiom, context, and style are required'
      });
    }

    // Start video generation
    const result = await generateVideo({
      idiom,
      context,
      style,
      outputPath: 'server/temp'
    });

    res.json({
      message: 'Video generation started',
      id: result.id,
      status: 'processing',
      checkStatusUrl: `/api/videos/status/${result.id}`
    });

  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({
      message: 'Error starting video generation',
      error: error.message
    });
  }
});

// Check video generation status
app.get('/api/videos/status/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get video status from DynamoDB
    const getCommand = new GetCommand({
      TableName: 'IdiomVideos',
      Key: { id }
    });

    const { Item } = await docClient.send(getCommand);
    
    if (!Item) {
      return res.status(404).json({
        message: 'Video not found'
      });
    }

    // If video is complete, include the URL
    if (Item.status === 'completed') {
      res.json({
        status: Item.status,
        videoUrl: Item.videoUrl,
        createdAt: Item.createdAt
      });
    } else {
      res.json({
        status: Item.status,
        message: Item.status === 'failed' ? Item.errorMessage : 'Video generation in progress'
      });
    }

  } catch (error) {
    console.error('Check video status error:', error);
    res.status(500).json({
      message: 'Error checking video status',
      error: error.message
    });
  }
});

// Add global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server accessible at: http://localhost:${PORT}`);
  console.log(`For local network: http://192.168.2.159:${PORT}`);
});