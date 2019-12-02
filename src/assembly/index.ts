'use strict';
import {getRandomColor} from './random-color';
import {State} from './state';

const state = new State('', 3, false, getRandomColor(), 0, 0, 0);
export {getRandomColor, state};
