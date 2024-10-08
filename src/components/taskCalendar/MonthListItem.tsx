import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {TMonthListItem} from './types';
import {typography} from '@utils/typography';

const MonthListItem = ({item, index, scrollOffset}: TMonthListItem) => {
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
        [0.2, 0.5, 1, 0.5, 0.2],
      ),
    };
  });

  return (
    <Animated.View style={animStyle}>
      <Text style={styles.label}>{item}</Text>
    </Animated.View>
  );
};

export default MonthListItem;

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 22,
    fontFamily: typography.semiBold,
  },
});
