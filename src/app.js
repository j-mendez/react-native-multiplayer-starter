'use strict';
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {currentScene} from 'utils';

const App: () => React$Node = () => React.createElement(currentScene());

export default App;
