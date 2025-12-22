import { ViewStyle } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { SharedValue } from "react-native-reanimated";

import { FeatherName } from "src/types/common";

export type TFloatingActionButtonProps = {
  progress: SharedValue<number>;
  onPress: () => void;
};

export type TFloatingActionModalProps = {
  progress: SharedValue<number>;
  style: ViewStyle;
};

export type TFloatingModalDimensions = {
  width: number;
  height: number;
};

export type TFloatingModalItemProps = {
  style?: ViewStyle | ViewStyle[];
  item: {
    name: FeatherName;
    label: string;
    component: typeof Feather;
  };
  progress: SharedValue<number>;
};
