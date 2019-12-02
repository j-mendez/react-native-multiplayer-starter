'use strict';
/**
 *
 * @format
 * @flow
 */

import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export default (type = 'attack') => {
  const sound = new Sound(`${type}.wav`, Sound.MAIN_BUNDLE, error => {
    if (!error) {
      if (type === 'cooldown') {
        sound.setVolume(0.2);
      }
      sound.play();
    }
  });

  return sound;
};
