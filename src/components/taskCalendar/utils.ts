export const generateEventsForDays = (numDays: number) => {
  const today = new Date().getDate();

  const events = [];
  const titles = [
    'One-to-one',
    'Team Meeting',
    'Project Review',
    'Client Call',
    'Workshop',
  ];
  const descriptions = [
    'Repeats every two weeks',
    'Weekly meeting',
    'Monthly review',
    'Bi-weekly sync',
    'Daily standup',
  ];
  const times = [
    '9:00-10:00 AM',
    '11:00-12:00 PM',
    '12:00-1:00 PM',
    '2:00-3:00 PM',
    '4:00-5:00 PM',
  ];

  const durations = ['30 min', '45 min', '1 h', '1.5 h', '2 h'];

  for (let day = 1; day <= numDays; day++) {
    const random = Math.random();

    const numEvents = Math.floor(random * 5);

    for (let i = 0; i < numEvents; i++) {
      const event = {
        time: times[i],
        title: titles[Math.floor(Math.random() * titles.length)],
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
        duration: durations[Math.floor(Math.random() * durations.length)],
      };

      events.push({
        day: day,
        ...event,
      });
    }

    if (today === day && numEvents === 0) {
      events.push({
        day: day,
        time: times[1],
        title: titles[0],
        description: descriptions[0],
        duration: durations[3],
      });
    }
  }

  return events;
};
