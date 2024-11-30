import {StyleProp, ViewStyle} from 'react-native';

export type TChartHeader = {
  iconName: string;
  label: string;
};

export type TChartButton = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};
