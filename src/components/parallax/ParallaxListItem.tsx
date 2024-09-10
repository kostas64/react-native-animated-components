import React from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {ParallaxListItemProps} from './types';

const ITEM_WIDTH = WIDTH * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const ParallaxListItem = ({
  item,
  index,
  scrollX,
}: ParallaxListItemProps & {
  scrollX: Animated.Value;
}) => {
  const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];
  const outputRange = [0.7 * -WIDTH, 0, 0.7 * WIDTH];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange,
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.mainImgContainer}>
          <Animated.Image
            source={{uri: item.photo}}
            style={[styles.mainImg, {transform: [{translateX}]}]}
          />
        </View>
        <Image source={{uri: item.avatar_url}} style={styles.avatar} />
      </View>
    </View>
  );
};

export default ParallaxListItem;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    elevation: 50,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 14,
  },
  mainImgContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    borderRadius: 12,
  },
  mainImg: {
    width: ITEM_WIDTH * 1.4,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
    borderWidth: 6,
    borderColor: 'white',
    position: 'absolute',
    bottom: -30,
    right: 45,
  },
});
