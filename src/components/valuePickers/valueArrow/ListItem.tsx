import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {TListItem} from './types';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const ListItem = React.memo(({item, index, unit, scrollOffset}: TListItem) => {
  const animStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [
        index * 112 - 40,
        index * 112 - 20,
        index * 112,
        index * 112 + 20,
        index * 112 + 40,
      ],
      [0.2, 0.5, 1, 0.5, 0.2],
    ),
  }));

  return (
    <Animated.View style={[animStyle, styles.itemContainer]}>
      <Text
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
        style={styles.item}>{`${item}${unit}`}</Text>
    </Animated.View>
  );
});

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    height: 112,
    justifyContent: 'center',
  },
  item: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
