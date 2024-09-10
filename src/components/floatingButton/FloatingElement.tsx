import Animated, {
  runOnJS,
  withDelay,
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedKeyboard,
  useAnimatedReaction,
} from 'react-native-reanimated';
import React, {useRef} from 'react';
import {Keyboard, Pressable, StyleSheet} from 'react-native';

import {WIDTH} from '@utils/device';
import {image, SPACING} from './data';
import {TFloatingElement} from './types';

const AnimPress = Animated.createAnimatedComponent(Pressable);

const FloatingElement = ({
  content,
  snapHeight,
  snapWidth,
  containerStyle = {},
  backdropColor,
  iconTintColor,
  backdropOpacity,
  fadeInDuration,
  fadeOutDuration,
  showClose = true,
  hitSlopWithFabOpen,
  hitSlopWithFabClosed,
}: TFloatingElement) => {
  const [showBack, setShowBack] = React.useState(true);

  let dismissKeybTimeout = useRef<ReturnType<typeof setInterval> | null>(null);

  //Animated values
  const isOpen = useSharedValue(0);
  const keyboard = useAnimatedKeyboard({isStatusBarTranslucentAndroid: true});
  const contentOpacity = useSharedValue(0);
  const heightFloating = useSharedValue(60);
  const widthFloating = useSharedValue(60);
  const backOpacity = useSharedValue(0);
  const imageRotate = useSharedValue(1);
  const translateCircle = useSharedValue(
    (WIDTH - 30 - (WIDTH - (WIDTH - 4 * SPACING)) / 2) / 2,
  );

  //Checks
  const hasCloseButton = showClose || (!showClose && !showBack);
  const hasCustomOpenHitslop = !!hitSlopWithFabOpen && isOpen.value === 1;
  const hasCustomClosedHitslop = !!hitSlopWithFabClosed && !isOpen.value;

  const buttonHitslop = hasCustomOpenHitslop
    ? hitSlopWithFabOpen
    : hasCustomClosedHitslop
    ? hitSlopWithFabClosed
    : !showBack
    ? {top: 16, left: 16, right: 16, bottom: 16}
    : {top: 8, left: 8, right: 8, bottom: 8};

  // Update state to show/hide background
  // Triggered when background opacity change
  useAnimatedReaction(
    () => {
      return backOpacity.value > 0;
    },
    shouldHide => {
      'worklet';
      if (!shouldHide) {
        runOnJS(setShowBack)(false);
      } else {
        runOnJS(setShowBack)(true);
      }
    },
  );

  const closeAnimation = React.useCallback(() => {
    const contDur = fadeOutDuration || 10;
    const finalWidth = snapWidth || WIDTH - 4 * SPACING;

    contentOpacity.value = withTiming(0, {duration: contDur});
    backOpacity.value = withTiming(0);
    widthFloating.value = withTiming(60);
    heightFloating.value = withTiming(60);
    imageRotate.value = withTiming(1);
    translateCircle.value = withTiming(
      (WIDTH - 30 - (WIDTH - finalWidth) / 2) / 2,
      {},
      finished => {
        if (finished) {
          isOpen.value = 0;
        }
      },
    );

    if (keyboard.height.value > 0) {
      dismissKeybTimeout.current = setTimeout(() => {
        Keyboard.dismiss();
      }, 100);
    }
  }, []);

  const openAnimation = React.useCallback(() => {
    const contDur = fadeInDuration || 150;
    const backDropOpacity = backdropOpacity || 0.5;
    const finalWidth = snapWidth || WIDTH - 4 * SPACING;

    if (isOpen.value === 0) {
      contentOpacity.value = withDelay(150, withTiming(1, {duration: contDur}));
      backOpacity.value = withTiming(backDropOpacity);
      widthFloating.value = withTiming(finalWidth);
      heightFloating.value = withTiming(snapHeight);
      imageRotate.value = withTiming(0);
      translateCircle.value = withTiming(
        (WIDTH - finalWidth) / 2,
        {},
        finished => {
          if (finished) {
            isOpen.value = 1;
          }
        },
      );
    }
  }, []);

  const translateStyle = useAnimatedStyle(() => {
    return {
      left: translateCircle.value,
      width: widthFloating.value,
      height: heightFloating.value,
      transform: [
        {
          translateY: withSpring(-keyboard.height.value, {
            damping: 15,
          }),
        },
      ],
    };
  });

  const backStyle = useAnimatedStyle(() => ({
    opacity: backOpacity.value,
  }));

  const contentAnimStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const closeStyle = useAnimatedStyle(() => ({
    transform: [
      {rotate: `${interpolate(imageRotate.value, [0, 1], [0, 45])}deg`},
    ],
  }));

  //Clean timer set in case keyboard opened
  React.useEffect(() => {
    return () => {
      !!dismissKeybTimeout.current && clearTimeout(dismissKeybTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Background */}
      {showBack && (
        <AnimPress
          onPress={closeAnimation}
          style={[
            backStyle,
            styles.background,
            !!backdropColor && {backgroundColor: backdropColor},
          ]}
        />
      )}
      {/* Container */}
      <AnimPress
        onPress={openAnimation}
        style={[translateStyle, containerStyle]}>
        {/* Content */}
        <Animated.View style={contentAnimStyle}>{content}</Animated.View>

        {/* Close / Cross Button */}
        {hasCloseButton && (
          <Pressable
            style={styles.imageContainer}
            hitSlop={buttonHitslop}
            onPress={showBack ? closeAnimation : openAnimation}>
            <Animated.Image
              source={image}
              style={[closeStyle, styles.image, {tintColor: iconTintColor}]}
            />
          </Pressable>
        )}
      </AnimPress>
    </>
  );
};

export default FloatingElement;

const styles = StyleSheet.create({
  background: {
    width: '150%',
    height: '150%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgb(0,0,0)',
  },
  imageContainer: {
    top: 17,
    right: 18,
    position: 'absolute',
  },
  image: {
    height: 24,
    width: 24,
  },
});
