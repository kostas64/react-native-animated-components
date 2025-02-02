import React from 'react';
import {Rect, Svg} from 'react-native-svg';
import {Pressable, StyleSheet, Text} from 'react-native';

import {WIDTH} from '@utils/device';
import {ButtonProps} from './types';
import {BUTTON_HEIGHT} from './data';
import {typography} from '@utils/typography';
import FilterGradient from './FilterGradient';

const Button = ({label, style}: ButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed && {opacity: 0.5},
        style,
      ]}>
      <Svg
        height={BUTTON_HEIGHT}
        width={WIDTH - 40}
        style={styles.svgContainer}>
        <FilterGradient />
        <Rect
          x={0}
          y={0}
          width={WIDTH - 40}
          height={BUTTON_HEIGHT}
          fill={'url(#gradient)'}
        />
      </Svg>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    height: BUTTON_HEIGHT,
    width: WIDTH - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'white',
    position: 'absolute',
  },
  label: {
    fontSize: 18,
    color: 'white',
    fontFamily: typography.semiBold,
  },
});
