'use strict';
/**
 *
 * @format
 * @flow
 */
import {Share, Platform} from 'react-native';
import Config from 'react-native-config';

const SHARE_URL = Platform.select({
  ios: Config.IOS_SHARE_URL,
  android: Config.ANDROID_SHARE_URL,
});

export async function onShare() {
  try {
    const result = await Share.share({
      message: `Hey, can you beat my high score? Try now at ${SHARE_URL}`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // TODO ADD REWARD FOR SHARING
      }
    }
  } catch (error) {}
}

export default [
  {
    name: 'Play',
    scene: 'Game',
  },
  {
    name: 'Leaderboard',
    scene: 'Leaderboard',
  },
  {
    name: 'Skins',
    scene: 'Skins',
  },
  {
    name: 'Share',
    scene: '',
    onPress: onShare,
  },
  {
    name: 'Settings',
    scene: 'Settings',
  },
];
