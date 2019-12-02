'use strict';
/**
 *
 * @format
 * @flow
 */

export currentScene from './current-scene';
export sound from './sound';
export localStorage from './local-storage';
export renderIf from './render-if';
export selectedSkin from './selected-skin';
export {getSettings, getSkins, skinMap, getWeight} from './extra';
export {loadAd} from './firebase-config';

export function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}

export const debounce = (method: void, time: number, timeout): void =>
  function() {
    const func = () => method.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };

export const keyExtractor = (item, index) => item + index;
