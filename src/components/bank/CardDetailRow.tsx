import Animated, {
  withDelay,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {CardDetailRowProps} from './types';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';
import {SM_FONT_UPSCALE_FACTOR, XSM_FONT_UPSCALE_FACTOR} from '@utils/device';

const copyPath =
  'M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z';

const checkPath =
  'M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

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
