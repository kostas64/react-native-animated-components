import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {LinearGradient, Rect, Stop, Svg} from 'react-native-svg';

import {WIDTH} from '@utils/device';
import {ButtonProps} from './types';
import {BUTTON_HEIGHT} from './constants';
import {typography} from '@utils/typography';

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
        <LinearGradient id={'gradient'} x1="100%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopOpacity="0.8" stopColor={'#f7736b'} />
          <Stop offset="50%" stopOpacity="1" stopColor={'#e94173'} />
          <Stop offset="100%" stopOpacity="0.8" stopColor={'#e4489b'} />
        </LinearGradient>
        <Rect
          x={0}
          y={0}
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
