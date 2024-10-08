import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {TMonthPicker} from './types';
import {typography} from '@utils/typography';

const MonthPicker = ({month, onPress}: TMonthPicker) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.monthContainer}
      onPress={() => onPress(month)}>
      <Text style={styles.month}>{month}</Text>
      <Feather
        size={26}
        color="white"
        name="chevron-down"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

export default MonthPicker;

const styles = StyleSheet.create({
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    paddingVertical: 6,
    paddingRight: 12,
    alignSelf: 'flex-start',
  },
  month: {
    color: 'white',
    fontSize: 30,
    lineHeight: 34,
    marginLeft: 20,
    fontFamily: typography.bold,
  },
  chevron: {
    top: 2,
    left: 4,
  },
});
