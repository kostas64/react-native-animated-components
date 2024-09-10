import {SharedValue} from 'react-native-reanimated';

export type TAnimCircle = {
  _?: any;
  activeColor: SharedValue<string>;
  index: number;
};

export type TColorBox = {
  item: string;
  index: number;
  isLast: boolean;
  activeColor: SharedValue<string>;
  onColorTouch: (color: string) => void;
};
