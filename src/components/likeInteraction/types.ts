import {ImageStyle, StyleProp} from 'react-native';
import {AnimatedStyle} from 'react-native-reanimated';

export type TListItem = {
  item: {
    image: string;
  };
  index: number;
  liked: boolean;
  imageStyle?: StyleProp<AnimatedStyle<StyleProp<ImageStyle>>>;
};

export type TLikeCounter = {
  counter: number;
  liked: boolean;
  onPress: () => void;
};
