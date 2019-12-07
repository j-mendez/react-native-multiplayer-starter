'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from 'react-native-really-awesome-button';
import {useStateValue} from 'react-estate';
import {data} from 'logic';
import {FlatList} from 'components';
import {menuButtonStyle, containerStyle} from 'style';
import Chance from 'chance';
import {getWeight} from 'utils';

function Item({item}) {
  const chance = new Chance(getWeight(item.id));

  return (
    <View style={[styles.item, item.id === data.getUser && styles.highlight]}>
      <View style={styles.flex}>
        <Text style={styles.cellTitle}>{chance.word()}</Text>
        <Text style={styles.cellDetails}>KILLS {item.value}</Text>
      </View>
    </View>
  );
}

const Leaderboard: () => React$Node = () => {
  const [currentBoard, setBoard] = useState([]);
  const setState = useStateValue()[1];

  useEffect(
    () => {
      data.getHighScore({setState}).then(scores => {
        let board = [];
        for (var item in scores) {
          board.push({id: item, value: scores[item]});
        }
        setBoard(board);
      });
    },
    [setState],
    [],
  );

  return (
    <View style={containerStyle.container}>
      <FlatList data={currentBoard} title={'Leaderboard'} renderItem={Item} />
      <Button onPress={() => setState({scene: ''})} {...menuButtonStyle}>
        Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cellTitle: {
    fontSize: 22,
    flex: 1,
    fontWeight: 'bold',
    maxWidth: '90%',
  },
  cellDetails: {
    fontSize: 18,
    flex: 1,
    fontWeight: 'normal',
  },
  flex: {
    flex: 1,
  },
  highlight: {
    backgroundColor: '#ccc',
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
});

export default Leaderboard;
