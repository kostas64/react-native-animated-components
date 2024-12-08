import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {isIOS} from '@utils/device';

export const EVENTS = [
  {
    eventTitle: 'Comedy show',
    eventDate: '26 Apr, 6:30pm',
    source: require('@assets/img/screenTransition/comedy.jpg'),
    backgroundColor: '#fbf4fd',
  },
  {
    eventTitle: 'Dance evening',
    eventDate: '2 May, 5:40pm',
    source: require('@assets/img/screenTransition/dance.png'),
    backgroundColor: '#effdfc',
  },
  {
    eventTitle: 'Basketball game',
    eventDate: '14 May, 9:40pm',
    source: require('@assets/img/screenTransition/basket.png'),
    backgroundColor: '#fefaef',
  },
  {
    eventTitle: 'Dance evening',
    eventDate: '22 June, 9:15pm',
    source: require('@assets/img/screenTransition/dance.png'),
    backgroundColor: '#effdfc',
  },
  {
    eventTitle: 'Basketball game',
    eventDate: '1 Aug, 8:30pm',
    source: require('@assets/img/screenTransition/basket.png'),
    backgroundColor: '#fbf4fd',
  },
  {
    eventTitle: 'Dance evening',
    eventDate: '19 Sep, 9:00pm',
    source: require('@assets/img/screenTransition/dance.png'),
    backgroundColor: '#effdfc',
  },
];

export const NOTIFICATION_EVENTS_TODAY = [
  {
    eventTitle: 'Basic mathematic',
    description: 'You got A+ today',
    backgroundColor: '#f0f5fe',
    iconName: 'calculator',
    component: FontAwesome5,
  },
  {
    eventTitle: 'English grammar',
    description: 'You have unfinished homework',
    backgroundColor: '#edfbfa',
    iconName: 'book',
    component: FontAwesome5,
  },
  {
    eventTitle: 'World history',
    description: 'Congrats! You got A+ today',
    backgroundColor: '#faf3fe',
    iconName: 'earth',
    component: Ionicons,
  },
];

export const NOTIFICATION_EVENTS_YESTERDAY = [
  {
    eventTitle: 'Science',
    description: 'You got D+ yesterday',
    backgroundColor: '#fef8e8',
    iconName: 'science',
    component: MaterialIcons,
  },
  {
    eventTitle: 'World history',
    description: 'You have unfinished homework',
    backgroundColor: '#faf3fe',
    iconName: 'earth',
    component: Ionicons,
  },
  {
    eventTitle: 'Basic mathematic',
    description: 'You got A+ yesterday',
    backgroundColor: '#f0f5fe',
    iconName: 'calculator',
    component: FontAwesome5,
  },
  {
    eventTitle: 'English grammar',
    description: 'You have unfinished homework',
    backgroundColor: '#edfbfa',
    iconName: 'book',
    component: FontAwesome5,
  },
];

export const ICONS = [
  {
    active: require('@assets/img/screenTransition/home.png'),
    inactive: require('@assets/img/screenTransition/home.png'),
  },
  {
    active: require('@assets/img/screenTransition/calendar.png'),
    inactive: require('@assets/img/screenTransition/calendar.png'),
  },
  {
    active: require('@assets/img/screenTransition/note.png'),
    inactive: require('@assets/img/screenTransition/note.png'),
  },
  {
    active: require('@assets/img/screenTransition/chat.png'),
    inactive: require('@assets/img/screenTransition/chat.png'),
  },
];

export const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const TIMES = [
  '8:00am',
  '9:00am',
  '10:00am',
  '11:00am',
  '12:00pm',
  '1:00pm',
  '2:00pm',
];

export const SCHEDULE_EVENTS = [
  {
    title: 'Basic mathematics',
    hour: '8:00am-8:45am',
    backgroundColor: '#f0f5fe',
  },
  {
    title: 'English grammar',
    hour: '10:00am-11:00am',
    backgroundColor: '#edfbfa',
  },
  {
    title: 'Science',
    hour: '12:00pm-12:45pm',
    backgroundColor: '#fef8e7',
  },
  {
    title: 'Science',
    hour: '1:00pm-1:50pm',
    backgroundColor: '#f9f3fe',
  },
  {
    title: 'Basic mathematics',
    hour: '2:00pm-2:30pm',
    backgroundColor: '#f0f5fe',
  },
];

export const shadow = {
  shadowColor: 'black',
  shadowOpacity: 0.1,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  borderWidth: isIOS ? 0 : 1,
  borderColor: '#e7e7e7',
};
