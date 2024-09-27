import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {TChartButton} from './types';
import {typography} from '@utils/typography';

const MyButton = ({title, onPress}: TChartButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.btnContainer}>
      <Text style={styles.btnLabel}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#556d36',
    height: 52,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    minWidth: 140,
  },
  btnLabel: {
    color: 'white',
    lineHeight: 22,
    fontFamily: typography.semiBold,
  },
});