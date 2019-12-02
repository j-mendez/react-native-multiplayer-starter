'use strict';
/**
 *
 * @format
 * @flow
 */

import firebase from 'react-native-firebase';
import {Dimensions} from 'react-native';
import {state as defaultState} from 'assembly';
import {jsonCopy} from 'utils';

const gameLoop = ({state, setState}) =>
  data?.currentGame?.on('value', snapshot => {
    const playerData = jsonCopy(snapshot.val());
    if (!playerData) {
      return;
    }
    requestIdleCallback(() =>
      setState({
        playerData:
          typeof playerData === 'object' &&
          Object.keys(playerData)
            .filter(key => key !== data.getUser)
            .reduce((obj, key) => {
              obj[key] = playerData[key];
              return obj;
            }, {}),
        kills:
          playerData.hasOwnProperty(data.getUser) &&
          playerData[data.getUser].hasOwnProperty('kills')
            ? playerData[data.getUser].kills
            : 0,
      }),
    );
  });

const data = {
  currentUser: null,
  currentGame: null,
  get getUser() {
    return (firebase.auth().currentUser || {}).uid;
  },
  get lobby() {
    return firebase.database().ref('lobby');
  },
  get highscores() {
    return firebase.database().ref('highscores');
  },
  getHighScore: async ({setState}) => {
    let scores;
    await data.highscores.once('value', snapshot => {
      const snap = jsonCopy(snapshot);

      if (setState && typeof setState === 'function') {
        !snap[data.getUser] && data.highscores.child(data.getUser).set(0);
        setState({highScore: snap[data.getUser] || 0});
      }
      scores = snap;
    });

    return scores;
  },
  setHighScore: ({kills: highScore, setState}) => {
    data.highscores.child(data.getUser).set(highScore);
    setState({highScore});
  },
  getLobby: ({state, setState}) => {
    data.lobby.once('value', snapshot => {
      if (!snapshot.val()) {
        data.createLobby({state, setState});
        return;
      }
      snapshot.forEach(child => {
        if (child && Object.keys(child.val()).length < 10) {
          data.currentGame = data.lobby.child(child.key);
          data.currentGame.child(data.getUser).set(player);
          data.currentUser = data.currentGame.child(data.getUser);
          gameLoop({state, setState});
        }
      });
    });
  },
  createLobby: async ({state, setState}) => {
    const path = await data.lobby.push({});
    const childPath = path.child(data.getUser);
    childPath.set(player);
    data.currentGame = childPath.parent;
    data.currentUser = data.currentGame.child(data.getUser);
    gameLoop({state, setState});
  },
  closeLobby() {
    data?.currentUser?.remove();
    data?.lobby?.off();
    data.currentUser = null;
    data.currentGame = null;
  },
};

const player = {
  id: data.getUser,
  state: defaultState,
  viewPortWidth: Dimensions.get('screen').width,
  viewPortHeight: Dimensions.get('screen').height,
};

export const updateUser: void = ({
  state: {playerData, settings, skins, ...newState},
}) =>
  requestAnimationFrame(() => {
    data?.currentUser?.update({
      state: newState,
      id: data.getUser,
      viewPortWidth: Dimensions.get('screen').width,
      viewPortHeight: Dimensions.get('screen').height,
    });
  });

export default data;
