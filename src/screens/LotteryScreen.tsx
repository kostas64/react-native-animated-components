import Animated, {
  Easing,
  runOnJS,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Svg, Defs, Path, Stop, Polygon, LinearGradient} from 'react-native-svg';

import {
  SVG_H,
  SVG_W,
  RADIUS,
  CENTER_I_W,
  CENTER_O_W,
  FULL_CIRCLE,
  OUTER_BORDER_W,
} from '@components/lottery/constants';
import {
  AnimatedSvg,
  AnimatedPath,
  AnimatedPressable,
} from '@components/AnimatedComponents';
import Slice from '@components/lottery/Slice';
import {HEIGHT_SCR, isIOS, WIDTH} from '@utils/device';
import {ListRefProps} from '@components/lottery/types';
import StatusBarManager from '@components/StatusBarManager';
import ChooseOption from '@components/lottery/ChooseOption';

export const WHEEL_OPTIONS = [
  10, 90, 150, 40, 80, 60, 30, 100, 70, 20, 200, 50,
];

const LotteryScreen = () => {
  const listRef = useRef<ListRefProps>(null);
  const randD = useSharedValue(0);
  const progress = useSharedValue(0);
  const progressBingo = useSharedValue(0);
  const pulse = useSharedValue(0);
  const spinning = useSharedValue(false);
  const insets = useSafeAreaInsets();
  const [selectedO, setSelectedO] = useState(2);

  const options = WHEEL_OPTIONS;
  const total = options?.length || 0;
  const marginTop = insets.top > 0 ? insets.top + 16 : 32;

  const rotate = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value}deg`}],
  }));

  const pulseScale = useAnimatedStyle(() => ({
    transform: [{scale: interpolate(pulse.value, [0, 0.5, 1], [1, 1.15, 1])}],
  }));

  const animPropsInnerCircle = useAnimatedProps(() => ({
    transform: [
      {scale: interpolate(pulse.value, [0, 0.5, 1], [1, 1.1, 1])},
      {translateX: interpolate(pulse.value, [0, 0.5, 1], [0, -3, 0])},
      {translateY: interpolate(pulse.value, [0, 0.5, 1], [0, -3, 0])},
    ],
  }));

  const animPropsOuterCircle = useAnimatedProps(() => ({
    transform: [
      {scale: interpolate(pulse.value, [0, 0.5, 1], [1, 1.1, 1])},
      {translateX: interpolate(pulse.value, [0, 0.5, 1], [0, -4, 0])},
      {translateY: interpolate(pulse.value, [0, 0.5, 1], [0, -4, 0])},
    ],
  }));

  const animBingo = useAnimatedStyle(() => ({
    zIndex: progressBingo.value > 0 ? 100000000000000 : 0,
    opacity: interpolate(progressBingo.value, [0, 0.1], [0, 1]),
    transform: [
      {
        scale: interpolate(
          progressBingo.value,
          [0, 0.25, 0.35, 0.6, 0.7, 1],
          [1, 1.25, 1, 1.25, 1, 1.4],
        ),
      },
    ],
  }));

  const spinIt = () => {
    if (spinning.value) {
      return;
    }

    spinning.value = true;
    cancelAnimation(pulse);
    pulse.value = withTiming(0, {duration: 150}, finished => {
      if (finished) {
        randD.value = 360 * Math.random();

        progress.value = withTiming(
          progress.value + 720 + randD.value,
          {
            duration: 5000,
            easing: Easing.bezier(0.15, 0.85, 0.5, 1),
          },
          finished => {
            if (finished) {
              runOnJS(pulseIt)();
              runOnJS(calculateWinner)();
            }
          },
        );
      }
    });
  };

  const pulseIt = () => {
    pulse.value = withRepeat(
      withTiming(1, {duration: 1000, easing: Easing.linear}),
      -1,
      true,
    );
  };

  const calculateIndex = (angle: number) => {
    const adjustedAngle = (angle + 90) % 360;
    return Math.floor(adjustedAngle / 30) % WHEEL_OPTIONS.length;
  };

  const calculateWinner = () => {
    const quotient = Math.floor(progress.value / FULL_CIRCLE);
    const largestMultiple = quotient * FULL_CIRCLE;
    const remainder = progress.value - largestMultiple;

    const winner = calculateIndex(remainder);
    if (winner === selectedO) {
      spinning.value = false;
      animateBingo();
    } else {
      spinning.value = false;
    }
  };

  const animateBingo = () => {
    progressBingo.value = withTiming(1, {duration: 3000}, finished => {
      if (finished) {
        progressBingo.value = withDelay(1000, withTiming(0, {duration: 1}));
      }
    });
  };

  const selectOption = (index: number) => {
    setSelectedO(index);
  };

  useEffect(() => {
    pulseIt();
  }, []);

  return (
    <>
      <StatusBarManager barStyle="light" />
      <Image
        style={styles.background}
        source={require('../assets/img/lottery-bg.png')}
      />

      <Animated.Image
        style={[styles.bingo, animBingo]}
        source={require('../assets/img/bingo.png')}
      />

      <View style={styles.container}>
        <ChooseOption
          ref={listRef}
          style={{marginTop}}
          selectedO={selectedO}
          spinning={spinning}
          selectOption={selectOption}
        />

        <AnimatedSvg
          width={SVG_W + 16}
          height={SVG_H + 16}
          viewBox={`-${OUTER_BORDER_W / 2 + 8} -${OUTER_BORDER_W / 2 + 8} ${
            RADIUS * 2 + OUTER_BORDER_W + 16
          } ${RADIUS * 2 + OUTER_BORDER_W + 16}`}
          style={[rotate, styles.svgContainer]}>
          {/* Gradient for odd slices */}
          <Defs>
            <LinearGradient id="sliceGradint" x1="0%" y1="0%" x2="50%" y2="50%">
              <Stop offset="0%" stopColor="#c5acff" />
              <Stop offset="100%" stopColor="#a37cff" />
            </LinearGradient>
            <LinearGradient id="centerCircle" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#fecb70" />
              <Stop offset="100%" stopColor="#f38a36" />
            </LinearGradient>
          </Defs>

          {/* Outer border */}
          <Path
            fill="none"
            stroke="url(#centerCircle)"
            strokeWidth={OUTER_BORDER_W}
            d={`M ${RADIUS},${0} 
              A ${RADIUS},${RADIUS} 0 1,1 ${RADIUS},${RADIUS * 2}
              A ${RADIUS},${RADIUS} 0 1,1 ${RADIUS},${0}`}
          />

          {options?.map((item: number, index: number) => (
            <Slice
              key={`slice-${index}`}
              item={item}
              index={index}
              total={total}
              spinning={spinning}
              selectOption={index => {
                selectOption(index);
                listRef.current?.animateList(index);
              }}
              isSelected={selectedO === index}
            />
          ))}

          {/* Center Outer circle */}
          <AnimatedPath
            d={`M ${CENTER_O_W},${0} 
                  A ${CENTER_O_W},${CENTER_O_W} 0 1,1 ${CENTER_O_W},${
              CENTER_O_W * 2
            }
                  A ${CENTER_O_W},${CENTER_O_W} 0 1,1 ${CENTER_O_W},${0}
                `}
            fill="url(#centerCircle)"
            stroke="white"
            strokeWidth={2}
            onPress={spinIt}
            x={-8 + (SVG_W - 2 * CENTER_O_W) / 2}
            y={-8 + (SVG_W - 2 * CENTER_O_W) / 2}
            animatedProps={animPropsOuterCircle}
          />

          {/* Center Inner circle */}
          <AnimatedPath
            d={`
                  M ${CENTER_I_W},${0} 
                  A ${CENTER_I_W},${CENTER_I_W} 0 1,1 ${CENTER_I_W},${
              CENTER_I_W * 2
            }
                  A ${CENTER_I_W},${CENTER_I_W} 0 1,1 ${CENTER_I_W},${0}
                `}
            fill="url(#centerCircle)"
            stroke="white"
            strokeWidth={3}
            onPress={spinIt}
            x={-8 + (SVG_W - 2 * CENTER_I_W) / 2}
            y={-18 + (SVG_W - 2 * CENTER_I_W + 20) / 2}
            animatedProps={animPropsInnerCircle}
          />
        </AnimatedSvg>

        {/* Pointer Container */}
        <Svg width={38} height={48} style={styles.pointerContainer}>
          <Defs>
            <LinearGradient id="centerCircle" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#fecb70" />
              <Stop offset="100%" stopColor="#f38a36" />
            </LinearGradient>
          </Defs>
          {/* Shape of pointer */}
          <Polygon
            stroke={'white'}
            strokeWidth={4}
            translateY={5}
            points="19,38 35,-3 3,-3"
            fill={'url(#centerCircle)'}
          />
        </Svg>

        {/* Spinner Icon */}
        <AnimatedPressable
          onPress={spinIt}
          style={[pulseScale, styles.btnContainer]}>
          <Fontisto name="spinner-refresh" size={26} color={'white'} />
        </AnimatedPressable>
      </View>
    </>
  );
};

export default LotteryScreen;

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  svgContainer: {
    position: 'absolute',
    bottom: -(RADIUS / 2),
    alignSelf: 'center',
  },
  pointerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: RADIUS + 120,
  },
  btnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: RADIUS / 2 + (isIOS ? 4 : 3),
    zIndex: 100000000,
  },
  bingo: {
    ...StyleSheet.absoluteFillObject,
    width: WIDTH / 1.5,
    height: WIDTH / 1.5,
    left: (WIDTH - WIDTH / 1.5) / 2,
    top: (HEIGHT_SCR - WIDTH / 1.5) / 2,
  },
});
