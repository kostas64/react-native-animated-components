import {SharedValue} from 'react-native-reanimated';

export type TArrow = {
  direction: 'up' | 'down';
  disabled: boolean;
  onPress: () => void;
};

export type TListItem = {
  item: number;
  index: number;
  unit: string | undefined;
  scrollOffset: SharedValue<number>;
};

export type TViewableItems = {
  viewableItems: [{item: number}];
};

export type TValueRangePicker = {
  range: [number, number];
  unit?: string;
  value: number;
  setValue: (value: number) => void;
};
