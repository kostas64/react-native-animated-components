// Function to compare times in 12-hour format (AM/PM)
const convertToMinutes = (time: string) => {
  const [timePart, meridian] = time.split(/(am|pm)/);
  let [hours, minutes] = timePart.split(':').map(Number);

  // Adjust for 12-hour format
  if (meridian === 'pm' && hours !== 12) hours += 12;
  if (meridian === 'am' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

// Function to find the matching schedule event for each time slot
export const findScheduleForTimes = (
  times: string[],
  scheduleEvents: {hour: string; title: string; backgroundColor: string}[],
) => {
  return times.map(time => {
    const timeInMinutes = convertToMinutes(time);

    // Find an event that either starts at the current time
    const matchedEvent = scheduleEvents.find(event => {
      const [start, end] = event.hour.split('-').map(convertToMinutes);
      // Check if the current time matches the start time
      return timeInMinutes === start;
    });

    return {
      time: matchedEvent ? matchedEvent.hour : '-',
      event: matchedEvent ? matchedEvent.title : 'No event',
      backgroundColor: matchedEvent
        ? matchedEvent.backgroundColor
        : 'transparent',
    };
  });
};
