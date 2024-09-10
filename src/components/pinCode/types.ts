import {SharedValue} from 'react-native-reanimated';
import {Dispatch, MutableRefObject, SetStateAction} from 'react';

export type PlaceholderFunction = {
  animatePlaceholder: () => void;
  animateRemove: () => void;
};

export type TNumberItem = {
  translateX: SharedValue<number>;
  value: number | React.ReactNode;
  input: string;
  disabled: boolean;
  setInput: Dispatch<SetStateAction<string>>;
  inputsRef: MutableRefObject<PlaceholderFunction | undefined>[];
  setLoading: Dispatch<SetStateAction<boolean>>;
};
