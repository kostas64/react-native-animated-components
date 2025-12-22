import {
  toDateId,
  buildCalendar,
  CalendarDayMetadata,
} from "@marceloterreiro/flash-calendar";
import { useMemo } from "react";

import { TEmptyDay } from "@components/taskCalendar/types";
import { MONTHS } from "@components/taskCalendar/constants";

export const useCalendarDays = (
  month: string,
  calendarFirstDayOfWeek: "sunday" | "monday"
) => {
  const data = useMemo(() => {
    const { weeksList } = buildCalendar({
      calendarMonthId: toDateId(
        new Date(
          2024,
          MONTHS.findIndex((item) => month === item),
          1
        )
      ),
      calendarFirstDayOfWeek,
    });

    return {
      weeksList,
    };
  }, [month, calendarFirstDayOfWeek]);

  const days = useMemo(() => {
    const filledDays: (CalendarDayMetadata | TEmptyDay)[] = data?.weeksList
      ?.reduce<CalendarDayMetadata[]>((acc, item) => acc.concat(item), [])
      .filter((day) => !day.isDifferentMonth);

    const lastWeekDaysCount = filledDays.length % 7;
    const emptyDaysCount = lastWeekDaysCount > 0 ? 7 - lastWeekDaysCount : 0;

    const emptyDays = Array.from({ length: emptyDaysCount }).map(
      (_, index) => ({
        isEmpty: true,
        id: `empty-${index}`,
      })
    );

    return filledDays.concat(emptyDays);
  }, [data]);

  return days;
};
