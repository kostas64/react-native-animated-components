import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {data} from './data';
import {TTab} from './types';
import {typography} from '@utils/typography';

const Tab = React.forwardRef(({item, onItemPress}: TTab, ref: any) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={styles.label}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default Tab;

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 84 / data.length,
    textTransform: 'uppercase',
    fontFamily: typography.semiBold,
  },
});
