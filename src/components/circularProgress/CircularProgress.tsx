import Animated, {
  clamp,
  Easing,
  withTiming,
  withRepeat,
  interpolate,
  Extrapolation,
  AnimatedProps,
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import React, { useEffect, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Circle, CircleProps } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  startAngle?: number;
  animated?: boolean;
  duration?: number;
  withRepeat?: boolean;
  style?: StyleProp<ViewStyle>;
  repeatAnimation?: boolean;
  customAnimatedProps: Partial<AnimatedProps<CircleProps>>;
};

const CircularProgress = ({
  progress,
  size = 120,
  strokeWidth = 12,
  trackColor = "rgba(0,0,0,0.12)",
  progressColor = "#3B82F6",
  animated = true,
  duration = 750,
  style,
  repeatAnimation,
  customAnimatedProps,
}: Props) => {
  const clamped = clamp(progress, 0, 1);

  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const p = useSharedValue(clamped);

  useEffect(() => {
    if (!animated) {
      p.value = clamped;
      return;
    }

    if (repeatAnimation) {
      p.value = withRepeat(
        withTiming(clamped, {
          duration,
          easing: Easing.out(Easing.cubic),
        }),
        -1,
        true
      );
    } else {
      p.value = withTiming(clamped, {
        duration,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [animated, clamped, duration, repeatAnimation, p]);

  const animatedSvgStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(p.value, [0, 1], [0, 390], Extrapolation.CLAMP)}deg`,
      },
    ],
  }));

  // UI-thread clamp too (useful if p.value ever overshoots due to custom animations)
  const dashOffset = useDerivedValue(() => {
    const pv = clamp(p.value, 0, 1);
    return circumference * (1 - pv);
  }, [circumference]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  return (
    <Animated.View style={[{ width: size, height: size }, style]}>
      <AnimatedSvg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={animatedSvgStyle}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={[animatedProps, customAnimatedProps]}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export default CircularProgress;
