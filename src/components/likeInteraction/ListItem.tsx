import Animated, {
  withDelay,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet} from 'react-native';

import {TListItem} from './types';

const ListItem = ({item, index, liked}: TListItem) => {
  const animate = useSharedValue(0);
  const first = useSharedValue(0);

  React.useEffect(() => {
    const toValue = !!liked ? 0 : 144;

    const duration = first.value === 0 ? 0 : 300;

    if (toValue === 0) {
      animate.value =
        first.value === 0
          ? withTiming(toValue, {duration})
          : withDelay((4 - index) * 50, withTiming(toValue, {duration}));
      first.value = 1;
    } else if (toValue === 144) {
      animate.value =
        first.value === 0
          ? withTiming(toValue, {duration})
          : withDelay(index * 50, withTiming(toValue, {duration}));
      first.value = 1;
    }
  }, [liked]);

  const style = useAnimatedStyle(() => {
    if (index === 0) {
      return {
        opacity: interpolate(animate.value, [0, 144], [0, 1]),
        transform: [
          {scale: interpolate(animate.value, [0, 144], [0, 1])},
          {
            translateX: interpolate(
              animate.value,
              [0, 144],
              [(index - 1) * -26, index * -26],
            ),
          },
        ],
      };
    }

    if (index === 4) {
      return {
        opacity: interpolate(animate.value, [0, 144], [1, 0]),
        transform: [
          {scale: interpolate(animate.value, [0, 144], [1, 0.75])},
          {
            translateX: interpolate(
              animate.value,
              [0, 144],
              [(index - 1) * -26, (index - 1) * -36],
            ),
          },
        ],
      };
    }

    return {
      opacity: 1,
      transform: [
        {
          translateX: interpolate(
            animate.value,
            [0, 144],
            [(index - 1) * -26, index * -26],
          ),
        },
      ],
    };
  });

  return (
    <Animated.Image
      borderRadius={18}
      source={{uri: item.image}}
      style={[style, styles.img]}
    />
  );
};

export default ListItem;

const styles = StyleSheet.create({
  img: {
    width: 36,
    aspectRatio: 1 / 1,
    borderWidth: 2,
    position: 'absolute',
    borderColor: 'white',
  },
});
