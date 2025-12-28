import { SharedValue } from "react-native-reanimated";
import { Animated, ImageSourcePropType } from "react-native";

export type SplashProps = {
  splashProgress: SharedValue<number>;
};

export type HomeListItemType = {
  name: string;
  description: string;
  image: ImageSourcePropType;
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
