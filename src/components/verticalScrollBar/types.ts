import {AnimatedStyle, SharedValue} from 'react-native-reanimated';

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
