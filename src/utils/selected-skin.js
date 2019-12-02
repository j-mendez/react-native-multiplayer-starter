'use strict';
/**
 *
 * @format
 * @flow
 */

const findMatch = function(obj: {}, prop: string = 'value', match) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key][prop] === true) {
      match = key;
      break;
    }
  }
  return match;
};

export default (skins, playerColor, raw = false) => {
  const key = findMatch(skins);

  if (raw) {
    return key || playerColor;
  }

  switch (key) {
    case 'black':
      return {backgroundColor: '#000'};
    case 'normal':
      return {backgroundColor: '#ccc'};
    case 'pro':
      return {backgroundColor: '#c0c0c0', borderColor: 'grey', borderWidth: 3};
    case 'bronze':
      return {
        backgroundColor: '#CD7F32',
        borderColor: '#FFD700',
        borderWidth: 3,
      };
    case 'gold':
      return {backgroundColor: 'gold', borderColor: 'teal', borderWidth: 3};
    case 'plat':
      return {backgroundColor: '#7bd3f7', borderColor: 'teal', borderWidth: 3};
    default:
      return {backgroundColor: playerColor};
  }
};
