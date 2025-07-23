import mitt from 'mitt';
import {FlatList} from 'react-native';
import React, {memo, useCallback, useRef} from 'react';
import {CalendarDayMetadata} from '@marceloterreiro/flash-calendar';

import {WIDTH} from '@utils/device';
import {getDayIndexOfWeek} from '@utils/dates';
import WeekDayListItem from './WeekDayListItem';
import {useCalendarDays} from './hooks/useCalendarDays';
import WeekEmptyDayListItem from './WeekEmptyDayListItem';
import {TCalendar, TEmptyDay, TCalendarListItem} from './types';
import {ANIMATION_DUR, calendarFirstDayOfWeek} from './constants';

export const setDayEmitter = mitt<{
  daySelected: CalendarDayMetadata;
}>();

const Calendar = memo(({month, selectedDate}: TCalendar) => {
  const listRef = React.useRef<FlatList<TEmptyDay | CalendarDayMetadata>>(null);
  const globalSelectedDate = useRef(new Date());

  const days = useCalendarDays(month, calendarFirstDayOfWeek);

  const renderItem = useCallback(({item: day, index}: TCalendarListItem) => {
    const onLayout = index === days.length - 1 ? scrollToDay : undefined;

    if ('isEmpty' in day) {
      return <WeekEmptyDayListItem key={index} onLayout={onLayout} />;
    } else {
      return (
        <WeekDayListItem
          day={day}
          key={index}
          onLayout={onLayout}
          selectedDate={selectedDate}
          globalSelectedDate={globalSelectedDate}
        />
      );
    }
  }, []);

  const scrollToDay = () => {
    setTimeout(() => {
      listRef.current?.scrollToOffset({
        offset: getDayIndexOfWeek(globalSelectedDate.current) * WIDTH,
        animated: true,
      });
    }, ANIMATION_DUR);
  };

  return (
    <FlatList
      data={days}
      ref={listRef}
      horizontal
      pagingEnabled
      initialNumToRender={7}
      maxToRenderPerBatch={7}
      renderItem={renderItem}
      removeClippedSubviews
      showsHorizontalScrollIndicator={false}
      updateCellsBatchingPeriod={ANIMATION_DUR / 3}
    />
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
