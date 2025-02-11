import Animated, {
  withDelay,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import {Path} from 'react-native-svg';
import {Pressable, StyleSheet, View} from 'react-native';

import Text from '@components/Text';
import {CardDetailRowProps} from './types';
import {checkPath, copyPath} from './data';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';
import {AnimatedSvg} from '@components/AnimatedComponents';
import {SM_FONT_UPSCALE_FACTOR, XSM_FONT_UPSCALE_FACTOR} from '@utils/device';

const CardDetailRow = ({
  label,
  value,
  hidden,
  pressedStyle,
}: CardDetailRowProps) => {
  const progress = useSharedValue(0);
  const progressShow = useSharedValue(90);

  const onPressAnimate = () => {
    if (progress.value === 0) {
      progress.value = withTiming(1, {}, finished => {
        if (finished) {
          progress.value = withDelay(2500, withTiming(0, {duration: 150}));
        }
      });
    }
  };

  if (hidden) {
    progressShow.value = withTiming(0);
    progress.value = 0;
  } else {
    progressShow.value = withTiming(90);
  }

  const copyStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
    transform: [
      {
        translateX: interpolate(
          progressShow.value,
          [60, 90],
          [32, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const checkStyle = useAnimatedProps(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  const hiddenValue = useAnimatedStyle(() => ({
    transform: [
      {
        rotateX: `${interpolate(
          progressShow.value,
          [0, 45],
          [0, 90],
          Extrapolation.CLAMP,
        )}deg`,
      },
      {
        translateX: interpolate(
          progressShow.value,
          [60, 90],
          [16, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const visibleValue = useAnimatedStyle(() => ({
    transform: [{rotateX: `${90 - progressShow.value}deg`}],
  }));

  return (
    <Pressable
      disabled={hidden}
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
        <Animated.Text
          style={[styles.value, visibleValue]}
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
          {value}
        </Animated.Text>
        <Animated.Text
          style={[styles.valueHidden, hiddenValue]}
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
          {value.replace(/[^/ ]/g, '✱')}
        </Animated.Text>
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
            style={styles.absolute}>
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
  absolute: {
    position: 'absolute',
  },
  container: {
    padding: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
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
  valueHidden: {
    color: 'black',
    fontSize: 10,
    position: 'absolute',
    right: 20,
    top: 3,
    transform: [{rotateX: '90deg'}],
    backfaceVisibility: 'hidden',
    fontFamily: typography.regular,
  },
});
