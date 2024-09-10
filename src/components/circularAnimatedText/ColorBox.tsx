import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {TColorBox} from './types';

const ColorBox = ({item, isLast, activeColor, onColorTouch}: TColorBox) => {
  const borderColor = useAnimatedStyle(() => ({
    borderWidth: activeColor.value === item ? 3 : 1,
  }));

  return (
    <Animated.View
      onTouchStart={() => onColorTouch(item)}
      style={[
        styles.colorItem,
        borderColor,
        {backgroundColor: item, marginRight: isLast ? 48 : 24},
      ]}
    />
  );
};

export default ColorBox;

const styles = StyleSheet.create({
  colorItem: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
  },
});
