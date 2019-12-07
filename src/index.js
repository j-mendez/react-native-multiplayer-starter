'use strict';
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {StateProvider} from 'react-estate';
import {containerStyle} from 'style';
import {state} from 'assembly';
import App from './app';

const Index: () => React$Node = () => (
  <StateProvider defaultState={state}>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={containerStyle.base}>
      <App />
    </SafeAreaView>
  </StateProvider>
);

export default Index;
