import {
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Dispatch, SetStateAction } from "react";

import { MaterialIconsName } from "src/types/common";

export type TConnectButtonProps = {
  onPress: () => void;
};

export interface IIconProps {
  icon: MaterialIconsName;
  color: string;
}

export interface IItemProps extends IIconProps {
  name: string;
  showText?: boolean;
}

export type TListProps = {
  color: string;
  showText?: boolean;
  style: ViewStyle;
  onScrollBeginDrag?: () => void;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onItemIndexChanged?: Dispatch<SetStateAction<number>>;
  onMomentumScrollEnd?: (index: number) => void;
};
