import {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {TTotalLabel} from './types';
import {StyleSheet} from 'react-native';

import {height} from './data';
import ReText from '@components/ReText';
import {typography} from '@utils/typography';
import {isIOS, SM_FONT_UPSCALE_FACTOR} from '@utils/device';

const TotalLabel = ({animatedText, progress}: TTotalLabel) => {
  const formattedText = useDerivedValue(
    () => ` ${animatedText.value ? animatedText.value : ''}`,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{translateX: interpolate(progress.value, [0, 1], [8, 0])}],
  }));

  return (
    <ReText
      text={formattedText}
      maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
      style={[styles.retext, animatedStyle]}
    />
  );
};
export default TotalLabel;

const styles = StyleSheet.create({
  retext: {
    right: 2,
    fontSize: 24,
    color: '#556d36',
    alignSelf: 'center',
    alignItems: 'center',
    fontFamily: typography.bold,
    top: height / 2 - (isIOS ? 14 : 24),
  },
});
