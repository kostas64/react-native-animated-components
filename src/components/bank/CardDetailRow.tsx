import Animated, {
  withDelay,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import React from 'react';
import {Path} from 'react-native-svg';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {CardDetailRowProps} from './types';
import {checkPath, copyPath} from './data';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';
import {AnimatedSvg} from '@components/AnimatedSvg';
import {SM_FONT_UPSCALE_FACTOR, XSM_FONT_UPSCALE_FACTOR} from '@utils/device';

const CardDetailRow = ({label, value, pressedStyle}: CardDetailRowProps) => {
  const progress = useSharedValue(0);

  const onPressAnimate = () => {
    if (progress.value === 0) {
      progress.value = withTiming(1, {}, finished => {
        if (finished) {
          progress.value = withDelay(2500, withTiming(0, {duration: 150}));
        }
      });
    }
  };

  const copyStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
  }));

  const checkStyle = useAnimatedProps(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  return (
    <Pressable
      onPress={onPressAnimate}
      style={({pressed}) => [
        styles.container,
        pressed && [styles.halfOpacity, pressedStyle],
      ]}>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>
      <View style={styles.valueContainer}>
        <Text
          style={styles.value}
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
          {value}
        </Text>
        <View>
          <AnimatedSvg
            width={14}
            height={14}
            viewBox="0 0 115.77 122.88"
            style={copyStyle}>
            <CommonGradient id={'copy'} />
            <Path fill="url(#copy)" d={copyPath} />
          </AnimatedSvg>
          <AnimatedSvg
            width={16}
            height={16}
            viewBox="2 2 22 22"
            animatedProps={checkStyle}
            style={{position: 'absolute'}}>
            <CommonGradient id={'check'} />
            <Path fill="url(#check)" d={checkPath} />
          </AnimatedSvg>
        </View>
      </View>
    </Pressable>
  );
};

export default CardDetailRow;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#505050',
    fontFamily: typography.medium,
  },
  value: {
    color: 'black',
    fontFamily: typography.medium,
  },
  halfOpacity: {
    opacity: 0.5,
    backgroundColor: '#d9d9d9',
  },
});
