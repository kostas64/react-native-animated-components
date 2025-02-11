import {
  Easing,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import Skeleton from '@components/addButtonMove/Skeleton';
import AddButton from '@components/addButtonMove/AddButton';
import ActionItem from '@components/addButtonMove/ActionItem';
import {AnimatedScrollView} from '@components/AnimatedComponents';
import {calculateSkeletonHeight} from '@components/addButtonMove/utils';
import {ACTION_ITEMS, CIRCLE_SIZE} from '@components/addButtonMove/data';

const AddButtonMoveScreen = () => {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);

  const paddingTop = insets.top > 0 ? insets.top + 20 : 24;
  const paddingBottom = insets.bottom > 0 ? insets.bottom + 4 : 24;

  const skeletonHeight = calculateSkeletonHeight(
    paddingTop,
    paddingBottom,
    16 * 4,
  );

  //Uncomment to translateY the container and show bottom options
  const animateContainer = useAnimatedStyle(() => ({
    // borderRadius: interpolate(progress.value, [0, 1], [0, 38]),
    transform: [
      {translateX: interpolate(progress.value, [0, 1], [0, -92])},
      // {translateY: interpolate(progress.value, [0, 1], [0, -108])},
    ],
  }));

  const animateAddButton = useAnimatedStyle(() => ({
    transform: [
      {rotate: `${interpolate(progress.value, [0, 1], [45, 180])}deg`},
    ],
  }));

  const onPressAdd = () => {
    if (progress.value === 0) {
      progress.value = withSpring(1);
    } else {
      progress.value = withTiming(0, {easing: Easing.inOut(Easing.quad)});
    }
  };

  const pan = Gesture.Pan()
    //Avoid native swipe back overlapping
    .activeOffsetX([0, 50])
    .onChange(e => {
      if (e.translationX > 0 && e.translationX <= 92 && progress.value === 1) {
        progress.value = withSpring(1 - e.translationX / 92);
      } else if (e.translationX < 0 && e.translationX >= -92) {
        progress.value = withSpring(-e.translationX / 92);
      }
    })
    .onEnd(e => {
      if (e.translationX > 0 && e.translationX <= 16 && progress.value > 0) {
        progress.value = withSpring(1);
      } else if (e.translationX > 16) {
        progress.value = withSpring(0, {damping: 80, stiffness: 200});
      } else if (e.translationX < -16) {
        progress.value = withSpring(1);
      } else if (e.translationX < 0 && e.translationX >= -16) {
        progress.value = withSpring(0, {damping: 80, stiffness: 200});
      }
    });

  return (
    <>
      <GestureDetector gesture={pan}>
        <View style={styles.container}>
          <AnimatedScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.scrollViewContainer, animateContainer]}
            contentContainerStyle={[styles.space, {paddingBottom, paddingTop}]}>
            <Skeleton skeletonHeight={skeletonHeight} />
            <Skeleton skeletonHeight={skeletonHeight} />
            <Skeleton skeletonHeight={skeletonHeight} />
            <Skeleton skeletonHeight={skeletonHeight} />
            <Skeleton skeletonHeight={skeletonHeight} />
            <Skeleton skeletonHeight={skeletonHeight} />
            <Skeleton skeletonHeight={skeletonHeight} />
            <Skeleton skeletonHeight={skeletonHeight} />
          </AnimatedScrollView>
        </View>
      </GestureDetector>

      {ACTION_ITEMS.reverse().map((item, key) => {
        const animateActionItem = useAnimatedStyle(() => ({
          opacity: interpolate(
            progress.value,
            [0.25, 1],
            [0, 1],
            Extrapolation.CLAMP,
          ),
          transform: [
            {translateX: interpolate(progress.value, [0, 1], [90, 0])},
          ],
        }));

        return (
          <ActionItem
            source={item.source}
            key={`action-item-${key}`}
            containerStyle={[
              styles.abs,
              animateActionItem,
              {bottom: paddingBottom + (key + 1) * (CIRCLE_SIZE + 16)},
            ]}
          />
        );
      })}
      <AddButton
        onPress={onPressAdd}
        style={[styles.addButton, {bottom: paddingBottom}, animateAddButton]}
      />
    </>
  );
};

export default AddButtonMoveScreen;

const styles = StyleSheet.create({
  flexGrow: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#2f1248',
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#5e3383',
  },
  space: {
    gap: 16,
  },
  addButton: {
    right: 20,
    position: 'absolute',
  },
  abs: {
    position: 'absolute',
    right: 20,
  },
});
