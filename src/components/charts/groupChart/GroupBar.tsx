import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import {TGroupBar} from './types';

const GroupBar = ({width, color, style}: TGroupBar) => {
  return (
    <Animated.View
      style={[
        {
          width: width / 2,
          backgroundColor: color,
          borderTopRightRadius: width / 8,
          borderTopLeftRadius: width / 8,
        },
        style,
      ]}
    />
  );
};

export default GroupBar;

const styles = StyleSheet.create({});
