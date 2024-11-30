import Animated, {
  Easing,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useRef, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Svg, Defs, Path, Stop, Polygon, LinearGradient} from 'react-native-svg';

import {
  SVG_H,
  SVG_W,
  RADIUS,
  CENTER_I_W,
  CENTER_O_W,
  OUTER_BORDER_W,
} from '@components/lottery/constants';
import Slice from '@components/lottery/Slice';
import {ListRefProps} from '@components/lottery/types';
import StatusBarManager from '@components/StatusBarManager';
import ChooseOption from '@components/lottery/ChooseOption';

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

const WHEEL_OPTIONS = [10, 90, 150, 40, 80, 60, 30, 100, 70, 20, 200, 50];

const LotteryScreen = () => {
  const listRef = useRef<ListRefProps>(null);
  const randD = useSharedValue(0);
  const progress = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const [selectedO, setSelectedO] = useState(0);

  const options = WHEEL_OPTIONS;
  const total = options?.length || 0;
  const marginTop = insets.top > 0 ? insets.top + 16 : 32;

  const rotate = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          progress.value,
          [0, 0.2, 0.8, 0.98, 1, 2],
          [-75, 72, 684, 720, 725, 725 + randD.value],
        )}deg`,
      },
    ],
  }));

  const spinIt = () => {
    randD.value = 360 * Math.random();
    progress.value = 0;

    progress.value = withTiming(2, {
      duration: 5000,
      easing: Easing.linear,
    });
  };

  const selectOption = (index: number) => {
    setSelectedO(index);
  };

  return (
    <>
      <StatusBarManager barStyle="light" />
      <Image
        style={styles.background}
        source={require('../assets/img/lottery-bg.png')}
      />

      <View style={styles.container}>
        <ChooseOption
          ref={listRef}
          style={{marginTop}}
          selectedO={selectedO}
          progress={progress}
          selectOption={selectOption}
        />

        <AnimatedSVG
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
              selectOption={index => {
                selectOption(index);
                listRef.current?.animateList(index);
              }}
              isSelected={selectedO === index}
            />
          ))}

          {/* Center Outer circle */}
          <Path
            d={`M ${CENTER_O_W},${0} 
                  A ${CENTER_O_W},${CENTER_O_W} 0 1,1 ${CENTER_O_W},${
              CENTER_O_W * 2
            }
                  A ${CENTER_O_W},${CENTER_O_W} 0 1,1 ${CENTER_O_W},${0}
                `}
            fill="url(#centerCircle)"
            stroke="white"
            strokeWidth={2}
            x={-8 + (SVG_W - 2 * CENTER_O_W) / 2}
            y={-8 + (SVG_W - 2 * CENTER_O_W) / 2}
          />

          {/* Center Inner circle */}
          <Path
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
            x={-8 + (SVG_W - 2 * CENTER_I_W) / 2}
            y={-18 + (SVG_W - 2 * CENTER_I_W + 20) / 2}
          />
        </AnimatedSVG>

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
            points="18,38 34,-3 2,-3"
            fill={'url(#centerCircle)'}
          />
        </Svg>

        {/* Spinner Icon */}
        <Pressable style={styles.btnContainer} onPress={spinIt}>
          <Fontisto name="spinner-refresh" size={CENTER_I_W} color={'white'} />
        </Pressable>
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
    bottom: RADIUS / 2,
    zIndex: 100000000,
  },
});
