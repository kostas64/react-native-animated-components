import {ColorValue} from 'react-native';

export type TProps = {
  data: number[];
  width: number;
  height: number;
  noGrid?: boolean;
  strokeColor?: ColorValue;
  strokeBackground?: ColorValue;
  shouldCancelWhenOutsideGesture?: boolean;
};

export type ChartRef = {
  animate: (forward?: boolean) => void;
};
