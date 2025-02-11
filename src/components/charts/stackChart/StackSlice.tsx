import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';

import {TStackSlice} from './types';
import {barHeight} from './constants';

const StackSlice = ({
  animate,
  style,
  width,
  index,
  item,
  setTooltip,
  resetTooltip,
}: TStackSlice) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(
      animate.value,
      [(index - 1) * 0.25, index * 0.25],
      [0, Math.round(width)],
      Extrapolation.CLAMP,
    ),
    zIndex: 10000,
  }));

  return (
    <>
      <Animated.View
        style={[style, animatedStyle]}
        onTouchStart={(e: GestureResponderEvent) =>
          setTooltip({
            x: e.nativeEvent.pageX - 48,
            y: e.nativeEvent.pageY,
            ...item,
          })
        }
      />
      <View
        onTouchStart={resetTooltip}
        style={[styles.boxBehind, {height: barHeight}]}
      />
    </>
  );
};

export default StackSlice;

const styles = StyleSheet.create({
  boxBehind: {
    position: 'absolute',
    width: '100%',
  },
});
