'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {FlatList, StyleSheet, ImageBackground, View, Text} from 'react-native';
import Button from 'react-native-really-awesome-button';
import {useStateValue} from 'state';
import {Player, JoyStick, HighScore} from 'components';
import {menuButtonStyle, containerStyle} from 'style';
import {MENU_DATA} from 'logic';
import {getSkins, getSettings, keyExtractor} from 'utils';
import {name as appName} from '../../app.json';

function MenuItem({item: {name, scene, onPress}, index, setState}) {
  return (
    <Button
      onPress={() => (onPress && onPress()) || setState({scene})}
      {...menuButtonStyle}>
      {name}
    </Button>
  );
}

const Landing: () => React$Node = () => {
  const [{settings}, setState] = useStateValue();

  useEffect(
    () => {
      getSkins({setState});
      getSettings({setState});
    },
    [setState],
    [],
  );

  return (
    <ImageBackground
      source={
        settings && settings['background-animation']
          ? require('../assets/game-background.gif')
          : require('../assets/game-background.jpg')
      }
      style={styles.background}>
      <View style={containerStyle.base}>
        <View style={styles.row}>
          <Text style={styles.title}>{appName}</Text>
          <HighScore />
        </View>
        <FlatList
          data={MENU_DATA}
          ItemSeparatorComponent={() => <View style={styles.spacer} />}
          style={containerStyle.base}
          contentContainerStyle={styles.innerContainer}
          renderItem={({item}, index) => (
            <MenuItem item={item} setState={setState} index={index} />
          )}
          keyExtractor={keyExtractor}
        />
        <Player />
        <JoyStick />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    padding: 22,
    paddingTop: 0,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  spacer: {
    height: 20,
  },
});

export default Landing;
