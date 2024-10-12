import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {TMonthListItem} from './types';
import {typography} from '@utils/typography';

const MonthListItem = ({
  item,
  index,
  scrollOffset,
  scrollToMonth,
}: TMonthListItem) => {
  const animStyle = useAnimatedStyle(() => {
    return {
      height: 46,
      opacity: interpolate(
        scrollOffset?.value ?? 0,
        [
          (index - 2) * 46,
          (index - 1) * 46,
          index * 46,
          (index + 1) * 46,
          (index + 2) * 46,
        ],
        [0.1, 0.3, 1, 0.3, 0.1],
      ),
    };
  });

  return (
    <Animated.View
      style={animStyle}
      onTouchStart={() => !!scrollToMonth && scrollToMonth(item)}>
      <Text style={styles.label}>{item}</Text>
    </Animated.View>
  );
};

export default MonthListItem;

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 22,
    lineHeight: 26,
    fontFamily: typography.semiBold,
  },
});
