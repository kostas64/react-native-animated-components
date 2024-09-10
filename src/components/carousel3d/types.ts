import {Animated} from 'react-native';

export type ICarouselDataType = {
  key: string;
  image: string;
  title: string;
  subtitle: string;
  price: string;
};

export type ICarousel3DProps = {
  item: ICarouselDataType;
  index: number;
  scrollX: Animated.AnimatedValue;
};

export type BackgroundProps = {
  progress: Animated.AnimatedModulo<string | number>;
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
