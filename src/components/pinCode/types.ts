import { SharedValue } from "react-native-reanimated";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

import { IoniconName } from "src/types/common";

export type PlaceholderFunction = {
  animatePlaceholder: () => void;
  animateRemove: () => void;
};

export type TNumberItem = {
  translateX: SharedValue<number>;
  value: number | IoniconName;
  input: string;
  disabled: boolean;
  setInput: Dispatch<SetStateAction<string>>;
  inputsRef: MutableRefObject<PlaceholderFunction | null>[];
  setLoading: Dispatch<SetStateAction<boolean>>;
};
