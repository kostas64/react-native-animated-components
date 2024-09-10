import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {PlaceholderFunction} from './types';

const Placeholder = React.forwardRef<PlaceholderFunction | undefined>(
  ({}, ref) => {
    const progress = useSharedValue(0);

    const animStyle = useAnimatedStyle(() => ({
      transform: [
        {translateY: interpolate(progress.value, [0, 0.45, 1], [0, 0, -16])},
      ],
      height: interpolate(progress.value, [0, 0.45, 1], [1, 1, 16]),
      width: interpolate(progress.value, [0, 0.45, 1], [16, 1, 16]),
      borderRadius: interpolate(progress.value, [0, 0.45, 1], [0, 0, 8]),
      backgroundColor: interpolateColor(
        progress.value,
        [0, 0.45, 0.85, 1],
        ['#ffecdb', '#ffecdb', '#ffecdb', '#e3a68f'],
      ),
    }));

    React.useImperativeHandle(ref, () => ({
      animatePlaceholder,
      animateRemove,
    }));

    const animatePlaceholder = () => {
      progress.value = withTiming(1, {duration: 400});
    };

    const animateRemove = () => {
      progress.value = withTiming(0, {duration: 400});
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[animStyle, styles.placeholder]} />
      </View>
    );
  },
);

export default Placeholder;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 48,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: '#ffecdb',
  },
});
