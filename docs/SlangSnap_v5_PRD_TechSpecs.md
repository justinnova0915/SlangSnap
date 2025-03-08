# Product Requirements Document (PRD): Slang Snap (v5) - Updated

## 1. Overview

### 1.1 Product Name
*Slang Snap* – An AI-powered mobile app with customizable styles and social features to teach modern English slang, idioms, and phrases through video clips.

### 1.2 Vision
To create a dynamic, user-driven language-learning experience that adapts to every vibe—hype and wild for Gen Z, clear and approachable for older learners—while fostering community through collaborative narration.

### 1.3 Objective
- Offer two app styles: “Zoomer Mode” (Gen Z energy) and “Classic Mode” (timeless simplicity), switchable anytime.
- Deliver AI-generated video clips using HeyGen (cloud) and Stable Diffusion (local) tailored to each mode.
- Boost engagement with gamified rewards and a social *Voice Snap Studio* feature.

### 1.4 Target Audience
- **Zoomer Mode**: Gen Z learners (16-25), native trend-chasers.
- **Classic Mode**: Older learners (30+), professionals, idiom enthusiasts.
- **General**: Social media-savvy users open to community features.

---

## 2. Features

### 2.1 Core Features

#### 2.1.1 Daily Slang Playlist
- **Description**: Daily push notification with 10 trending slang/idioms.
- **Details**: AI curates from X, TikTok, and Urban Dictionary, refreshed daily, filtered for relevance.
- **Zoomer Mode**: “Slang Drop” (e.g., “10 bangers like ‘rizz’!”).
- **Classic Mode**: “Daily Idioms” (e.g., “10 terms like ‘on the ball’!”).

#### 2.1.2 AI-Generated Video Clips
- **Description**: 10-15 sec clips showing terms in context.
- **Details**: 
  - Generated via **HeyGen** (cloud-based avatars, initial batch) and **Stable Diffusion/Local DIY** (locally fine-tuned on NVIDIA RTX 4060 Ti for custom tweaks and scaling).
  - Scenarios based on user interests (e.g., gaming, work).
- **Zoomer Mode**: Hype scenes (e.g., “This fit’s *serving*!” at a party).
- **Classic Mode**: Everyday scenes (e.g., “He’s *on the ball*!” in an office).

#### 2.1.3 Quiz Cards
- **Description**: Interactive quizzes to reinforce learning.
- **Details**: Multiple choice, fill-in-the-blank, or scenario-based; instant feedback.
- **Zoomer Mode**: Swipeable, sassy (e.g., “You ate that!” or “Big L!”).
- **Classic Mode**: Clean Q&A, supportive (e.g., “Well done!” or “Try again?”).

#### 2.1.4 Review Hub
- **Description**: Dashboard to revisit learned terms.
- **Details**: Filter by time/category, track progress.
- **Zoomer Mode**: “Slang Stash” (e.g., “You’re 75% Slang God!”).
- **Classic Mode**: “Idiom Library” (e.g., “70% complete this week!”).

#### 2.1.5 Rewards System
- **Description**: Points-based incentives for engagement.
- **Details**: Earn points for playlists (10), quizzes (5/correct), streaks (50/7 days).
- **Zoomer Mode**: Snap Points for avatar drip (e.g., LED jackets).
- **Classic Mode**: Learning Points for badges (e.g., “Idiom Expert”).

#### 2.1.6 Initial Content
- **Description**: Launch with 200 AI-generated clips.
- **Details**: 
  - 100 Zoomer (80 slang, 20 shared), 100 Classic (80 idioms, 20 shared).
  - Generated via HeyGen (~$100 for 33 min) + Stable Diffusion (local, $0) over 2 months; 20 days of unique playlists.

### 2.2 Stretch Features

#### 2.2.1 Slang Snap Live
- **Description**: Users record themselves using a term; AI scores pronunciation/context.

#### 2.2.2 Snap Battles
- **Description**: Friends compete with 3-slang clips; community votes.

#### 2.2.3 Meme Mode
- **Description**: AI remixes clips into shareable memes.

#### 2.2.4 Voice Snap Studio (Social Feature)
- **Description**: Users record character lines for clips, share, vote, and mix into community-narrated versions.
- **Details**:
  - **Recording**: Pick a line (e.g., “This beat’s fire!”), record via in-app mic (3 tries).
  - **Upload**: Post to “Voice Snap Gallery” with username/avatar.
  - **Voting**: “Snap Up” faves; top 3 per character highlighted.
  - **Mixing**: Combine voices manually or auto-generate “Community Cut.”
  - **Sharing**: Post to “Snap Feed” or download.
- **Zoomer Mode**: “Drop your voice—show your rizz!”
- **Classic Mode**: “Share your take—help others learn!”
- **Rewards**: 10 points/upload, 5/Snap Up received, 50/top-3 voice.

