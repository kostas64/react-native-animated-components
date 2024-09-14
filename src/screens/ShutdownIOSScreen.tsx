import Animated, {
  withTiming,
  withRepeat,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

import {HEIGHT_SCR, WIDTH} from '@utils/device';
import StatusBarManager from '@components/StatusBarManager';
import AnimatedText from '@components/shutdownIOS/AnimatedText';
import {SLIDER_FINAL_W, SLIDER_H, SLIDER_W} from '@components/shutdownIOS/data';

const AnimSvg = Animated.createAnimatedComponent(Svg);
const AnimRect = Animated.createAnimatedComponent(Rect);

const ShutdownIOS = () => {
  const sliderWidth = useSharedValue(SLIDER_W);
  const coloring = useSharedValue(0);
  const reachEnd = useSharedValue(false);
  const finishProgress = useSharedValue(0);

  const chars = 'slide to power off'.split('');
  const totalCharsLength = chars.length;

  // Animated background opacity for slider
  const background = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        sliderWidth.value,
        [SLIDER_W, SLIDER_FINAL_W],
        [0.75, 1],
      ),
    }),
    [],
  );

  const animProps = useAnimatedProps(() => ({
    width: sliderWidth.value,
    opacity: interpolate(sliderWidth.value, [SLIDER_W, 75], [1, 0]),

    transform: [{translateX: SLIDER_W - sliderWidth.value}],
  }));

  // Power button animation
  const powerBtn = useAnimatedStyle(() => ({
    opacity: interpolate(finishProgress.value, [0, 1], [1, 0]),
    transform: [
      {scale: interpolate(finishProgress.value, [0, 0.2, 1], [1, 1.2, 0])},
    ],
    left: interpolate(sliderWidth.value, [SLIDER_W, SLIDER_FINAL_W], [3, 195]),
  }));

  // Pan gesture for sliding the slider
  const gesture = Gesture.Pan()
    .onChange(e => {
      if (e.translationX < 0) {
        // Reset when swiping left
        sliderWidth.value = SLIDER_W;
      } else if (SLIDER_W - e.translationX > SLIDER_FINAL_W) {
        sliderWidth.value = SLIDER_W - e.translationX;

        if (reachEnd.value) {
          reachEnd.value = false;
        }
      } else if (sliderWidth.value < 90) {
        // Trigger finish animation
        reachEnd.value = true;
      }
    })
    .onFinalize(() => {
      if (reachEnd.value) {
        finishProgress.value = withTiming(1, {duration: 500}, finished => {
          if (finished) {
            // Reset slider
            sliderWidth.value = withTiming(SLIDER_W);
            reachEnd.value = false;
            finishProgress.value = withTiming(0);
          }
        });
      } else {
        // Revert slider if not finished
        sliderWidth.value = withTiming(SLIDER_W);
      }
    });

  React.useEffect(() => {
    coloring.value = withRepeat(withTiming(1, {duration: 2250}), 0);
  }, []);

  return (
    <>
      <StatusBarManager barStyle="light" />
      <ImageBackground
        source={require('@assets/img/ios_wallpaper.png')}
        style={{width: WIDTH, height: HEIGHT_SCR}}>
        <Animated.View style={[styles.filterBackground, background]} />

        <GestureDetector gesture={gesture}>
          <Animated.View style={styles.sliderContainer}>
            <View style={styles.sliderInnerContainer}>
              <AnimSvg width={SLIDER_W} height={SLIDER_H}>
                <Defs>
                  <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0%" stopColor="#bf3354" />
                    <Stop offset="50%" stopColor="#f43f46" />
                    <Stop offset="100%" stopColor="#fe5334" />
                  </LinearGradient>
                </Defs>
                <AnimRect
                  x="0"
                  y="0"
                  height={SLIDER_H}
                  rx="40"
                  fill="url(#grad)"
                  animatedProps={animProps}
                />
                <View style={styles.textContainer}>
                  {chars.map((char, index) => (
                    <AnimatedText
                      key={`index-${index}`}
                      char={char}
                      index={index}
                      coloring={coloring}
                      sliderWidth={sliderWidth}
                      totalCharsLength={totalCharsLength}
                    />
                  ))}
                </View>
              </AnimSvg>
            </View>
            <Animated.View style={[powerBtn, styles.powerBtn]}>
              <Feather name="power" size={36} color={'#da0b13'} />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </ImageBackground>
    </>
  );
};

export default ShutdownIOS;

const styles = StyleSheet.create({
  filterBackground: {
    width: WIDTH,
    height: HEIGHT_SCR,
    backgroundColor: 'black',
  },
  sliderContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: (WIDTH - SLIDER_W) / 2,
    marginTop: 150,
    height: SLIDER_H + 10,
    overflow: 'hidden',
  },
  sliderInnerContainer: {
    position: 'relative',
    overflow: 'hidden',
    top: 5,
  },
  powerBtn: {
    position: 'absolute',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 100,
    top: 9,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    top: 28,
    left: 68,
    zIndex: 100000,
  },
});
