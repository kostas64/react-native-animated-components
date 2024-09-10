import {
  TextStyle,
  ViewStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';

import {Dispatch, SetStateAction} from 'react';
import {MarkedDates} from 'react-native-calendars/src/types';
import {AnimatedStyle, SharedValue} from 'react-native-reanimated';

export type TSearchItem = {
  place: string;
  date: string;
  guests: number;
};

export type TPickerItem = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export type TCounterBtn = {
  isPlus?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export type TItemCounter = {
  label: string;
  subLabel: string;
  subLabelStyle?: (TextStyle | ImageStyle)[];
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
  extraOnPress?: (val: number) => void;
  disabledLeft?: boolean;
};

export type TStartDate = {
  dateString?: string;
  timestamp?: string;
};

export type TRenderCountryItem = {
  item: {img: ImageSourcePropType; label: string};
  index: number;
};

export type TRenderSearchItem = {
  item: {place: string; guests: number; date: string};
  index: number;
};

export type TFooter = {
  onPressClear: () => void;
  animateClose: () => void;
};

export type TWhoComing = {
  pets: number;
  adults: number;
  inflants: number;
  childs: number;
  setPets: Dispatch<SetStateAction<number>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setChilds: Dispatch<SetStateAction<number>>;
  setInflants: Dispatch<SetStateAction<number>>;
};

export type TDayObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export type TWhereTo = {
  country: string;
  setCountry: Dispatch<SetStateAction<string>>;
  animateWhen: () => void;
  animateWhereToInput: () => void;
  opacityWhereToBold: AnimatedStyle;
  opacityOpenWhoStyle: AnimatedStyle;
  innerInputWhereToFocused: AnimatedStyle;
  listSearchStyle: AnimatedStyle;
  listOpacityTranslate: AnimatedStyle;
};

export type TWhenTrip = {
  setDay: (obj: TDayObject) => void;
  period: string;
  periodo: MarkedDates;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
  translatePicker: SharedValue<number>;
  translatePickerStyle: {
    transform: {
      translateX: number;
    }[];
  };
  onPressNext: () => void;
  onPressSkipReset: () => void;
};

export type TCountryItem = {
  index: number;
  isSelected: boolean;
  item: {label: string; img: any};
  animateWhen: () => void;
  setCountry: Dispatch<SetStateAction<string>>;
};
