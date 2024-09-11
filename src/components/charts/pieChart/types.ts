import {SharedValue} from 'react-native-reanimated';

export type Slice = {
  index: number;
  data: {value: number; color: string}[];
  item: {color: string; value: number};
  innerRadius: number;
  outerRadius: number;
  progress: SharedValue<number>;
  progressValue: SharedValue<number>;
  selectedValue: SharedValue<number>;
};

export type TotalLabel = {
  animatedText: SharedValue<number>;
  progress: SharedValue<number>;
};

export type Legend = {
  progress: SharedValue<number>;
  selectedValue: SharedValue<number>;
};
