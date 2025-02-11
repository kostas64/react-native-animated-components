import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import Text from '@components/Text';
import StackSlice from './StackSlice';
import {TStackSliceItem} from './types';
import {typography} from '@utils/typography';
import {XSM_FONT_UPSCALE_FACTOR} from '@utils/device';
import {barHeight, chartWidth, colors, maxQuarter} from './constants';

const StackSliceItem = ({
  item,
  index,
  animate,
  setTooltip,
  isSelected,
  resetTooltip,
}: TStackSliceItem) => {
  const opacity = useAnimatedStyle(() => ({
    opacity: withTiming(isSelected === null || !!isSelected ? 1 : 0.25),
  }));

  return (
    <View style={styles.container}>
      <Text
        style={styles.quarterLabel}
        maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}>{`Q${index + 1}`}</Text>
      <StackSlice
        index={1}
        item={item}
        animate={animate}
        setTooltip={setTooltip}
        resetTooltip={resetTooltip}
        width={(item.payroll / maxQuarter) * (chartWidth - 25)}
        style={[
          opacity,
          {
            height: barHeight,
            bottom: -1,
            backgroundColor: colors?.['payroll'],
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          },
        ]}
      />
      <StackSlice
        index={2}
        item={item}
        animate={animate}
        setTooltip={setTooltip}
        resetTooltip={resetTooltip}
        width={(item.operations / maxQuarter) * (chartWidth - 25)}
        style={[
          opacity,
          {
            height: barHeight,
            bottom: -1,
            backgroundColor: colors?.['operations'],
          },
        ]}
      />
      <StackSlice
        index={3}
        item={item}
        animate={animate}
        setTooltip={setTooltip}
        resetTooltip={resetTooltip}
        width={(item.electricity / maxQuarter) * (chartWidth - 25)}
        style={[
          opacity,
          {
            height: barHeight,
            bottom: -1,
            backgroundColor: colors?.['electricity'],
          },
        ]}
      />
      <StackSlice
        index={4}
        item={item}
        animate={animate}
        setTooltip={setTooltip}
        resetTooltip={resetTooltip}
        width={(item.travel / maxQuarter) * (chartWidth - 25)}
        style={[
          opacity,
          {
            height: barHeight,
            bottom: -1,
            backgroundColor: colors?.['travel'],
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
          },
        ]}
      />
      {index === 0 && <View style={styles.separator} />}
    </View>
  );
};

export default StackSliceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    zIndex: 1,
  },
  quarterLabel: {
    fontSize: 14,
    lineHeight: 18,
    width: 23,
    marginRight: 10,
    fontFamily: typography.medium,
    alignSelf: 'center',
  },
  separator: {
    position: 'absolute',
    width: 1,
    left: 32,
    top: -12,
    height: 236,
    backgroundColor: '#d3d3d3',
  },
});
