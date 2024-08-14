import Animated, {
  withTiming,
  interpolate,
  SharedValue,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  Extrapolation,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HEIGHT_SCR, WIDTH} from '@utils/device';

const RADIUS = WIDTH / 2 - 32;

interface CircularProgressProps {
  progress: SharedValue<number>;
  bg: string;
  fg: string;
}

//@ts-ignore
const transformOrigin = ({x, y}: {x: number; y: number}, transformations) => {
  'worklet';
  return [{translateX: x}, {translateY: y}]
    .concat(transformations)
    .concat([{translateX: -x}, {translateY: -y}]);
};

const HalfCircle = ({color = 'red'}) => (
  <View
    style={{
      width: RADIUS * 2,
      height: RADIUS,
      overflow: 'hidden',
    }}>
    <View
      style={{
        backgroundColor: color,
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderRadius: RADIUS,
      }}
    />
  </View>
);

const CircularProgress = ({progress, bg, fg}: CircularProgressProps) => {
  const theta = useDerivedValue(() => {
    return progress.value * 2 * Math.PI;
  });

  const rotateFirstHalf = useDerivedValue(() => {
    return interpolate(
      theta.value,
      [Math.PI, 2 * Math.PI],
      [0, Math.PI],
      Extrapolation.CLAMP,
    );
  });

  const opacity = useDerivedValue(() => {
    return theta.value < Math.PI ? 1 : 0;
  });

  const firstHalfStyle = useAnimatedStyle(() => {
    return {
      transform: transformOrigin(
        {x: 0, y: RADIUS / 2},
        {rotate: `${theta.value}rad`},
      ),
      opacity: opacity.value,
    };
  });

  const secondHalfStyle = useAnimatedStyle(() => {
    return {
      transform: transformOrigin(
        {x: 0, y: RADIUS / 2},
        {rotate: `${rotateFirstHalf.value}rad`},
      ),
    };
  });

  return (
    <>
      <View style={{alignItems: 'center', transform: [{rotate: '90deg'}]}}>
        <View style={{zIndex: 1}}>
          <HalfCircle color={fg} />
          <Animated.View style={[StyleSheet.absoluteFill, firstHalfStyle]}>
            <HalfCircle color={bg} />
          </Animated.View>
        </View>
        <View style={{transform: [{rotate: '180deg'}]}}>
          <HalfCircle color={fg} />
          <Animated.View style={[StyleSheet.absoluteFill, secondHalfStyle]}>
            <HalfCircle color={bg} />
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const CircularProgressScreen = () => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(1, {duration: 3000});
  }, []);

  return (
    <View
      style={{
        top: (HEIGHT_SCR - RADIUS * 2) / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CircularProgress bg="#E5E5E5" fg="#60D260" progress={progress} />
    </View>
  );
};

export default CircularProgressScreen;
