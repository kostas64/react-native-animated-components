import mitt from 'mitt';
import {FlatList} from 'react-native';
import React, {memo, useCallback, useRef} from 'react';
import {runOnJS, useDerivedValue} from 'react-native-reanimated';
import {CalendarDayMetadata} from '@marceloterreiro/flash-calendar';

import {WIDTH} from '@utils/device';
import WeekDayListItem from './WeekDayListItem';
import {today} from '@screens/TaskCalendarScreen';
import {useCalendarDays} from './hooks/useCalendarDays';
import WeekEmptyDayListItem from './WeekEmptyDayListItem';
import {TCalendar, TEmptyDay, TCalendarListItem} from './types';
import {_spacing, ANIMATION_DUR, calendarFirstDayOfWeek} from './constants';

export const setDayEmitter = mitt<{
  daySelected: CalendarDayMetadata;
}>();

const Calendar = memo(
  ({month, fadeFinished, executeChild, selectedDate}: TCalendar) => {
    const listRef =
      React.useRef<FlatList<TEmptyDay | CalendarDayMetadata>>(null);
    const globalSelectedDate = useRef(new Date());

    const days = useCalendarDays(month, calendarFirstDayOfWeek);

    const renderItem = useCallback(({item: day, index}: TCalendarListItem) => {
      if ('isEmpty' in day) {
        return <WeekEmptyDayListItem key={index} />;
      } else {
        return (
          <WeekDayListItem
            day={day}
            key={index}
            selectedDate={selectedDate}
            globalSelectedDate={globalSelectedDate}
          />
        );
      }
    }, []);

    const scrollToDay = () => {
      setTimeout(() => {
        const index = Math.floor(today.getDate() / 7);
        listRef.current?.scrollToOffset({
          offset: index * WIDTH,
          animated: true,
        });
      }, ANIMATION_DUR);
    };

    useDerivedValue(() => {
      if (fadeFinished.value) {
        runOnJS(executeChild)(scrollToDay);
      }
    }, [fadeFinished.value]);

    return (
      <FlatList
        data={days}
        ref={listRef}
        horizontal
        pagingEnabled
        initialNumToRender={7}
        maxToRenderPerBatch={7}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        updateCellsBatchingPeriod={ANIMATION_DUR / 3}
      />
    );
  },
);

export default Calendar;
