import {useMemo} from 'react';
import {getDaysInMonth} from 'date-fns';

import {MONTHS} from '@components/taskCalendar/constants';
import {TCalendarState} from '@components/taskCalendar/types';
import {generateEventsForDays} from '@components/taskCalendar/utils';

export const useCalendarEvents = (state: TCalendarState) => {
  const numOfDays = useMemo(
    () => getDaysInMonth(new Date(2024, MONTHS.indexOf(state.month), 1)),
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
