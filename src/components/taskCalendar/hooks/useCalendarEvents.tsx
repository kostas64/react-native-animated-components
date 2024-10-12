import {useMemo} from 'react';

import {MONTHS} from '@components/taskCalendar/constants';
import {TCalendarState} from '@components/taskCalendar/types';
import {generateEventsForDays} from '@components/taskCalendar/utils';

export const useCalendarEvents = (state: TCalendarState) => {
  const numOfDays = useMemo(
    () =>
      new Date(
        new Date().getFullYear(),
        MONTHS.indexOf(state.month) + 1,
        0,
      ).getDate(),
    [state.month],
  );

  const monthEvents = useMemo(
    () => generateEventsForDays(numOfDays),
    [state.month],
  );

  const filteredEvents = useMemo(
    () =>
      monthEvents?.filter(
        event => event.day === state?.selectedDate?.getDate(),
      ),
    [monthEvents, state?.selectedDate],
  );

  return filteredEvents;
};
