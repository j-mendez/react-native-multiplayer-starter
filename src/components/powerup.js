'use strict';
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {Emitter} from 'react-native-particles';

export default ({children, kills}) =>
  !kills ? (
    children
  ) : (
    <Emitter
      numberOfParticles={kills}
      emissionRate={5}
      interval={1000}
      particleLife={4000}
      direction={50}
      speed={kills}
      infiniteLoop
      autoStart
      spread={360}>
      {children}
    </Emitter>
  );
