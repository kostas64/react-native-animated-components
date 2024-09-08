import {ListItem} from './types';

export const items: ListItem[] = [
  {
    name: 'Matt Black',
    image: require('@assets/img/black.png'),
    backgroundColor: '#495057',
    fontColor: 'rgba(255, 209, 81, 1)',
    halfFontColor: 'rgba(255, 209, 81, 0.75)',
    formFactor: 'Over ear',
    connection: 'Wireless',
    power: 'Power source',
  },
  {
    name: 'White',
    image: require('@assets/img/skin.png'),
    backgroundColor: '#e9ecef',
    fontColor: 'rgba(201, 173, 167, 1)',
    halfFontColor: 'rgba(201, 173, 167, 0.75)',
    formFactor: 'Headphones',
    connection: 'Cable',
    power: 'Power source',
  },
  {
    name: 'Blue',
    image: require('@assets/img/blue.png'),
    backgroundColor: '#0077b6',
    fontColor: 'rgba(255, 200, 221, 1)',
    halfFontColor: 'rgba(255, 200, 221, 0.75)',
    formFactor: 'Over ear',
    connection: 'Wireless',
    power: 'Power source',
  },
];
