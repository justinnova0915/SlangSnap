import textToSpeech from '@google-cloud/text-to-speech';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ttsClient = new textToSpeech.TextToSpeechClient({
  keyFilename: path.join(__dirname, '..', 'google-credentials.json')
});

async function testTTS() {
  try {
    // List available voices
    const [result] = await ttsClient.listVoices({});
    console.log('Available voices:');
    result.voices.forEach(voice => {
      if (voice.name.includes('Neural2')) {
        console.log(` - ${voice.name} (${voice.ssmlGender})`);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
    console.error('Make sure google-credentials.json exists at:', path.join(__dirname, '..', 'google-credentials.json'));
  }
}

testTTS();