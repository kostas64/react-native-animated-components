import {SharedValue} from 'react-native-reanimated';

export type TAnimatedText = {
  index: number;
  char: string;
  totalCharsLength: number;
  coloring: SharedValue<number>;
  sliderWidth: SharedValue<number>;
  maxFontSizeMultiplier?: number;
};
