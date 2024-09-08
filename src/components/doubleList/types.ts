import {ViewStyle} from 'react-native';
import {Dispatch, SetStateAction} from 'react';

export type TConnectButtonProps = {
  onPress: () => void;
};

export interface IIconProps {
  icon: string;
  color: string;
}

export interface IItemProps extends IIconProps {
  name: string;
  showText: boolean;
}

export type TListProps = {
  color: string;
  showText?: boolean;
  style: ViewStyle;
  onScroll?: (...args: any[]) => void;
  onItemIndexChanged?: Dispatch<SetStateAction<number>>;
};
