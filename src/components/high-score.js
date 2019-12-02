'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useMemo, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useStateValue} from 'state';
import {data} from 'logic';

export default () => {
  const [{kills, highScore, scene}, setState] = useStateValue();

  useEffect(
    () => {
      if (data.scene !== 'Game') {
        data.getHighScore({setState});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
    [],
  );

  useMemo(() => {
    if (kills > highScore) {
      data.setHighScore({kills, setState});
    }
  }, [kills, highScore, setState]);

  return scene !== 'Game' && highScore ? (
    <Text style={styles.text}>High Score {highScore}</Text>
  ) : null;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: '200',
  },
});
