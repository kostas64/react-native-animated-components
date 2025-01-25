import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {TPickerItem} from './types';
import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';

const PickerItem = ({label, onPress, style}: TPickerItem) => (
  <Pressable onPress={onPress} style={[styles.pickerItem, style]}>
    <Text style={styles.label} maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
      {label}
    </Text>
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
