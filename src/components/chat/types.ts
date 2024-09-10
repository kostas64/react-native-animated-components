import {Dispatch, SetStateAction} from 'react';
import {ImageSourcePropType, TextInput} from 'react-native';
import {AnimatedStyle, SharedValue} from 'react-native-reanimated';

export type TMessage = {
  id: string;
  image: ImageSourcePropType;
  name: string;
  message: string;
  time: string;
  animate?: boolean;
  isOwnerOfChat?: boolean | undefined;
  emoji?: ImageSourcePropType;
};

export type TMessageItem = {
  item: TMessage;
  capture?: (id: string, top: number) => void;
  scrollY?: SharedValue<number>;
  handleKeyboard?: () => void;
  scrollToFirstItem?: () => void;
};

export type TWrapperProps = {
  children: React.ReactNode;
};

export type TBackgroundProps = {
  captureUri: string | null;
  opacity: AnimatedStyle;
  clonedItemToPass: TMessage;
  clonedItem: {id: string; top: number | null};
  onPressOut: (id?: string, emoji?: ImageSourcePropType) => void;
};

export type TEmojiItemProps = {
  item: ImageSourcePropType;
  index: number;
};

export type TSearchMessageInput = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  inputRef: React.RefObject<TextInput>;
  onPressSend: (input: string) => void;
};
