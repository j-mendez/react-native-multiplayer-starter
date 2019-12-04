'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useEffect, useCallback} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
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
  const [{environment, envPosition}, setState] = useStateValue();

  const updateEnv = useCallback(() => {
    setState({
      environment: setEnvironment(environment),
      envPosition: {
        water: {
          left:
            !environment &&
            Math.floor(Math.random() * Dimensions.get('screen').width - 20) + 1,
          top: !environment && Math.floor(Math.random() * -251) + 1,
        },
      },
    });
  }, [environment, setState]);

  useEffect(
    () => {
      const timedEnv = setInterval(updateEnv, ENV_COOLDOWN_DURATION);

      return () => {
        clearInterval(timedEnv);
      };
    },
    [updateEnv],
    [],
  );

  const styles = StyleSheet.create({
    water: {
      position: 'absolute',
      left: envPosition?.water?.left || 221,
      top: envPosition?.water?.top || -221,
      zIndex: 2,
    },
    fire: {
      position: 'absolute',
      left: 120,
      bottom: 300,
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
