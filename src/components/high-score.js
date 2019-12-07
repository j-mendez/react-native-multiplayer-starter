'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useMemo, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useStateValue} from 'react-estate';
import {data} from 'logic';
import {renderIf} from 'utils';

export default () => {
  const [{kills, highScore, scene}, setState] = useStateValue();

  useEffect(
    () => {
      data.scene !== 'Game' && data.getHighScore({setState});
    },
    [setState],
    [],
  );

  useMemo(() => {
    kills > highScore && data.setHighScore({kills, setState});
  }, [kills, highScore, setState]);

  return renderIf(
    scene !== 'Game' && highScore,
    <Text style={styles.text}>High Score {highScore}</Text>,
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: '200',
  },
});
