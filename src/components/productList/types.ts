import { Animated, ImageSourcePropType } from "react-native";

export type ListItem = {
  name: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  fontColor: string;
  halfFontColor: string;
  color: string;
  type: string;
  power: string;
};

export type ProductItem = {
  item: ListItem;
  index: number;
};

export type ProductListItemProps = {
  item: ListItem;
  animateIndex: Animated.AnimatedValue;
  localIndex: number;
};
