import { StyleProp, ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

export type TListItem = {
  item: number;
  index: number;
};

export type TSlice = {
  total: number;
  spinning: SharedValue<boolean>;
  isSelected: boolean;
  selectOption: (index: number) => void;
};

export type TChooseOption = {
  style?: StyleProp<ViewStyle>;
  selectedO: number;
  spinning: SharedValue<boolean>;
  selectOption: (index: number) => void;
};

export type ListRefProps = {
  animateList: (index: number) => void;
};
