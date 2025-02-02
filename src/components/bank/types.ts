import {ColorValue, StyleProp, ViewStyle} from 'react-native';

export type StyleProps = {
  style?: StyleProp<ViewStyle>;
};

export type ButtonProps = {
  label: string;
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
