'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {useStateValue} from 'state';
import {ENV_COOLDOWN_DURATION} from 'logic';
import {renderIf} from 'utils';

const getEnvironment = env => {
  switch (env) {
    case 'fire':
      return require('../assets/fire.gif');
    case 'water':
      return require('../assets/water.gif');
    default:
      break;
  }
};

const setEnvironment = env => {
  switch (env) {
    case 'fire':
      return '';
    case 'water':
      return 'fire';
    default:
      return 'water';
  }
};

export default () => {
  const [{environment}, setState] = useStateValue();

  useEffect(() => {
    const timedEnv = setInterval(() => {
      setState({environment: setEnvironment(environment)});
    }, ENV_COOLDOWN_DURATION);

    return () => {
      clearInterval(timedEnv);
    };
  }, [environment, setState]);

  return renderIf(
    environment,
    <Image
      style={styles[environment] && styles[environment]}
      source={getEnvironment(environment)}
    />,
  );
};

const styles = StyleSheet.create({
  water: {
    position: 'absolute',
    left: 20,
    top: -250,
    zIndex: 2,
  },
  fire: {
    position: 'absolute',
    left: 120,
    bottom: 300,
    zIndex: 2,
  },
});
