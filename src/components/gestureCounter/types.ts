import {StyleProp, ViewStyle} from 'react-native';
import {AnimatedStyle, SharedValue} from 'react-native-reanimated';

export type TSymbolProps = {
  plus?: boolean;
  progress?: SharedValue<number>;
  style?: AnimatedStyle;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (plus?: boolean) => void;
};

export type TBubbleProps = {
  value?: number;
  progress: SharedValue<number>;
  progressDelete: SharedValue<number>;
  onPress: (plus?: boolean) => void;
  onPanDown?: () => void;
};
