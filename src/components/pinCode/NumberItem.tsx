import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TNumberItem} from './types';
import {typography} from '@utils/typography';

const AnimPress = Animated.createAnimatedComponent(Pressable);

const NumberItem = ({
  value,
  input,
  disabled,
  setInput,
  inputsRef,
  setLoading,
  translateX,
}: TNumberItem) => {
  const progress = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#141416', '#fee3d6'],
    ),
  }));

  const onPressIn = () => {
    const indexToAnimate = input.length;

    if (typeof value === 'number') {
      setInput(old => `${old}${value}`);

      inputsRef?.[indexToAnimate]?.current?.animatePlaceholder();

      if (indexToAnimate === 3) {
        setTimeout(() => {
          setLoading(true);
          setInput('');
        }, 300);

        setTimeout(() => {
          setLoading(false);
          translateX.value = withTiming(-8, {duration: 100}, () => {
            translateX.value = withTiming(8, {duration: 50}, () => {
              translateX.value = withTiming(-4, {duration: 50}, () => {
                translateX.value = withTiming(0, {duration: 100});
              });
            });
          });

          setTimeout(() => {
            inputsRef?.[0]?.current?.animateRemove();
            inputsRef?.[1]?.current?.animateRemove();
            inputsRef?.[2]?.current?.animateRemove();
            inputsRef?.[3]?.current?.animateRemove();
          }, 300);
        }, 2000);
      }
    } else if (typeof value === 'string') {
      setInput(old => old.slice(0, -1));
      inputsRef?.[indexToAnimate - 1]?.current?.animateRemove();
    }
    progress.value = withTiming(1 - progress.value);
  };

  const onPressOut = () => {
    progress.value = withTiming(0);
  };

  const getValue = () => {
    if (typeof value === 'number') {
      return <Text style={styles.number}>{value}</Text>;
    } else {
      return <Ionicons name="backspace-outline" size={36} color={'white'} />;
    }
  };

  return (
    <AnimPress
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[animStyle, styles.numberContainer]}>
      {getValue()}
    </AnimPress>
  );
};

export default NumberItem;

const styles = StyleSheet.create({
  numberContainer: {
    margin: 8,
    width: 90,
    height: 90,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: 'white',
    fontSize: 36,
    fontFamily: typography.thin,
  },
});
