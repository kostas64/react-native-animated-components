import {ColorValue, StyleProp, ViewStyle} from 'react-native';

export type WelcomeStyleProps = {
  style?: StyleProp<ViewStyle>;
};

export type StyleProps = {
  sharedElementTag?: string;
  style?: (index: number) => StyleProp<ViewStyle>;
};

export type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export type CardProps = {
  delay: number;
  style?: StyleProp<ViewStyle>;
  cardNumber?: string;
  stopColors: ColorValue[];
  cardholderName?: string;
  expirationDate?: string;
};

export type SectionHeaderProps = {
  label: string;
  rightLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export type CardDetailProps = {
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  style?: StyleProp<ViewStyle>;
};

export type CardDetailRowProps = {
  label: string;
  value: string;
  pressedStyle?: StyleProp<ViewStyle>;
};

export type BarProps = {
  maxValue: number;
  isSelected: boolean;
  index: number;
  value: number;
  month: string;
  onSelect: (index: number) => void;
};

export type BarItemProps = {
  month: string;
  earnings: number;
  spendings: number;
};

export type TabsProps = {
  selected: string;
  onSelectType: (value: string) => void;
};
