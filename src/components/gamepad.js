'use strict';
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {useStateValue} from 'state';
import {sound} from 'utils';
import {ATTACK_CLEAR_DURATION, CONTROLLER_BOTTOM_POSITION} from 'logic';

const GamePad: () => React$Node = () => {
  const [{attack, settings}, setState] = useStateValue();
  const onHandlerStateChange = ({nativeEvent}) => {
    if (!attack && nativeEvent.state === State.ACTIVE) {
      setState({attack: true});
      settings?.sound && sound('attack');
      setTimeout(() => setState({attack: false}), ATTACK_CLEAR_DURATION);
      return;
    }
    settings?.sound && sound('cooldown');
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onHandlerStateChange}
      minDurationMs={100}>
      <Animated.View style={styles.container} />
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(33,150,33,0.4)',
    position: 'absolute',
    right: '12%',
    bottom: CONTROLLER_BOTTOM_POSITION,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: 'rgba(30,30,30,0.3)',
    opacity: 0.8,
  },
});

export default GamePad;
