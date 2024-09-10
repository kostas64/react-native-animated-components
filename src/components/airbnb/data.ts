export const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const now = new Date();

export const MIN_DATE = `${now.getFullYear()}-${
  now.getMonth() + 1
}-${now.getDate()}`;

export const CALENDAR_PER = [
  'Exact dates',
  '± 1 day',
  '± 2 days',
  '± 3 days',
  '± 7 days',
  '± 14 days',
];

export const SEARCH_COUNTRIES = [
  {
    place: 'Jordan',
    guests: 2,
    date: '10-14 Jul',
  },
  {
    place: 'Lisbon',
    guests: 2,
    date: '14-18 Jul',
  },
  {
    place: 'Paris',
    guests: 4,
    date: '06-14 Aug',
  },
  {
    place: 'Belgium',
    guests: 3,
    date: '01-10 Sep',
  },
  {
    place: 'Los Angeles',
    guests: 3,
    date: '19-24 Sep',
  },
  {
    place: 'Chicago',
    guests: 3,
    date: '02-10 Oct',
  },
  {
    place: 'Thessaloniki',
    guests: 3,
    date: '11-20 Oct',
  },
  {
    place: 'Corfu',
    guests: 3,
    date: '21-24 Oct',
  },
  {
    place: 'Los Angeles',
    guests: 3,
    date: '20-25 Dec',
  },
  {
    place: 'Athens',
    guests: 6,
    date: '25-28 Dec',
  },
  {
    place: 'USA',
    guests: 6,
    date: '28-30 Dec',
  },
];

export const COUNTRIES = [
  {
    img: require('@assets/img/flexible.jpg'),
    label: "I'm flexible",
  },
  {
    img: require('@assets/img/portugal.jpg'),
    label: 'Portugal',
  },
  {
    img: require('@assets/img/middle_east.jpg'),
    label: 'Middle East',
  },
  {
    img: require('@assets/img/italy.jpg'),
    label: 'Italy',
  },
];
