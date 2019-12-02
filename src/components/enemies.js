'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {memo} from 'react';
import {useStateValue} from 'state';
import Player from './player';

const Enemy = memo(Player);
const keyExtractor = (id, index) => `${id} ${index}`;

export default () => {
  const [{playerData}] = useStateValue();
  return playerData
    ? Object.values(playerData).map((usr, index) => (
        <Enemy enemyState={usr} key={keyExtractor(usr?.id, index)} />
      ))
    : null;
};
