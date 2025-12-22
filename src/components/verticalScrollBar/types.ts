import { SharedValue } from "react-native-reanimated";

export type TListItem = {
  name: string;
  isFirstOfLetter: boolean;
  isLastOfLetter: boolean;
  letter: string;
};

export type ListItemProps = {
  item: TListItem;
  firstLetterH: SharedValue<number>;
  lastLetterH: SharedValue<number>;
  restLetterH: SharedValue<number>;
  formattedText: SharedValue<string>;
};

export type AnimatedStyles = {
  translateY: SharedValue<number>;
  scrollOffset: SharedValue<number>;
  indicatorOpacity: SharedValue<number>;
  progressIndicator: SharedValue<number>;
  contentH: SharedValue<number>;
  initialLayoutH: SharedValue<number>;
};
