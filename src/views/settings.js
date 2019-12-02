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
import {localStorage, getSettings, keyExtractor} from 'utils';
import {menuButtonStyle} from 'style';

function Item({item, updateData}) {
  return (
    <View style={styles.item}>
      <Text style={styles.cellTitle}>{item.id}</Text>
      <Switch
        onValueChange={() => updateData({[item.id]: !item.value})}
        value={item.value}
      />
    </View>
  );
}

const Settings: () => React$Node = () => {
  const [{settings}, setState] = useStateValue();

  const updateData = newSettings => {
    const source = {
      ...settings,
      ...newSettings,
    };

    setState({settings: source});
    localStorage.storeData('settings', source);
  };

  useEffect(
    () => {
      getSettings({setState});
    },
    [setState],
    [],
  );

  const dataSource =
    (settings &&
      Object.entries(settings)
        .sort()
        .map(entry => ({
          id: entry[0],
          value: entry[1],
        }))) ||
    [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <FlatList
        data={dataSource}
        renderItem={({item}) => <Item item={item} updateData={updateData} />}
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
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
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
  highlight: {
    backgroundColor: '#ccc',
  },
});

export default Settings;
