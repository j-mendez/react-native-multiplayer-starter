'use strict';
/**
 *
 * @format
 * @flow
 */

import {Platform} from 'react-native';
import {auth, admob} from 'react-native-firebase';
import Config from 'react-native-config';

const ADMOB_ID = Platform.select({
  ios: Config.IOS_ADMOB_KEY,
  android: Config.ANDROID_ADMOB_KEY,
});

auth().signInAnonymously();

const AdRequest = admob.AdRequest;

export const loadAd = () => {
  const advert = admob().interstitial(ADMOB_ID);
  const request = new AdRequest();
  advert.loadAd(request.build());
  advert.on('onAdLoaded', () => {
    if (advert.isLoaded()) {
      advert.show();
    }
  });
};
