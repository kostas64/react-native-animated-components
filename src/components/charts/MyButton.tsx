import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {TChartButton} from './types';
import {typography} from '@utils/typography';

const MyButton = ({title, onPress}: TChartButton) => {
  return (
    <Pressable onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.btnLabel}>{title}</Text>
    </Pressable>
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
