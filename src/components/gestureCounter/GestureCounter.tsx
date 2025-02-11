import Animated, {
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';
import {useCallback, useState} from 'react';

import Symbol from './Symbol';
import Bubble from './Bubble';
import {Colors} from '@utils/colors';
import {lightShadow} from './styles';
import {triggerHaptik} from '@components/taskCalendar/MonthListModal';

const GestureCounter = () => {
  const [counter, setCounter] = useState(0);

  const progress = useSharedValue(0);
  const progressDelete = useSharedValue(0);

  const onPress = useCallback((plus = false) => {
    setCounter(old => {
      if (!plus && old === 0) {
        return old;
      }

      triggerHaptik();
      return plus ? old + 1 : old - 1;
    });
  }, []);

  const onDelete = useCallback(() => {
    setCounter(old => {
      if (old !== 0) {
        triggerHaptik();
        return 0;
      }

      return old;
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: interpolate(progress.value, [-1, 1], [-12, 12])},
      {translateY: interpolate(progressDelete.value, [0, 1], [0, 16])},
    ],
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      progressDelete.value,
      [0, 0.5],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const opacityDelete = useAnimatedStyle(() => ({
    opacity: interpolate(
      progressDelete.value,
      [0, 0.01],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, lightShadow]}>
      <Symbol onPress={onPress} progress={progress} style={opacity} />
      <View style={styles.zIndex}>
        <Bubble
          value={counter}
          onPress={onPress}
          onPanDown={onDelete}
          progress={progress}
          progressDelete={progressDelete}
        />
        <Symbol plus style={opacityDelete} containerStyle={styles.delete} />
      </View>
      <Symbol plus onPress={onPress} progress={progress} style={opacity} />
    </Animated.View>
  );
};

export default GestureCounter;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.CHARLESTON_GREEN,
    borderRadius: 100,
  },
  delete: {
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
    transform: [{rotate: '45deg'}],
  },
  zIndex: {
    zIndex: 2,
  },
});
