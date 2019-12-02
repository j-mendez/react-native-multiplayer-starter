'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {createContext, useContext, useReducer} from 'react';
import {state} from 'assembly';
import reducer from './reducer';

const StateContext = createContext();
export const useStateValue = () => useContext(StateContext);

export const StateProvider = ({children}) => (
  <StateContext.Provider value={useReducer(reducer, state)}>
    {children}
  </StateContext.Provider>
);
