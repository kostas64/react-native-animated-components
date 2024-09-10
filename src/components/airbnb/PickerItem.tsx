import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {TPickerItem} from './types';
import {WIDTH} from '@utils/device';
import {typography} from '@utils/typography';

const PickerItem = ({label, onPress, style}: TPickerItem) => (
  <Pressable onPress={onPress} style={[styles.pickerItem, style]}>
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

export default PickerItem;

const styles = StyleSheet.create({
  pickerItem: {
    width: (WIDTH - 89) / 3,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  label: {
    fontFamily: typography.semiBold,
  },
});
