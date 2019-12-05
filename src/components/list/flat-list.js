'use strict';
/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {FlatList} from 'react-native';
import {Title} from 'components';
import {keyExtractor} from 'utils';

export default ({data, title, renderItem, ...props}) => (
  <FlatList
    data={data}
    ListHeaderComponent={() => <Title>{title}</Title>}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    {...props}
  />
);
