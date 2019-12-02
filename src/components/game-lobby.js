'use strict';
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'react-native-really-awesome-button';
import {renderIf} from 'utils';

export default ({color, setState, render}) =>
  renderIf(
    render,
    <>
      <View style={styles.center}>
        <Text style={[styles.searching, {color: color}]}>
          Waiting for players
        </Text>
      </View>
      <Button
        backgroundColor={color}
        width={50}
        height={50}
        borderRadius={25}
        onPress={() => setState({scene: ''})}
        style={styles.cancelButton}>
        X
      </Button>
    </>,
  );

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  searching: {
    fontSize: 30,
    fontWeight: '600',
    opacity: 1,
    textAlign: 'center',
  },
});
