import {Animated} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export type SplashProps = {
  splashProgress: SharedValue<number>;
};

export type HomeListItemType = {
  id: number;
  name: string;
  description: string;
  image: any;
  screen: string;
  isDark?: boolean;
};

export type HomeListItemsProps = {
  item: HomeListItemType;
  index: number;
  scrollX: Animated.Value;
};

export type HomeBackgroundRef = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};
