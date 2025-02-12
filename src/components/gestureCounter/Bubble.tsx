import Animated, {
  runOnJS,
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import Text from '@components/common/Text';
import {darkShadow} from './styles';
import {TBubbleProps} from './types';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {SM_FONT_UPSCALE_FACTOR} from '@utils/device';

const Bubble = ({
  value = 0,
  progress,
  progressDelete,
  onPress,
  onPanDown,
}: TBubbleProps) => {
  const direction = useSharedValue<'horizontal' | 'vertical' | null>(null);

  const pan = Gesture.Pan()
    .onChange(e => {
      if (
        ((e.translationX > 6 && e.translationX <= 62) ||
          (e.translationX < -6 && e.translationX >= -62)) &&
        direction.value !== 'vertical'
      ) {
        direction.value = 'horizontal';
        progress.value =
          (e.translationX > 0 ? e.translationX - 6 : e.translationX + 6) / 56;
      }

      if (
        e.translationY > 6 &&
        e.translationY <= 56 &&
        direction.value !== 'horizontal'
      ) {
        direction.value = 'vertical';
        progressDelete.value = (e.translationY - 6) / 45;
      }
    })
    .onEnd(e => {
      if (e.translationX < -15) {
        //minus
        runOnJS(onPress)();
      } else if (e.translationX > 15) {
        //add
        runOnJS(onPress)(true);
      }

      if (direction.value === 'vertical') {
        !!onPanDown && runOnJS(onPanDown)();
      }

      direction.value = null;
      progress.value = withSpring(0, {damping: 11, stiffness: 200});
      progressDelete.value = withSpring(0, {damping: 11, stiffness: 200});
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: interpolate(progress.value, [0, 1], [0, 56])},
      {translateY: interpolate(progressDelete.value, [0, 1], [0, 36])},
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, animatedStyle, darkShadow]}>
        <Text
          style={styles.label}
          maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
          {value}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    borderRadius: 23,
    zIndex: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_OLIVE,
  },
  label: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: typography.semiBold,
  },
});
