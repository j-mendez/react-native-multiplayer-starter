'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useEffect, useMemo} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import {
  Player,
  JoyStick,
  GamePad,
  Enemies,
  Environment,
  HighScore,
  GameLobby,
} from 'components';
import {data, updateUser} from 'logic';
import {useStateValue} from 'state';
import {useDebounce} from 'use-debounce';
import {getSettings, renderIf, selectedSkin, loadAd} from 'utils';
import {containerStyle} from 'style';

let gameplayCount = 0;
let oldKills;

const Game: () => React$Node = () => {
  const [state, setState] = useStateValue();
  const gameState = useDebounce(state, 20, {leading: true, maxWait: 60})[0];

  useEffect(
    () => {
      gameplayCount++;
      data.getLobby({state, setState});
      getSettings({setState});

      const _handleAppStateChange = nextAppState => {
        if (nextAppState === 'background') {
          setState({scene: ''});
          data.closeLobby();
        }
      };

      AppState.addEventListener('change', _handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', _handleAppStateChange);
        data.closeLobby();
        oldKills = 0;
        setState({kills: 0, playerData: undefined, hp: 3});
        if (gameplayCount % 3 || gameplayCount === 1) {
          if (__DEV__ && gameplayCount > 1) {
            return;
          }
          loadAd();
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
    [],
  );

  useMemo(() => {
    const {settings, playerData, skins, ...newGameState} = gameState;
    updateUser({state: newGameState});
  }, [gameState]);

  useMemo(
    () => {
      if (gameState.kills && oldKills !== gameState.hp) {
        const newHp = gameState.hp + 1;
        setState({hp: newHp});
        oldKills = newHp;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameState.kills, setState],
  );

  const gameCommenced =
    state?.playerData && Object.keys(state?.playerData).length;

  return (
    <View style={containerStyle.base}>
      {renderIf(
        state?.kills,
        <Text style={[styles.kills, {color: state.color}]}>{state.kills}</Text>,
      )}
      <GameLobby
        setState={setState}
        color={selectedSkin(state?.health, state?.color, true)}
        render={!gameCommenced}
      />
      {renderIf(gameCommenced, <Environment />)}
      <Player />
      <Enemies />
      <JoyStick />
      <GamePad />
      <HighScore />
    </View>
  );
};

const styles = StyleSheet.create({
  kills: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 55,
    fontWeight: 'bold',
    opacity: 0.6,
  },
});

export default Game;
