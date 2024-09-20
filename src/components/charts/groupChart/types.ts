import {LayoutChangeEvent, ViewStyle} from 'react-native';
import {AnimatedStyle, SharedValue} from 'react-native-reanimated';

export type TGroupItem = {
  income: number;
  expenses: number;
};

export type TGroupBar = {
  width: number;
  color: string;
  style?: AnimatedStyle;
};

export type TPrices = {
  income?: number;
  expenses?: number;
};

export type TMovingDot = {
  style?: AnimatedStyle[] | ViewStyle[];
};

export type TGroupBarContainer = {
  animate: SharedValue<number>;
  item: TGroupItem;
  index: number;
  groupWidth: number;
  onPress: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
  MAX_VALUE: number;
};

export type TLegendItem = {
  label: string;
  color: string;
};
