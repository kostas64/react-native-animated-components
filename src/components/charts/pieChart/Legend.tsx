import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {TLegend} from './types';
import {data, total, width} from './data';
import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const Legend = ({progress, selectedValue}: TLegend) => {
  return (
    <Animated.View style={styles.legendContainer}>
      {data.map((item, index) => {
        const dataLength = data.length;
        const step = 1 / dataLength;

        const animatedStyle = useAnimatedStyle(() => ({
          opacity: !selectedValue.value
            ? interpolate(
                progress.value,
                [index * step, (index + 1) * step],
                [0, 1],
                Extrapolation.CLAMP,
              )
            : selectedValue.value === item.value
            ? 1
            : 0.25,
          transform: [
            {
              translateX: interpolate(
                progress.value,
                [index * step, (index + 1) * step],
                [16, 0],
                Extrapolation.CLAMP,
              ),
            },
          ],
        }));

        return (
          <Animated.View
            key={index}
            style={[animatedStyle, styles.innerLegendContainer]}>
            <View
              style={[styles.legendBullet, {backgroundColor: item.color}]}
            />
            <Text
              maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
              style={styles.legendLabel}>{`${item.label} (${
              (item.value / total) * 100
            }%)`}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

export default Legend;

const styles = StyleSheet.create({
  legendContainer: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerLegendContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBullet: {
    width: 12,
    height: 12,
    marginRight: 4,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 10,
    fontFamily: typography.regular,
  },
});
