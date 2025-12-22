import { ImageSourcePropType } from "react-native";

export type ParallaxItemProps = {
  photo: ImageSourcePropType;
};

export type ParallaxListItemProps = {
  item: ParallaxItemProps;
  index: number;
};
