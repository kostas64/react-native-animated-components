import {AnimatedStyle} from 'react-native-reanimated';
import {ImageSourcePropType, ViewStyle} from 'react-native';

export type AddButtonProps = {
  style?: AnimatedStyle | AnimatedStyle[];
  onPress: () => void;
};

export type ActionItemProps = {
  source: ImageSourcePropType;
  containerStyle?: AnimatedStyle | AnimatedStyle[] | ViewStyle | ViewStyle[];
};
