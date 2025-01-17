import React from 'react';
import Animated from 'react-native-reanimated';
import {Image, StyleSheet} from 'react-native';

import {CIRCLE_SIZE} from './data';
import {ActionItemProps} from './types';

const ActionItem = ({source, containerStyle}: ActionItemProps) => {
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Image source={source} style={styles.image} />
    </Animated.View>
  );
};

export default ActionItem;

const styles = StyleSheet.create({
  container: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#6f5a85',
  },
  image: {
    width: 26,
    height: 26,
    tintColor: '#ada4b6',
  },
});
