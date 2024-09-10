import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ProductListItemProps} from './types';
import {typography} from '@utils/typography';
import {HEIGHT_SCR, WIDTH} from '@utils/device';

const ProductListItem = ({
  item,
  animateIndex,
  localIndex,
}: ProductListItemProps) => {
  const insets = useSafeAreaInsets();

  const opacity = animateIndex.interpolate({
    inputRange: [localIndex - 1, localIndex, localIndex + 1],
    outputRange: [0, 1, 0],
  });

  return (
    <>
      <View style={[styles.nameImgContainer, {paddingTop: insets.top + 48}]}>
        <Text style={[styles.name, {color: item.fontColor}]}>{item.name}</Text>
        <Animated.Image
          resizeMode={'contain'}
          source={item.image}
          style={[styles.img, {opacity, top: insets.top}]}
        />
      </View>
      <View style={[styles.labelContainer, {top: insets.top + 76}]}>
        <Text style={[styles.label, {color: item.fontColor}]}>BEATS</Text>
      </View>
    </>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  nameImgContainer: {
    width: WIDTH,
    height: HEIGHT_SCR,
    paddingLeft: 24,
  },
  name: {
    fontSize: 24,
    fontFamily: typography.bold,
  },
  img: {
    position: 'absolute',
    left: 86,
    height: HEIGHT_SCR * 0.5,
  },
  labelContainer: {
    position: 'absolute',
    left: 24,
  },
  label: {
    fontSize: 64,
    fontWeight: '900',
  },
});
