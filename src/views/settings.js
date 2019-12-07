'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {StyleSheet, Switch, View, Text} from 'react-native';
import Button from 'react-native-really-awesome-button';
import {useStateValue} from 'react-estate';
import {FlatList} from 'components';
import {localStorage, getSettings} from 'utils';
import {menuButtonStyle, containerStyle} from 'style';

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
    <View style={containerStyle.container}>
      <FlatList
        data={dataSource}
        title={'Settings'}
        renderItem={({item}) => <Item item={item} updateData={updateData} />}
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
  highlight: {
    backgroundColor: '#ccc',
  },
});

export default Settings;
