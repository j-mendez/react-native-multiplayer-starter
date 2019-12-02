'use strict';
/**
 *
 * @format
 * @flow
 */

import {Landing, Leaderboard, Game, Settings, Skins} from 'views';
import {useStateValue} from 'state';

export default function() {
  switch (useStateValue()[0].scene) {
    case 'Game':
      return Game;
    case 'Leaderboard':
      return Leaderboard;
    case 'Settings':
      return Settings;
    case 'Skins':
      return Skins;
    default:
      return Landing;
  }
}