---

## 3. User Flow

### 3.1 Onboarding
1. **Welcome Screen**: “Slang Snap: Learn your way. Pick your vibe!”
2. **Style Picker**: Preview Zoomer (“This party’s *lit*!”) or Classic (“She’s *on the ball*!”); “Switch anytime” note.
3. **Preferences**: Select interests (e.g., music, travel).
4. **First Snap**: Mode-specific clip + quiz.

### 3.2 Daily Experience
1. **Notification**: Zoomer: “Slang Drop alert—10 bangers!” / Classic: “Daily Idioms ready!”
2. **Watch Clips**: Swipe (Zoomer) or tap (Classic) through 10 clips.
3. **Quiz**: Answer 10 questions.
4. **Review**: Check Slang Stash/Idiom Library.
5. **Rewards**: Collect points, redeem glow-ups/badges.
6. **Mode Switch**: Tap “Switch Vibe” icon anytime (top bar).

### 3.3 Voice Snap Studio Flow
1. **Access**: Tap “Voice Snap It” on any clip.
2. **Record**: Choose line, record (3 takes).
3. **Upload**: Preview, “Drop It” to Gallery.
4. **Browse**: Swipe/listen to submissions, Snap Up faves.
5. **Mix**: Combine voices, save/share to Snap Feed.
6. **Reward**: Earn points for participation.

### 3.4 Weekly Recap
- Notification: Zoomer: “You snapped 70 slangs—legend!” / Classic: “70 idioms down—great work!”
- Recap vid of top terms.

---

## 4. UI/UX Design

### 4.1 Style Picker
- **Prompt**: “Pick your vibe!”
- **Zoomer**: Neon button, graffiti font, sparkles.
- **Classic**: Blue button, serif font, fade-in.

### 4.2 Zoomer Mode
- **Vibe**: Neon, chaotic, TikTok-inspired.
- **UI**: Neon gradients, bold fonts (e.g., Bubblegum Sans), glitch animations.
- **Home**: Spinning playlist carousel—“Today’s Bangers.”
- **Video Player**: Swipeable, double-tap “Vibe Check.”
- **Quiz Cards**: 3D flips, glowing borders.
- **Slang Stash**: Pulsing badge grid.
- **Rewards Shop**: Avatars strut—“Cop It.”
- **Voice Snap Studio**: Neon mic, glitchy waveform, swipeable Gallery, “Drop the Cut.”
- **Language**: “Slay It,” “You ate that!” “Big L!”
- **Sound**: Boops, trend beats.

### 4.3 Classic Mode
- **Vibe**: Calm, minimal, approachable.
- **UI**: Soft blues/grays, serif fonts (e.g., Georgia), subtle fades.
- **Home**: Stacked list—“Daily Idioms.”
- **Video Player**: Compact, captions on.
- **Quiz Cards**: Flat, green check/yellow retry.
- **Idiom Library**: Searchable list, % complete.
- **Rewards Shop**: Badge grid—“Claim.”
- **Voice Snap Studio**: Simple mic, clean waveform, list Gallery, “Create Clip.”
- **Language**: “Start Learning,” “Well done!” “Try again?”
- **Sound**: Chimes, soft clicks.

### 4.4 Mode Switching
- **Access**: “Switch Vibe” icon (Z/book) in top bar; tap for previews, confirm swap.
- **Seamless**: UI/tone shifts instantly, progress persists.

### 4.5 Accessibility
- Subtitles (funky Zoomer/clean Classic).
- Voice nav (hype Zoomer/calm Classic).
- High-contrast toggle.

---

## 5. Technical Requirements

### 5.1 AI Video Generation (Updated)
- **Tools**: 
  - **HeyGen**: Cloud-based avatars for initial 200 clips (~33 min total).
  - **Stable Diffusion/Local DIY**: Local generation/fine-tuning on NVIDIA RTX 4060 Ti for post-launch scaling.
- **Output**: 720p, 10-15 sec clips.

### 5.2 Slang Data Pipeline
- **Source**: X, TikTok, Urban Dictionary (5,000–10,000 slang, 3,000–5,000 idioms estimated).
- **Processing**: AI filters, daily refresh.

### 5.3 App Framework
- **Platform**: React Native, AWS backend.
- **Push**: Firebase Cloud Messaging.

### 5.4 Voice Snap Studio
- **Recording**: In-app MP3 capture, 3-take limit.
- **Storage**: AWS S3 for audio.
- **Voting**: Firebase tally, top-3 daily.
- **Mixing**: Web Audio API, AI sync.
- **Moderation**: AI audio filter + report queue.

### 5.5 Analytics
- **Track**: Playlist completion, quiz accuracy, mode usage, Voice Snap engagement.

---

## 6. Success Metrics

