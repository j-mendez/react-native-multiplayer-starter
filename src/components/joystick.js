'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useStateValue} from 'state';
import {
  CONTROLLER_BOTTOM_POSITION,
  JOYSTICK_DISTANCE_HITSLOP,
  joyStickHandlerChange,
  joyStickGestureEvent,
  joyStickTranslateX,
  joyStickTranslateY,
  _translateX,
  _translateY,
} from 'logic';

const JoyStick: () => React$Node = () => {
  const setState = useStateValue()[1];

  useEffect(
    () => {
      const xListener = _translateX.addListener(({value}) =>
        setState({_translateX: value}),
      );
      const yListener = _translateY.addListener(({value}) =>
        setState({_translateY: value}),
      );

      return () => {
        _translateY.removeListener(yListener);
        _translateX.removeListener(xListener);
      };
    },
    [setState],
    [],
  );

  return (
    <PanGestureHandler
      hitSlop={JOYSTICK_DISTANCE_HITSLOP}
      onGestureEvent={joyStickGestureEvent}
      onHandlerStateChange={joyStickHandlerChange}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={[
            styles.subContainer,
            {
              transform: [
                {translateX: joyStickTranslateX},
                {translateY: joyStickTranslateY},
              ],
            },
          ]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    position: 'absolute',
    left: '12%',
    bottom: CONTROLLER_BOTTOM_POSITION,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  subContainer: {
    borderRadius: 17.5,
    width: 35,
    height: 35,
    backgroundColor: 'rgba(30,30,30,0.5)',
    opacity: 0.1,
  },
});

export default JoyStick;
