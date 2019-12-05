'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {StyleSheet, Switch, View, Text, FlatList} from 'react-native';
import Button from 'react-native-really-awesome-button';
import {useStateValue} from 'state';
import {Player, Title} from 'components';
import {localStorage, getSkins, skinMap} from 'utils';
import {menuButtonStyle, containerStyle} from 'style';

function Item({item, updateData, highScore}) {
  const {value, unlocked} = item.details;

  return (
    <View style={styles.item}>
      <Text style={styles.cellTitle}>{item.id}</Text>
      {/* eslint no-eval: 0 */
      eval(unlocked) ? (
        <Switch
          onValueChange={() =>
            updateData({
              [item.id]: {
                value: !value,
                unlocked,
              },
            })
          }
          value={value}
        />
      ) : (
        <Text>Locked</Text>
      )}
    </View>
  );
}

const Skins: () => React$Node = () => {
  const [{skins, highScore}, setState] = useStateValue();

  const updateData = newSkin => {
    const source = {
      ...skinMap,
      ...newSkin,
    };

    setState({skins: source});
    localStorage.storeData('skins', source);
  };

  useEffect(
    () => {
      getSkins({setState});
    },
    [setState],
    [],
  );

  const dataSource =
    (skins &&
      Object.entries(skins)
        .sort()
        .map(([id, details]) => ({
          id,
          details,
        }))
        .sort((a, b) => eval(a.details.unlocked) < eval(b.details.unlocked))) ||
    [];

  return (
    <View style={containerStyle.container}>
      <View style={styles.row}>
        <Title>Skins</Title>
        <Player sticky />
      </View>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <Item item={item} updateData={updateData} highScore={highScore} />
        )}
      />
      <Button onPress={() => setState({scene: ''})} {...menuButtonStyle}>
        Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellTitle: {
    fontSize: 22,
    flex: 1,
    fontWeight: 'bold',
  },
  cellDetails: {
    fontSize: 18,
    flex: 1,
    fontWeight: 'normal',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Skins;
