import {Animated, GestureResponderEvent} from 'react-native';

type TData = {
  image: any;
  key: string;
  ref: any;
  title: string;
};

export type ListItem = {
  item: {image: string};
};

export type TMeasure = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TIndicator = {
  measures: TMeasure[];
  scrollX: any;
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
