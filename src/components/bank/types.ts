import {ColorValue, StyleProp, ViewStyle} from 'react-native';

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
