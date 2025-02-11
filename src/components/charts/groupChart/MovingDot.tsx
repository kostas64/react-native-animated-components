import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import {COLORS} from './data';
import {TMovingDot} from './types';
import {Colors} from '@utils/colors';

const MovingDot = ({style}: TMovingDot) => {
  return <Animated.View style={[styles.dot, style]} />;
};

export default MovingDot;

const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 16,
    borderWidth: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderColor: COLORS.income,
  },
});
