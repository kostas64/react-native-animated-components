import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import {DATA} from './data';
import Content from './Content';
import {WIDTH} from '@utils/device';
import {DescriptionProps} from './types';
import {IMAGE_WIDTH, SPACING} from './constants';

const Description = ({scrollX}: DescriptionProps) => {
  return (
    <View style={styles.container}>
      {DATA.map((item, index) => {
        const inputRange = [
          (index - 0.2) * WIDTH,
          index * WIDTH,
          (index + 0.2) * WIDTH,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });

        const rotateY = scrollX.interpolate({
          inputRange,
          outputRange: ['45deg', '0deg', '45deg'],
        });

        return (
          <Animated.View
            key={item.key}
            style={[
              styles.itemContainer,
              {opacity, transform: [{perspective: IMAGE_WIDTH * 4}, {rotateY}]},
            ]}>
            <Content {...item} />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    width: IMAGE_WIDTH,
    alignItems: 'center',
    paddingHorizontal: SPACING * 2,
    marginLeft: SPACING * 2,
    zIndex: 100,
  },
  itemContainer: {
    position: 'absolute',
    backfaceVisibility: 'visible',
  },
});
