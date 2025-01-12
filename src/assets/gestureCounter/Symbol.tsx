import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {TSymbolProps} from './types';

const Symbol = ({
  plus = false,
  progress,
  containerStyle,
  style,
  onPress,
}: TSymbolProps) => {
  const opacity = useAnimatedStyle(() => {
    const input = plus ? [0, -1] : [0, 1];
    const output = [1, 0.2];

    return {
      opacity: interpolate(progress?.value || 0, input, output),
    };
  });

  return (
    <Pressable
      onPress={() => onPress?.(plus)}
      style={({pressed}) => [
        styles.container,
        pressed && styles.activeBackground,
        containerStyle,
      ]}>
      <Animated.View style={[styles.dash, !!style ? style : opacity]} />
      {plus && (
        <Animated.View
          style={[styles.verticalDash, !!style ? style : opacity]}
        />
      )}
    </Pressable>
  );
};

export default Symbol;

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    zIndex: 1,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBackground: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dash: {
    height: 1,
    width: 22,
    position: 'absolute',
    backgroundColor: '#7a7a7a',
  },
  verticalDash: {
    height: 22,
    width: 1,
    backgroundColor: '#7a7a7a',
  },
});
