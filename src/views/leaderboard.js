'use strict';
/**
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import Button from 'react-native-really-awesome-button';
import {useStateValue} from 'state';
import {data} from 'logic';
import {menuButtonStyle} from 'style';
import Chance from 'chance';
import {getWeight, keyExtractor} from 'utils';

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
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={currentBoard}
        renderItem={Item}
        keyExtractor={keyExtractor}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={() => setState({scene: ''})} {...menuButtonStyle}>
          Home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
  },
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
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    padding: 25,
  },
});

export default Leaderboard;
