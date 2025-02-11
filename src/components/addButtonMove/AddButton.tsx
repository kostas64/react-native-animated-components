import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

import {shadow} from './styles';
import {CIRCLE_SIZE} from './data';
import {AddButtonProps} from './types';

const AnimatedIcon = Animated.createAnimatedComponent(Feather);

const AddButton = ({style, onPress}: AddButtonProps) => {
  return (
    <Animated.View
      onTouchStart={onPress}
      style={[styles.container, shadow, style]}>
      <AnimatedIcon name={'x'} size={22} color={'white'} />
    </Animated.View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff296b',
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden',
    zIndex: 1,
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
});
