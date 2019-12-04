'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {useStateValue} from 'state';
import {ENV_COOLDOWN_DURATION} from 'logic';
import {renderIf} from 'utils';

const getEnvironment = (env: string) => {
  switch (env) {
    case 'fire':
      return require('../assets/fire.gif');
    case 'water':
      return require('../assets/water.gif');
    default:
      break;
  }
};

const setEnvironment = (env: string) => {
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
  const [{environment, envPosition, userEnvHost}, setState] = useStateValue();

  useEffect(
    () => {
      const timedEnv =
        userEnvHost &&
        setInterval(
          () =>
            setState({
              environment: setEnvironment(environment),
              envPosition: {
                left:
                  Math.floor(
                    Math.random() * Dimensions.get('screen').width - 20,
                  ) + 1,
                top: Math.floor(Math.random() * -251) + 1,
                bottom:
                  Math.floor(
                    Math.random() * Dimensions.get('screen').height - 20,
                  ) + 1,
              },
            }),
          ENV_COOLDOWN_DURATION,
        );

      return () => {
        userEnvHost && clearInterval(timedEnv);
      };
    },
    [environment, setState, userEnvHost],
    [],
  );

  const styles = StyleSheet.create({
    water: {
      position: 'absolute',
      left: envPosition?.left || 221,
      top: envPosition?.top || -221,
      zIndex: 2,
    },
    fire: {
      position: 'absolute',
      left: envPosition?.left || 120,
      bottom: envPosition?.bottom || 300,
      zIndex: 2,
    },
  });

  return renderIf(
    environment,
    <Image
      style={styles[environment] && styles[environment]}
      source={getEnvironment(environment)}
    />,
  );
};
