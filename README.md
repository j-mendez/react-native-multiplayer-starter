# Multiplayer

Your next casual multiplayer game with react-native.

![Example](https://i.imgur.com/iV3BHUu.gif)

## Getting started

1. fork or clone the project
2. yarn install
3. cd ios pod install
4. npm run ios or npm run android

## Main Features

1. online multiplayer (lobby creation (auto sustaining 10 players max per room))
2. joystick
3. game-pad
4. environments - alter gameplay like water fall to hide under or fire to take burning damage
5. reward system
6. game settings
7. admob (ads)
8. basic attack collision
9. simple shared [state](https://github.com/jeffreymendez1993/react-estate)

## Native Dependencies

1. [firebase](https://invertase.io/oss/react-native-firebase)
2. [sounds](https://github.com/zmxv/react-native-sound)
3. [haptic-feedback](https://github.com/milk-and-cookies-io/react-native-haptic-feedback)
4. [12-factor-config](react-native-config) - app env secrets
5. [react-native-gesture-handler](react-native-gesture-handler) - gestures
6. [@react-native-community/async-storage](@react-native-community/async-storage) - stores user settings disk

To change the firebase config location updated the google-services.json file for android at android/app/google-services.json and GoogleService-Info.plist at ios/ko/GoogleService-Info.plist for ios. For more information follow https://firebase.google.com/docs/ios/setup and https://firebase.google.com/docs/android/setup. You only need to do step 1-3.

## WebAssembly

Web support aims for native speed so we try to use webassembly for this (Web support is in progress).
For more info check out [assemblyscript](https://github.com/AssemblyScript/assemblyscript)

## Data Flow

The database used is Realtime Database by firebase. The game is controlled through a shared game state between the client/players.Currently firebase prevents updating the same properties between two clients at the same time which is the reason for `state` and the top level meta info seperation.
Currently trying to push how far you can get with clients managing the integrity of the logic needed for game play.

## Game Configuration

You can adjust most of the game settings at `/src/logic` directory.

## State

The app is structured with a light loose top level state provider. To control updates on a component add a reducer onto the `reducer.js` file by merging into the main reducer or create your own. To lock down updates you can simply use memo and pass in the props from state you would need on your component. This setup allows for speedy development.

## Environments

![Alt-Example](https://i.imgur.com/3ON1XUJ.gif)

## License

- See [LICENSE](/LICENSE)
