'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useMemo} from 'react';
import {StyleSheet, Animated} from 'react-native';
import {data, getColor, _translateX, _translateY} from 'logic';
import {useStateValue} from 'react-estate';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {sound, selectedSkin} from 'utils';
import Powerup from './powerup';

let shieldFromAttacks = false;

const Player: () => React$Node = ({enemyState, sticky}) => {
  const [state, setState] = useStateValue();
  const {attack, hp, color} = state;

  useMemo(
    () => {
      if (enemyState?.state?.attack && !shieldFromAttacks) {
        if (
          Math.abs(enemyState?.state?._translateX - state?._translateX) <= 5 ||
          Math.abs(enemyState?.state?._translateY - state?._translateY) <= 5
        ) {
          shieldFromAttacks = true;
          const ko = state?.hp === 1;

          setState({
            scene: ko ? '' : 'Game',
            hp: ko ? 3 : state.hp - 1,
          });

          state?.settings?.buzzer &&
            ReactNativeHapticFeedback.trigger('impactLight');
          state?.settings?.sound && sound('damage');

          if (ko) {
            data?.currentUser?.remove();
            data?.currentGame?.child(enemyState.id).update({
              kills: !enemyState?.state?.kills
                ? 1
                : enemyState?.state?.kills + 1,
            });
            state?.settings?.sound && sound('death');
          }
          setTimeout(() => {
            shieldFromAttacks = false;
          }, 1500);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enemyState, setState],
  );

  const translateX = enemyState ? enemyState.state?._translateX : _translateX;
  const translateY = enemyState ? enemyState.state?._translateY : _translateY;
  const attacking = enemyState ? enemyState.state?.attack : attack;
  const health = enemyState ? enemyState.state?.hp : hp;
  const playerColor = enemyState ? enemyState.state?.color : color;
  const kills = enemyState ? enemyState?.state?.kills : state?.kills;

  const skinProps =
    !enemyState && hp === 3 ? selectedSkin(state?.skins, playerColor) : {};

  return (
    <Powerup kills={kills}>
      <Animated.View
        style={[
          styles.container,
          sticky && styles.sticky,
          attacking && styles.shield,
          {
            backgroundColor: getColor(health, playerColor),
            ...skinProps,
          },
          sticky
            ? {}
            : {
                transform: [{translateX}, {translateY}],
              },
        ]}
      />
    </Powerup>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: '#000',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  shield: {
    backgroundColor: '#ccc',
    borderWidth: 5,
    borderColor: '#ccc',
  },
  sticky: {
    position: 'relative',
    left: 0,
    top: 0,
  },
});

export default Player;
