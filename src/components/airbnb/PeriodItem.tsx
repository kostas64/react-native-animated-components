import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {CALENDAR_PER} from './data';
import {TPeriodItem} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const PeriodItem = ({item, onPress, isSelected, index}: TPeriodItem) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.periodItemContainer,
        isSelected ? styles.selectedPeriodItem : styles.unselectedPeriodItem,
        {
          marginLeft: index === 0 ? 20 : 0,
          marginRight: index !== CALENDAR_PER.length - 1 ? 10 : 20,
        },
      ]}>
      <Text
        style={styles.itemLabel}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {item}
      </Text>
    </Pressable>
  );
};

export default PeriodItem;

const styles = StyleSheet.create({
  periodItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  selectedPeriodItem: {
    backgroundColor: 'rgb(248, 248,248)',
    borderWidth: 2,
    borderColor: 'black',
  },
  unselectedPeriodItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(225,225,225)',
  },
  itemLabel: {
    fontFamily: typography.medium,
  },
});
