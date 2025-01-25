import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS} from './data';
import LegendItem from './LegendItem';
import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const Legend = () => {
  return (
    <>
      <Text
        style={styles.title}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        Revenue
      </Text>
      <View style={styles.container}>
        <LegendItem label="Income" color={COLORS.income} />
        <LegendItem label="Expenses" color={COLORS.expenses} />
      </View>
    </>
  );
};

export default Legend;

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.semiBold,
  },
  container: {
    flexDirection: 'row',
    gap: 12,
  },
});
