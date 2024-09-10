import Animated, {
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {TLikeCounter} from './types';
import {typography} from '@utils/typography';

const AnimIcon = Animated.createAnimatedComponent(AntDesign);

const LikeCounter = ({counter, liked, onPress}: TLikeCounter) => {
  const animate = useSharedValue(0);
  const first = React.useRef(0);

  const style = useAnimatedStyle(() => ({
    transform: [{scale: interpolate(animate.value, [0, 80, 144], [1, 1.5, 1])}],
    color: interpolateColor(animate.value, [0, 144], ['#a1a1a1', '#f85230']),
  }));

  React.useEffect(() => {
    const toValue = !!liked ? 144 : 0;

    if (first.current === 0 && !liked) {
      first.current = 1;
    } else if (first.current === 0 && liked) {
      animate.value = withTiming(toValue, {duration: 1});
      first.current = 1;
    } else {
      animate.value = withSpring(toValue, {damping: 12});
    }
  }, [liked]);

  return (
    <View onTouchStart={onPress} style={styles.counterContainer}>
      <AnimIcon name="heart" size={20} color={'#a1a1a1'} style={style} />
      <Text style={styles.counter}>{counter}</Text>
    </View>
  );
};

export default LikeCounter;

const styles = StyleSheet.create({
  counterContainer: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#e9e9e9',
  },
  counter: {
    marginLeft: 10,
    color: '#666666',
    fontFamily: typography.regular,
  },
});