### 6.1 KPIs
- **DAU**: 70% of installs engage daily.
- **Retention**: 60% 7-day, 40% 30-day.
- **Mode Split**: 60% Zoomer, 40% Classic (adjust per data).
- **Voice Snap**: 20% upload, 50% vote, 10% share clips.

### 6.2 Feedback
- Surveys: “Does this style work?” “How fun is Voice Snap?”—80% positive.
- App store: 4.5+ stars.

---

## 7. Risks & Mitigation

- **Slang Relevance**: Daily refresh, user flags for “stale.”
- **Clip Quality**: Test HeyGen outputs, refine with Stable Diffusion.
- **User Overload**: “Chill Mode” (5/day option).
- **Voice Snap Abuse**: AI moderation + reporting.

---

## 8. Timeline

- **Phase 1 (0-3 months)**: Prototype 200 clips (HeyGen + Stable Diffusion), basic quiz/rewards.
- **Phase 2 (4-6 months)**: MVP with mode switch, Voice Snap Studio.
- **Phase 3 (7-12 months)**: Scale to 1,000 clips, refine social features.

---

## 9. Creative Spin
- **Zoomer**: “Slang Snap Radio”—AI DJ remixes your terms into beats.
- **Classic**: “Idiom Stories”—weekly narrative vids of your terms.
- **Social**: Voice Snap Battles—whose narration slaps hardest?

---

# Technical Specifications & Architecture Document: Slang Snap (v5) - Updated

## 1. Overview

### 1.1 Purpose
To define the technical foundation for *Slang Snap*, supporting dual-mode UI, AI-generated clips via HeyGen and Stable Diffusion, social features, and gamified learning.

### 1.2 Goals
- Build a cross-platform app (iOS/Android) with modular UI themes.
- Use HeyGen (cloud) and Stable Diffusion (local) for video generation.
- Enable real-time social interactions with Voice Snap Studio.
- Launch with 200 clips, scale to 1,000+ post-launch.
- Optimize for cost using local GPU (RTX 4060 Ti).

---

## 2. System Architecture

### 2.1 High-Level Architecture
- **Client**: React Native mobile app.
- **Backend**: Node.js on AWS (EC2/Lambda), Firebase for real-time.
- **Storage**: AWS S3 for video/audio, DynamoDB for data.
- **AI Pipeline**: HeyGen (cloud) + Stable Diffusion (local on RTX 4060 Ti), OpenAI for scripts.
- **Analytics**: Firebase Analytics.

```
[Mobile App] <--> [API Gateway] <--> [Backend Services]
    |                 |                  |
[S3 Storage]   [Firebase RTDB]    [AI Pipeline: HeyGen + Stable Diffusion]
    |                 |                  |
[DynamoDB]     [Analytics]       [OpenAI API]
```

### 2.2 Components

#### 2.2.1 Frontend (Client)
- **Framework**: React Native.
- **Features**: Dynamic UI, video playback (react-native-video), audio recording (react-native-sound), push notifications (Firebase).

#### 2.2.2 Backend (Server)
- **Runtime**: Node.js (Express).
- **Deployment**: AWS EC2 (MVP), Lambda for scaling.
- **Features**: User auth, playlist generation, Voice Snap logic.

#### 2.2.3 Real-Time Layer
- **Service**: Firebase RTDB.
- **Features**: Voice Snap votes, reward sync, notifications.

#### 2.2.4 Storage
- **Service**: AWS S3.
- **Structure**: `clips/zoomer/[term-id].mp4`, `clips/classic/[term-id].mp4`, `voices/[clip-id]/[user-id].mp3`.
- **Database**: AWS DynamoDB.
  - **Tables**: `Users`, `Terms`, `VoiceSnaps`.

#### 2.2.5 AI Pipeline (Updated)
- **Tools**:
  - **HeyGen**: Cloud-based video generation for 200 initial clips.
  - **Stable Diffusion**: Local generation/fine-tuning on RTX 4060 Ti (post-launch scaling).
  - **OpenAI GPT-4**: Script generation.
- **Features**: Initial batch via HeyGen, ongoing clips via local GPU.

#### 2.2.6 Analytics
- **Service**: Firebase Analytics.
- **Features**: Track DAU, retention, Voice Snap engagement.

---

## 3. Tech Stack

### 3.1 Frontend
- **React Native**: v0.73.
- **Redux**: State management.
- **react-native-video**: Playback.
- **react-native-sound**: Recording.
- **react-native-firebase**: Notifications, analytics.

### 3.2 Backend
- **Node.js**: v18, Express.
- **AWS SDK**: S3/DynamoDB.
- **JWT**: Authentication.
- **Axios**: API calls (HeyGen, OpenAI).

### 3.3 Database
- **DynamoDB**: NoSQL.
- **Firebase RTDB**: Real-time.

