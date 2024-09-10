import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {TCounterBtn} from './types';

const CounterBtn = ({isPlus, onPress, disabled}: TCounterBtn) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    activeOpacity={0.75}
    style={[disabled && styles.opacity, styles.container]}>
    <Entypo
      size={18}
      color={'rgb(150,150,150)'}
      name={isPlus ? 'plus' : 'minus'}
    />
  </TouchableOpacity>
);

export default CounterBtn;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgb(150,150,150)',
    borderRadius: 50,
  },
  opacity: {
    opacity: 0.3,
  },
});
