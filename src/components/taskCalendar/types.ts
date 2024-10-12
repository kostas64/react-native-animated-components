import {SharedValue} from 'react-native-reanimated';
import {CalendarDayMetadata} from '@marceloterreiro/flash-calendar';

import {THomeNavigationProps} from 'src/App';

export type TNavigation = {
  navigation: THomeNavigationProps;
};

export type TCalendar = {
  month: string;
  fadeFinished: SharedValue<boolean>;
  executeChild: (cb: () => void) => void;
  selectedDate: (date: Date) => void;
};

export type TCalendarState = {
  loading: boolean;
  transitionEnd: boolean;
  month: string;
  selectedDate: Date | undefined;
};

export type TCalendarListItem = {
  item: CalendarDayMetadata | TEmptyDay;
  index: number;
};

export type THeader = {
  month: string;
  selectedDate: (date: Date) => void;
  onSelecteMonth: (month: number) => void;
};

export type TWeekDayListItem = {
  day: CalendarDayMetadata;
  selectedDate: (date: Date) => void;
  globalSelectedDate: React.MutableRefObject<Date>;
};

export type TEmptyDay = {
  isEmpty: boolean;
  id: string;
};

export type TEvent = {
  time: string;
  title: String;
  description: String;
  duration: string;
};

export type TLoading = {
  loading: boolean;
  selectedDate?: Date;
  stopLoading?: () => void;
};

export type TMonthPicker = {
  month: string;
  onPress: (month: string) => void;
};

export type TMonthPickerItem = {
  item: string;
  onPress: () => void;
  isSelected: boolean;
  disabled: boolean;
};

export type TMonthListModal = {
  month: string;
  setMonth: (month: number) => void;
};

export type TMonthListItem = {
  item: string;
  index: number;
  scrollOffset?: SharedValue<number>;
};
