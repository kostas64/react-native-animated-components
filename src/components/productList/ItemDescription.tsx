import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {items} from './data';
import {WIDTH} from '@utils/device';
import {typography} from '@utils/typography';

const ItemDescription = ({index}: {index: number}) => {
  return (
    <View style={styles.container}>
      <View style={styles.spaceBottom}>
        <Text style={[styles.text, {color: items[index]?.halfFontColor}]}>
          Form Factor
        </Text>
        <Text style={[styles.value, {color: items[index]?.fontColor}]}>
          {items[index]?.formFactor}
        </Text>
      </View>
      <View style={styles.spaceBottom}>
        <Text style={[styles.text, {color: items[index]?.halfFontColor}]}>
          Connection
        </Text>
        <Text style={[styles.value, {color: items[index]?.fontColor}]}>
          {items[index]?.connection}
        </Text>
      </View>
      <View>
        <Text style={[styles.text, {color: items[index]?.halfFontColor}]}>
          Power source
        </Text>
        <Text style={[styles.value, {color: items[index]?.fontColor}]}>
          {items[index]?.power}
        </Text>
      </View>
    </View>
  );
};

export default ItemDescription;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: 24,
  },
  text: {
    fontSize: WIDTH / 20,
    fontFamily: typography.regular,
  },
  value: {
    fontSize: WIDTH / 15,
    fontFamily: typography.bold,
  },
  spaceBottom: {
    paddingBottom: '10%',
  },
});
