import Animated, {
  Easing,
  withDelay,
  withSpring,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {MESSAGE} from './data';
import {typography} from '@utils/typography';
import {HEIGHT_SCR, isIOS} from '@utils/device';
import AnimatedTyping from '@components/AnimatedTyping';

const AnimatedIcon = Animated.createAnimatedComponent(Entypo);

const ANIM_CONFIG = {
  damping: 80,
  stiffness: 200,
};

const ARROW_INPUT = [0, 0.5, 0.55, 0.6, 1];
const ARROW_BIG_OUT = [0, 0.4, 0.4, 1, 0.4];
const ARROW_MED_OUT = [0, 0.4, 1, 0.4, 0.4];
const ARROW_SM_OUT = [0, 1, 0.4, 0.4, 0.4];

const Introduction = () => {
  const insets = useSafeAreaInsets();
  const translateProgress = useSharedValue(0);

  const paddingTop = insets.top > 0 ? insets.top + 32 : 48;
  const bottom = insets.bottom > 0 ? insets.bottom + 16 : 24;

  const fontSize =
    24 +
    (HEIGHT_SCR > 750 ? (HEIGHT_SCR - 100) / 100 : (HEIGHT_SCR - 500) / 100);

  const progress = useSharedValue(0);

  const animate = () => {
    progress.value = 0.5;
    progress.value = withRepeat(
      withDelay(150, withTiming(1, {duration: 850, easing: Easing.linear})),
      -1,
    );
  };

  const bigArrow = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      ARROW_INPUT,
      ARROW_BIG_OUT,
      Extrapolation.CLAMP,
    ),
  }));

  const medArrow = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      ARROW_INPUT,
      ARROW_MED_OUT,
      Extrapolation.CLAMP,
    ),
  }));

  const smallArrow = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      ARROW_INPUT,
      ARROW_SM_OUT,
      Extrapolation.CLAMP,
    ),
  }));

  const moveContainer = useAnimatedStyle(() => ({
    transform: [{translateY: translateProgress.value}],
  }));

  const panGesture = Gesture.Pan()
    .onChange(e => {
      translateProgress.value = e.translationY;
    })
    .onEnd(e => {
      if (e.absoluteY > HEIGHT_SCR - HEIGHT_SCR / 3) {
        translateProgress.value = withSpring(0, ANIM_CONFIG);
      } else {
        translateProgress.value = withSpring(-HEIGHT_SCR, ANIM_CONFIG);
      }
    });

  const tapGesture = Gesture.Tap().onStart(e => {
    translateProgress.value = withSpring(-HEIGHT_SCR, ANIM_CONFIG);
  });

  const composedGestures = Gesture.Simultaneous(tapGesture, panGesture);

  return (
    <Animated.View style={[styles.container, moveContainer]}>
      <Image
        resizeMode="cover"
        style={styles.fullAbsolute}
        source={require('@assets/img/background.jpg')}
      />

      <View style={[styles.fullAbsolute, styles.filter]} />

      <AnimatedTyping
        text={[MESSAGE]}
        characterDuration={isIOS ? 35 : 50}
        onComplete={animate}
        textStyle={[
          styles.message,
          {fontSize, paddingTop, lineHeight: fontSize + 6},
        ]}
      />

      <GestureDetector gesture={composedGestures}>
        <View style={[styles.iconContainer, {height: 60 + bottom}]}>
          <AnimatedIcon
            size={32}
            color={'white'}
            name="chevron-thin-up"
            style={[styles.absoluteCenter, bigArrow]}
          />
          <AnimatedIcon
            size={32}
            color={'white'}
            name="chevron-thin-up"
            style={[styles.absoluteCenter, styles.top20, medArrow]}
          />
          <AnimatedIcon
            size={32}
            color={'white'}
            name="chevron-thin-up"
            style={[styles.absoluteCenter, styles.top40, smallArrow]}
          />
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  filter: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  absoluteCenter: {
    position: 'absolute',
    alignSelf: 'center',
  },
  fullAbsolute: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
  },
  message: {
    color: 'white',
    width: 320,
    alignSelf: 'center',
    fontFamily: typography.medium,
  },
  top20: {
    top: 16,
  },
  top40: {
    top: 32,
  },
});