### 3.4 AI & External APIs (Updated)
- **HeyGen**: Cloud video generation ($24/month, 15 min).
- **Stable Diffusion**: Local video frame generation (free, RTX 4060 Ti).
- **OpenAI GPT-4**: Script generation ($0.02/clip).
- **X API**: Slang scraping.
- **FFmpeg**: Local clip assembly (free).

### 3.5 DevOps
- **CI/CD**: GitHub Actions.
- **Hosting**: AWS EC2/Lambda.
- **Monitoring**: AWS CloudWatch.

---

## 4. Data Flow

### 4.1 Daily Playlist
1. **Backend**: AI scrapes X → Stores terms in DynamoDB.
2. **S3**: Fetches HeyGen/Stable Diffusion clips.
3. **Client**: `GET /playlist` → Displays 10 clips.

### 4.2 Voice Snap Studio
1. **Client**: Records audio → Uploads to S3.
2. **Backend**: Saves metadata to DynamoDB.
3. **Firebase**: Syncs votes in RTDB.
4. **Client**: Mixes audio → Shares to Snap Feed.

### 4.3 Mode Switch
1. **Client**: Taps “Switch Vibe” → Redux updates theme.
2. **Backend**: Saves mode to DynamoDB.

---

## 5. API Endpoints

### 5.1 Core APIs
- **GET /playlist**: `{ termId, clipUrl, mode }`.
- **POST /quiz**: `{ userId, termId, answer }` → Score.
- **GET /review**: `{ userId, terms[] }`.
- **POST /auth/login**: `{ userId, token }`.

### 5.2 Voice Snap APIs
- **POST /voice/upload**: `{ clipId, userId, audioFile }` → S3 URL.
- **GET /voice/gallery/[clipId]**: `{ userId, audioUrl, votes }`.
- **POST /voice/vote**: `{ clipId, userId, vote }`.
- **POST /voice/mix**: `{ clipId, voiceIds[] }` → URL.

---

## 6. Security

- **Authentication**: JWT in AsyncStorage.
- **Privacy**: AES-256 encryption for S3 audio.
- **Moderation**: AI audio filter + reporting.
- **Rate Limiting**: 100 req/min/user.

---

## 7. Scalability

- **MVP**: EC2, 200 clips, 1,000 users.
- **Post-MVP**: Lambda, S3 CDN, DynamoDB partitioning.
- **AI**: Stable Diffusion scales locally (5-10 clips/day).

---

## 8. Development Plan

### 8.1 Timeline
- **Week 1-2**: Setup (AWS, React Native, Stable Diffusion install).
- **Week 3-4**: Core features (playlist, quiz).
- **Week 5-6**: Voice Snap Studio.
- **Week 7-8**: 200 clips (HeyGen + Stable Diffusion), testing.
- **Week 9**: Deployment.

### 8.2 Team
- **1 Full-Stack Dev**: Frontend/backend.
- **1 AI Engineer**: HeyGen/Stable Diffusion pipeline.
- **1 QA**: Testing.

---

## 9. Cost Estimate (Updated)

### 9.1 Upfront Costs
- **HeyGen**: $24/month × 2 months = $48 (~33 min for 200 clips).
- **Stable Diffusion**: $0 (local on RTX 4060 Ti).
- **OpenAI**: $0.02 × 200 = $4.
- **Total**: **~$52**.

### 9.2 Recurring Costs
- **AWS**:
  - EC2 (t3.medium): $30/month.
  - S3 (2GB): $5/month.
  - DynamoDB (1M r/w): $10/month.
- **Firebase**: $0 (free tier).
- **HeyGen**: $24/month (optional post-launch).
- **Total**: **~$45/month** (or $70 with HeyGen buffer).

### 9.3 Total First Year
- $52 + ($45 × 12) = **~$590** (without HeyGen post-launch).

---

## 10. Risks & Mitigation

- **Clip Quality**: Test HeyGen, refine with Stable Diffusion.
- **4060 Ti Limits**: Optimize for 8GB VRAM (512x512 clips).
- **X API Limits**: Cache slang data.

---

## 11. Architecture Diagram

```
[React Native App]
    |
[API Gateway] --> [Node.js (EC2/Lambda)]
    |                 |
[S3 (Clips/Audio)] [DynamoDB (Users/Terms)]
    |                 |
[Firebase RTDB]    [AI: HeyGen + Stable Diffusion (4060 Ti)]
    |                 |
[Firebase Analytics] [OpenAI]
```

---

### Key Changes
- **PRD**: Updated video generation to HeyGen + Stable Diffusion, adjusted initial content cost to ~$100 (HeyGen) + $0 (local).
- **Tech Specs**: Replaced Synthesia with HeyGen ($48 upfront) and Stable Diffusion (free, local), slashed upfront cost from $6,050 to $52, kept monthly at ~$45-$70.