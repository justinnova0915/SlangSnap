# UI Components Technical Specifications

## Required Dependencies

```json
{
  "dependencies": {
    "react-native-linear-gradient": "^2.8.3",
    "react-native-masked-view": "^0.2.0",
    "react-native-reanimated": "^3.6.1",
    "@expo/vector-icons": "^14.0.0",
    "expo-font": "~11.10.2"
  }
}
```

## Components Structure

### 1. GradientText Component
- Purpose: Render text with gradient colors
- Location: `src/components/shared/GradientText.js`
- Features:
  - Custom gradient colors
  - Configurable text styles
  - Uses MaskedView for gradient effect

### 2. GlitchText Component
- Purpose: Create glitch animation effect for text
- Location: `src/components/shared/GlitchText.js`
- Features:
  - Configurable glitch intensity
  - Custom colors for glitch effect
  - Uses Reanimated for smooth animations

### 3. FeatureCard Component
- Purpose: Display feature highlights with icons
- Location: `src/components/shared/FeatureCard.js`
- Features:
  - Gradient background
  - Icon support
  - Glass morphism effect using opacity and blur

### 4. ModeCard Component
- Purpose: Display mode selection cards
- Location: `src/components/shared/ModeCard.js`
- Features:
  - Press animation
  - Custom gradient backgrounds
  - Feature list with icons
  - Mode-specific styling

### 5. SlideDots Component
- Purpose: Show pagination indicators
- Location: `src/components/shared/SlideDots.js`
- Features:
  - Animated active dot
  - Configurable colors
  - Support for variable number of dots

## Screen Enhancements

### Welcome Screen
```javascript
// screens/WelcomeScreen.js
import {
  GradientText,
  GlitchText,
  FeatureCard,
  SlideDots
} from '../components/shared';

const features = [
  {
    icon: '🎮',
    title: 'Gamified Learning',
    description: 'Learn with fun challenges & rewards',
    gradient: ['#f02fc2', '#6094ea']
  },
  // ... other features
];
```

### Style Picker Screen
```javascript
// screens/StylePickerScreen.js
import {
  ModeCard,
  GradientText,
  GlitchText
} from '../components/shared';

const modes = {
  zoomer: {
    gradient: ['#f02fc2', '#6094ea'],
    features: [
      {
        icon: '🔥',
        title: 'Trending phrases',
        color: '#f02fc2'
      },
      // ... other features
    ]
  },
  classic: {
    gradient: ['#3b82f6', '#1e40af'],
    features: [
      {
        icon: '💼',
        title: 'Business Idioms',
        color: '#3b82f6'
      },
      // ... other features
    ]
  }
};
```

## Styling Guidelines

### Gradients
```javascript
// styles/gradients.js
export const gradients = {
  zoomer: {
    primary: ['#f02fc2', '#6094ea'],
    secondary: ['#EC4899', '#8B5CF6']
  },
  classic: {
    primary: ['#3b82f6', '#1e40af'],
    secondary: ['#60A5FA', '#2563EB']
  }
};
```

### Typography
```javascript
// styles/typography.js
export const typography = {
  logo: {
    fontFamily: 'Righteous',
    fontSize: 48,
    fontWeight: 'bold'
  },
  heading: {
    fontFamily: 'Righteous',
    fontSize: 24,
    fontWeight: '600'
  },
  // ... other text styles
};
```

### Animations
```javascript
// styles/animations.js
export const animations = {
  glitch: {
    duration: 500,
    colors: [
      'rgba(255,0,0,0.75)',
      'rgba(0,255,0,0.75)',
      'rgba(0,0,255,0.75)'
    ]
  },
  press: {
    scale: 0.95,
    duration: 100
  }
};
```

## Next Steps
1. Install required dependencies
2. Create shared components
3. Apply enhancements to Welcome and Style Picker screens
4. Test animations and interactions
5. Implement custom fonts loading
6. Add proper error handling for assets

Would you like to proceed with switching to Code mode to implement these enhancements?