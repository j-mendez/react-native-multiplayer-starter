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
import {Player} from 'components';
import {localStorage, getSkins, skinMap, keyExtractor} from 'utils';
import {menuButtonStyle} from 'style';

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
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Skins</Text>
        <Player sticky />
      </View>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <Item item={item} updateData={updateData} highScore={highScore} />
        )}
        keyExtractor={keyExtractor}
        style={styles.listContainer}
      />
      <Button onPress={() => setState({scene: ''})} {...menuButtonStyle}>
        Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    padding: 2,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    flex: 1,
  },
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
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default Skins;
