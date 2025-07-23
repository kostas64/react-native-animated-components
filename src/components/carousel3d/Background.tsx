import {Animated, StyleSheet} from 'react-native';

import {WIDTH} from '@utils/device';
import {Colors} from '@utils/colors';
import {IMAGE_WIDTH, SPACING} from './constants';

const Background = () => {
  return <Animated.View style={styles.card} />;
};

export default Background;

const styles = StyleSheet.create({
  card: {
    width: IMAGE_WIDTH + SPACING * 2,
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    zIndex: -1,
    top: SPACING * 2,
    left: (WIDTH - (IMAGE_WIDTH + SPACING * 2)) / 2,
    bottom: 0,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
