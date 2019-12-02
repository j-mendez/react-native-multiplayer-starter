'use strict';
/**
 *
 * @format
 * @flow
 */

import AsyncStorage from '@react-native-community/async-storage';

export default {
  storeData: async (key, data) => {
    try {
      AsyncStorage.setItem(`ko:${key}`, JSON.stringify(data));
    } catch (e) {}
  },
  getData: async key => {
    try {
      const value = await AsyncStorage.getItem(`ko:${key}`);
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (e) {}
  },
};
