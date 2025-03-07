# TypeScript Issues

Some TypeScript errors were found in node_modules dependencies but they don't affect the app's functionality:

## expo-av/src/Audio/Recording.ts
- Module "expo-modules-core" has no exported member 'Subscription'
- Type mismatch in "Expo.Recording.recorderUnloaded"

## expo-modules-core
- Missing tsconfig.base from expo-module-scripts
- Configuration issues with emitDeclarationOnly

These are type definition issues in the dependencies and don't impact the runtime behavior of the app. Since the app is working correctly, these can be addressed in a future update if needed.