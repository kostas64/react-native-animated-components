import {SharedValue} from 'react-native-reanimated';

export type TScrollOffset = {
  isLast?: boolean;
  unit: string | undefined;
  scrollOffset: SharedValue<number>;
};

export type TListItem = {
  item: number | string;
  index: number;
};

export type TValueRangePicker = {
  range: [number, number];
  unit?: string;
  value: number;
  setValue: (value: number) => void;
};
