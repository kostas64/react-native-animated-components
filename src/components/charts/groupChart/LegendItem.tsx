import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from '@components/Text';
import {TLegendItem} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const LegendItem = ({label, color}: TLegendItem) => {
  return (
    <View style={styles.itemContainer}>
      <View style={[styles.itemDot, {backgroundColor: color}]} />
      <Text
        style={styles.itemLabel}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>
    </View>
  );
};

export default LegendItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDot: {
    width: 20,
    height: 20,
    borderRadius: 6,
    marginRight: 5,
  },
  itemLabel: {
    fontSize: 12,
    fontFamily: typography.semiBold,
  },
});
