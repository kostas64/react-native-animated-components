import {ViewStyle} from 'react-native';
import {AnimatedStyle, SharedValue} from 'react-native-reanimated';

export type TDataItem = {
  quarter: number;
  payroll: number;
  operations: number;
  electricity: number;
  travel: number;
};

export type TStackSlice = {
  item: TDataItem;
  animate: SharedValue<number>;
  style: ViewStyle[] | AnimatedStyle[];
  index: number;
  width: number;
  resetTooltip: () => void;
  setTooltip: React.Dispatch<React.SetStateAction<TTooltip>>;
};

export type TStackSliceItem = {
  item: TDataItem;
  index: number;
  animate: SharedValue<number>;
  isSelected: boolean | null;
  resetTooltip: () => void;
  setTooltip: React.Dispatch<React.SetStateAction<TTooltip>>;
};

export type TStackChartGrid = {
  valueLabels: string[];
  animate: SharedValue<number>;
};

export interface TTooltip extends TDataItem {
  x: null | number;
  y: null | number;
}

export type TStackLegend = {
  animate: SharedValue<number>;
  selectedIndex: number | null;
};

export type TStackChartTooltip = {
  tooltip: TTooltip;
  selectedIndex: number | null;
};
