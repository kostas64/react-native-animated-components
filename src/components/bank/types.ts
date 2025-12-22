import { ReactNode } from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";

export type WelcomeStyleProps = {
  style?: StyleProp<ViewStyle>;
};

export type StyleProps = {
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
  onPress?: () => void;
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
  hidden: boolean;
  pressedStyle?: StyleProp<ViewStyle>;
  onPress: ({ field, value }: { field: string; value: string }) => void;
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

export type TransactionProps = {
  amount: number;
  label: string;
  description: string;
  date: string;
  beenAdded?: boolean;
};

export type TransactionType = "Income" | "Stock";

export type TransactionItemProps = {
  type: TransactionType;
  label: string;
  amount: number;
  date: string;
};

export type StocksItemProps = {
  name: string;
  values: number[];
};

export type TimerProps = {
  onPress: () => void;
  time: number;
  style?: StyleProp<ViewStyle>;
};

export type SettingsItemProps = {
  placeholder: string;
  value: string;
  isFirst?: boolean;
  isLast?: boolean;
  rightItem?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export type SettingsContainerProps = {
  title?: string;
  data: SettingsItemProps[];
  style?: StyleProp<ViewStyle>;
};

export type HeaderWithIconProps = {
  icon: ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
};
