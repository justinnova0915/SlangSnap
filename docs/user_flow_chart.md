graph TD
    %% Start
    A[START: User Opens App] --> B{First-Time User?}
    
    %% Onboarding Flow
    B -->|Yes| C[Welcome Screen: “Learn your way. Pick your vibe!”]
    C --> D[Style Picker]
    D --> E[Zoomer Mode Preview: “This party’s lit!”]
    E --> F[User Taps “Choose Zoomer”]
    F --> G[Sets Mode: Zoomer]
    D --> H[Classic Mode Preview: “She’s on the ball!”]
    H --> I[User Taps “Choose Classic”]
    I --> J[Sets Mode: Classic]
    G --> K[Preferences: “Pick your interests”]
    J --> K
    K --> L[User Selects Interests: e.g., Music, Work]
    L --> M[First Snap]
    M --> N[Zoomer Demo Clip: “This beat’s fire!”]
    M --> O[Classic Demo Clip: “He’s on the ball!”]
    N --> P[Zoomer Quiz: “Fire = ?”]
    O --> Q[Classic Quiz: “On the ball = ?”]
    P --> R[Feedback: “You ate that!” / “Big L!”]
    Q --> S[Feedback: “Well done!” / “Try again?”]
    R --> T[Home Screen]
    S --> T
    
    %% Returning User
    B -->|No| T
    
    %% Home Screen Branches
    T --> U[Notification: “Slang Drop!” / “Daily Idioms!”]
    T --> V[Daily Playlist: “Today’s 10 Clips”]
    T --> W[Review Hub: “Slang Stash” / “Idiom Library”]
    T --> X[Rewards Shop: “Glow Up” / “Claim Badges”]
    T --> Y[Voice Snap Studio]
    T --> Z[Mode Switch: Z/Book Icon]
    
    %% Notification Flow
    U --> V
    
    %% Daily Playlist Flow
    V --> AA[Watch Clips]
    AA --> AB[Zoomer Clip: “This fit’s serving!”]
    AA --> AC[Classic Clip: “She’s under the weather.”]
    AB --> AD[Zoomer: Double-Tap “Vibe Check”]
    AC --> AE[Classic: Captions On]
    AD --> AF[Voice Snap It]
    AE --> AF
    AF --> AG[Next Clip]
    AG -->|Loop 10x| AH[All Clips Watched]
    AH --> AI[Quiz Cards]
    
    %% Quiz Cards Flow
    AI --> AJ[Zoomer Question: “What’s rizz?”]
    AI --> AK[Classic Question: “What’s on the ball?”]
    AJ --> AL[Answer]
    AK --> AL
    AL --> AM[Zoomer Feedback: “You slayed!” / “Big L!”]
    AL --> AN[Classic Feedback: “Great!” / “Try again?”]
    AM --> AO[Next Question]
    AN --> AO
    AO -->|Loop 10x| AP[Quiz Complete]
    AP --> AQ[Earn 10-50 Points]
    AQ --> AR[Rewards Popup: “10 Points Earned!”]
    AR --> AS[Redeem Now]
    AR --> AT[Later]
    AS --> X
    AT --> T
    
    %% Review Hub Flow
    W --> AU[Filter: “This Week” / “All Time”]
    AU --> AV[Tap Term]
    AV --> AW[Re-watch Clip]
    AV --> AX[Re-quiz]
    AW --> T
    AX --> T
    
    %% Rewards Shop Flow
    X --> AY[Zoomer: Avatar Drip - 500 Points]
    X --> AZ[Classic: Badge - 500 Points]
    AY --> BA[Cop It]
    AZ --> BB[Claim]
    BA --> BC[Updates Profile]
    BB --> BC
    BC --> T
    
    %% Voice Snap Studio Flow
    Y --> BD[Pick Line: e.g., “This beat’s fire!”]
    BD --> BE[Record: 3 Tries]
    BE --> BF[Preview]
    BF --> BG[Drop It]
    BG --> BH[Uploads to Gallery]
    BH --> BI[Earn 10 Points]
    BI --> BJ[Browse Gallery]
    BJ --> BK[Zoomer: Swipe Voices]
    BJ --> BL[Classic: List Voices]
    BK --> BM[Play Snippet]
    BL --> BM
    BM --> BN[Snap Up: Vote]
    BN --> BO[Mix Voices]
    BO --> BP[Drag/Drop]
    BP --> BQ[Preview Mix]
    BQ --> BR[Save]
    BQ --> BS[Share to Feed]
    BR --> T
    BS --> BT[Snap Feed]
    BT --> BU[Like/Comment]
    BU --> BV[Earn 5 Points per Snap Up]
    BV --> T
    BJ --> T
    
    %% Mode Switch Flow
    Z --> BW[Preview Modes]
    BW --> BX[Zoomer Preview]
    BW --> BY[Classic Preview]
    BX --> BZ[Snap to Zoomer]
    BY --> CA[Snap to Classic]
    BZ --> T
    CA --> T
    
    %% End
    T --> CB[END: User Closes App]