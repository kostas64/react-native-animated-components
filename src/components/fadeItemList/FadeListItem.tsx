import React from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {FadeItemProps} from './types';
import {typography} from '@utils/typography';
import {AVATAR_SIZE, ITEM_SIZE, SPACING} from './constants';

const FadeListItem = ({
  item,
  index,
  scrollY,
}: FadeItemProps & {
  scrollY: Animated.Value;
}) => {
  const inputRange = [
    -1,
    0,
    (ITEM_SIZE + 8) * index,
    (ITEM_SIZE + 8) * (index + 2),
  ];
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const opacityInputRange = [
    -1,
    0,
    (ITEM_SIZE + 8) * index,
    (ITEM_SIZE + 8) * (index + 1),
  ];
  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0],
  });

  return (
    <Animated.View
      style={[styles.parentViewItem, {opacity, transform: [{scale}]}]}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.job}>{item.jobTitle}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </Animated.View>
  );
};

export default FadeListItem;

const styles = StyleSheet.create({
  parentViewItem: {
    height: 118,
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 3,
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: SPACING / 2,
  },
  textContainer: {
    width: WIDTH - 2 * SPACING - SPACING - AVATAR_SIZE - SPACING,
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontFamily: typography.semiBold,
  },
  job: {
    fontSize: 16,
    opacity: 0.7,
    color: 'black',
    fontFamily: typography.regular,
  },
  email: {
    opacity: 0.8,
    color: '#0099cc',
    fontFamily: typography.regular,
  },
});
