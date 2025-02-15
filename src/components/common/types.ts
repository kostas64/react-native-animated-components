import {ReactNode} from 'react';
import {MenuAction} from '@react-native-menu/menu';
import {SharedValue} from 'react-native-reanimated';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type AnimatedTypingProps = {
  text: string[];
  textStyle?: StyleProp<TextStyle>;
  cursorStyle?: StyleProp<TextStyle>;
  onComplete?: () => void;
};

export type BottomSheetProps = {
  children: React.ReactNode;
  modalHeight: number;
  onBackPress?: () => void;
  panEnabled?: boolean;
  withoutLine?: boolean;
  lineStyle?: ViewStyle;
  lineStyleContainer?: ViewStyle;
  contentContainerStyle?: any;
};

export type BottomSheetRef = {
  scrollTo: (destination: number) => void;
};

export type THomeButtonProps = {
  label: string;
  onPress: (props: any) => void;
  backgroundColor: string;
};

export type ReTextProps = {
  text: SharedValue<string>;
  style?: TextStyle | TextStyle[];
};

export type StatusBarProps = {
  barStyle?: 'dark' | 'light';
};

export type ConteMenuProps = {
  children: ReactNode;
  items: MenuAction[];
  onPress: (nativeEvent: {event: string}) => void;
};
