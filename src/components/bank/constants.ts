import {WIDTH} from '@utils/device';

export const BUTTON_HEIGHT = 60;

export const CARD_WIDTH = WIDTH - 75;
export const CARD_HEIGHT = (CARD_WIDTH * 3) / 5;

export const CARD_BODY_HEIGHT = (CARD_HEIGHT * 4) / 6;
export const CARD_FOOTER_HEIGHT = (CARD_HEIGHT * 2) / 6;

export const cards = [
  {
    cardNumber: '4716 0429 2165 7440',
    cardholderName: 'Judie Martin',
    expirationDate: '01/27',
    stopColors: ['#0b0609', '#190852', '#2c2371'],
  },
  {
    cardNumber: '5457 5768 3328 2375',
    cardholderName: 'Bradley Stewart',
    expirationDate: '08/26',
    stopColors: ['#88d568', '#2f757b', '#2d5190'],
  },
  {
    cardNumber: '2511 9324 9472 8942',
    cardholderName: ' Charles Broadwater',
    expirationDate: '11/29',
    stopColors: ['#fa3839', '#fb227b', '#d801d3'],
  },
];
