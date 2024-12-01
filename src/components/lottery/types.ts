import {StyleProp, ViewStyle} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export type TListItem = {
  item: number;
  index: number;
};

export type TSlice = {
  total: number;
  progress: SharedValue<number>;
  isSelected: boolean;
  selectOption: (index: number) => void;
};

export type TChooseOption = {
  style?: StyleProp<ViewStyle>;
  selectedO: number;
  progress: SharedValue<number>;
  selectOption: (index: number) => void;
};

export type ListRefProps = {
  animateList: (index: number) => void;
};
