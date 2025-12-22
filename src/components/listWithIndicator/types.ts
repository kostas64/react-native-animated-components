import {
  View,
  Animated,
  ImageSourcePropType,
  GestureResponderEvent,
} from "react-native";

export type TData = {
  image: ImageSourcePropType;
  key: string;
  ref: React.RefObject<View | null>;
  title: string;
};

export type ListItem = {
  item: { image: string };
};

export type TMeasure = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TIndicator = {
  measures: TMeasure[];
  scrollX: Animated.Value;
};

export type TTab = {
  item: TData;
  onItemPress: (event: GestureResponderEvent) => void;
};

export type TTabs = {
  data: TData[];
  scrollX: Animated.AnimatedValue;
  onItemPress: Function;
};
