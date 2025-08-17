import {Animated, Image, StyleSheet} from 'react-native';

import {WIDTH} from '@utils/device';
import {IGalleryListProps} from './types';
import {IMAGE_HEIGHT, IMAGE_WIDTH, SPACING} from './constants';

const GalleryListItem = ({item, index, scrollX}: IGalleryListProps) => {
  const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [50, 0, 20],
  });

  return (
    <Animated.View
      style={[styles.container, {opacity, transform: [{translateY}]}]}>
      <Image source={{uri: item.image}} style={styles.image} />
    </Animated.View>
  );
};

export default GalleryListItem;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    paddingVertical: SPACING,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
});
