'use strict';
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {StateProvider} from 'state';
import {containerStyle} from 'style';
import App from './app';

const Index: () => React$Node = () => (
  <StateProvider>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={containerStyle.base}>
      <App />
    </SafeAreaView>
  </StateProvider>
);

export default Index;
