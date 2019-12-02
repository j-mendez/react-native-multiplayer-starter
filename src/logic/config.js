'use strict';
/**
 *
 * @format
 * @flow
 */

import {Animated} from 'react-native';
import {State as GestureState} from 'react-native-gesture-handler';

export const _lastOffset = {
  x: 0,
  y: 0,
};
export const ATTACK_CLEAR_DURATION = 3500;
export const ENV_COOLDOWN_DURATION = 30000;
export const CONTROLLER_BOTTOM_POSITION = 60;
export const _translateX = new Animated.Value(0);
export const _translateY = new Animated.Value(0);
export const JOYSTICK_DISTANCE = 100;
export const JOYSTICK_DISTANCE_HITSLOP = {
  top: JOYSTICK_DISTANCE,
  left: JOYSTICK_DISTANCE,
  right: JOYSTICK_DISTANCE,
  bottom: JOYSTICK_DISTANCE,
};
export const joyStickTranslateX = Animated.diffClamp(_translateX, -18, 18);
export const joyStickTranslateY = Animated.diffClamp(_translateY, -18, 18);
export const joyStickGestureEvent = Animated.event(
  [{nativeEvent: {translationX: _translateX, translationY: _translateY}}],
  {useNativeDriver: false},
);

export const joyStickHandlerChange = ({nativeEvent}) => {
  if (nativeEvent.oldState === GestureState.ACTIVE) {
    _lastOffset.x += nativeEvent.translationX;
    _lastOffset.y += nativeEvent.translationY;
    _translateX.setOffset(_lastOffset.x);
    _translateX.setValue(0);
    _translateY.setOffset(_lastOffset.y);
    _translateY.setValue(0);
  }
};

export const getColor = (hp: number, mainColor: string) => {
  switch (hp) {
    case 1:
      return '#FF5722';
    case 2:
      return '#CDDC39';
    default:
      return mainColor || '#000';
  }
};
