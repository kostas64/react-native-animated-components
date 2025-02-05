import React from 'react';
import {Rect, Svg} from 'react-native-svg';
import {Pressable, StyleSheet, Text} from 'react-native';

import {WIDTH} from '@utils/device';
import {ButtonProps} from './types';
import {BUTTON_HEIGHT} from './constants';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';

const Button = ({label, style, onPress}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        pressed && {opacity: 0.5},
        style,
      ]}>
      <Svg
        height={BUTTON_HEIGHT}
        width={WIDTH - 40}
        style={styles.svgContainer}>
        <CommonGradient id={'gradient'} />
        <Rect
          rx={30}
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
