export const getDayIndexOfWeek = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const dayOfMonth = date.getDate();
  const adjustedDay = firstWeekday + (dayOfMonth - 1);

  return Math.floor(adjustedDay / 7);
};
