'use strict';
/**
 *
 * @format
 * @flow
 */
import localStorage from './local-storage';

export const skinMap = {
  normal: {
    unlocked: true,
    value: false,
  },
  black: {
    unlocked: true,
    value: false,
  },
  bronze: {
    unlocked: 'highScore >= 5',
    value: false,
  },
  silver: {
    unlocked: 'highScore >= 10',
    value: false,
  },
  gold: {
    unlocked: 'highScore >= 15',
    value: false,
  },
  plat: {
    unlocked: 'highScore >= 20',
    value: false,
  },
};

export const getSettings = async ({setState}) => {
  const localSettings = (await localStorage.getData('settings')) || {};
  setState({
    settings:
      Object.entries(localSettings).length === 0
        ? {
            buzzer: true,
            sound: true,
            'background-animation': true,
          }
        : localSettings,
  });
};

export const getSkins = async ({setState}) => {
  const skins = (await localStorage.getData('skins')) || {};
  setState({
    skins: skins && Object.entries(skins).length === 0 ? skinMap : skins,
  });
};

export function getWeight(code: string = '') {
  let hash = 0;
  let length = code?.length;
  for (var i = 0; i < length; i++) {
    hash = hash + code.charCodeAt(i);
  }
  return hash;
}
