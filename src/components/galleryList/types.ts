import {Animated} from 'react-native';

export type IGalleryDataType = {
  key: string;
  image: string;
  title: string;
  subtitle: string;
  price: string;
};

export type IGalleryListProps = {
  item: IGalleryDataType;
  index: number;
  scrollX: Animated.AnimatedValue;
};

export type ArrowProps = {
  index: number;
  disabledLeft: boolean;
  disabledRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
};

export type DescriptionProps = {
  scrollX: Animated.AnimatedValue;
};
