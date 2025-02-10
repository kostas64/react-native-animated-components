import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {FadeIn, FadeOut} from 'react-native-reanimated';

import {formatTime} from './utils';
import {TimerProps} from './types';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';
import {AnimatedPressable} from '@components/AnimatedComponents';

const Timer = ({onPress, time, style}: TimerProps) => {
  return (
    <AnimatedPressable
      entering={FadeIn}
      exiting={FadeOut}
      onPress={onPress}
      style={[styles.container, style]}>
      <Text
        style={styles.label}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {formatTime(time)}
      </Text>
      <Feather name="refresh-cw" size={18} color={'white'} />
    </AnimatedPressable>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e94476',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 100,
    left: (WIDTH - 100) / 2,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
  },
  label: {
    color: 'white',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    fontFamily: typography.medium,
  },
});
