import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {generateStockData} from './utils';
import {TransactionItemProps} from './types';
import BankHome from '@screens/Bank/BankHome';
import BankStocks from '@screens/Bank/BankStocks';
import BankWallet from '@screens/Bank/BankWallet';
import BankSettings from '@screens/Bank/BankSettings';

export const tabs = [
  {
    name: 'BankHome',
    component: BankHome,
  },
  {
    name: 'BankStocks',
    component: BankStocks,
  },
  {
    name: 'BankWallet',
    component: BankWallet,
  },
  {
    name: 'BankSettings',
    component: BankSettings,
  },
];

export const ACTIONS = [
  {
    label: 'Add',
    iconName: 'pluscircle',
    Component: AntDesign,
    size: 22,
  },
  {
    label: 'Send',
    iconName: 'send',
    Component: FontAwesome,
    size: 16,
  },
  {
    label: 'Pay',
    iconName: 'wallet',
    Component: Entypo,
    size: 18,
  },
];

export const USERS = [
  {
    image: 'https://randomuser.me/api/portraits/men/44.jpg',
    name: 'Seth',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/50.jpg',
    name: 'Rozella',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/9.jpg',
    name: 'Demetris',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/43.jpg',
    name: 'Lelia',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Ruby',
  },
];

export const morePath =
  'M245 631 c-92 -24 -173 -90 -215 -176 -34 -69 -35 -198 -2 -265 34 -71 75 -114 144 -151 58 -31 70 -34 148 -33 72 0 93 4 136 26 75 40 107 70 145 140 31 58 34 70 34 148 0 78 -3 90 -34 148 -57 104 -144 160 -260 167 -36 2 -79 1 -96 -4z m-19 -286 c15 -23 15 -27 0 -50 -28 -42 -86 -26 -86 25 0 51 58 68 86 25z m128 9 c31 -30 9 -84 -34 -84 -23 0 -50 26 -50 47 0 23 29 53 51 53 10 0 25 -7 33 -16z m127 6 c26 -14 26 -66 0 -80 -31 -16 -49 -12 -67 15 -15 23 -15 27 0 50 18 27 36 31 67 15z';

export const personPath =
  'M245 631 c-92 -24 -173 -90 -215 -176 -33 -69 -34 -199 -2 -265 35 -71 75 -114 144 -151 58 -31 70 -34 148 -33 72 0 93 4 136 26 75 40 107 70 145 140 31 58 34 70 34 148 0 78 -3 90 -34 148 -57 104 -144 160 -260 167 -36 2 -79 1 -96 -4z m151 -125 c29 -29 34 -41 34 -79 0 -54 -26 -91 -75 -107 -75 -25 -145 27 -145 107 0 38 5 50 34 79 28 28 42 34 76 34 34 0 48 -6 76 -34z m-76 -236 c14 0 44 9 67 20 42 18 42 18 68 -2 27 -21 65 -87 65 -112 0 -40 -125 -106 -200 -106 -75 0 -200 66 -200 106 0 25 38 91 65 112 26 20 26 20 68 2 23 -11 53 -20 67 -20z';

export const copyPath =
  'M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z';

export const checkPath =
  'M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z';

export const chevronDown =
  'M223 602 c-251 -90 -272 -432 -35 -549 81 -40 183 -40 264 0 107 53 163 144 163 267 0 85 -21 142 -74 203 -72 81 -213 117 -318 79z m51 -273 l46 -51 49 54 c38 41 52 50 61 41 10 -9 9 -16 -1 -31 -26 -36 -99 -112 -109 -112 -10 0 -83 76 -108 111 -13 19 -9 39 8 39 4 0 29 -23 54 -51z';

export const chevronUp =
  'M171 346 c-107 -107 -132 -138 -129 -157 7 -51 37 -35 159 87 l119 119 119 -119 c122 -122 152 -138 159 -87 3 19 -22 50 -129 157 -74 74 -141 134 -149 134 -8 0 -75 -60 -149 -134z';

export const EARNINGS = [
  {month: 'Jan', earnings: 1850, spendings: 784},
  {month: 'Feb', earnings: 2110, spendings: 1376},
  {month: 'Mar', earnings: 1550, spendings: 145},
  {month: 'Apr', earnings: 3600, spendings: 1200},
  {month: 'May', earnings: 2860, spendings: 890},
  {month: 'Jun', earnings: 2456, spendings: 2100},
  {month: 'Jul', earnings: 4111, spendings: 5600},
  {month: 'Aug', earnings: 1400, spendings: 250},
  {month: 'Sep', earnings: 2650, spendings: 124},
  {month: 'Oct', earnings: 2670, spendings: 6368},
  {month: 'Nov', earnings: 1850, spendings: 1784},
  {month: 'Dec', earnings: 3850, spendings: 284},
];

export const SELECTED_TYPE = {
  EARNINGS: 'earnings',
  SPENDINGS: 'spendings',
};

export const CARD_TRANSACTIONS: TransactionItemProps[] = [
  {
    type: 'Income',
    label: 'Monthly Salary',
    amount: 4000.0,
    date: '01 Sep 24',
  },
  {
    type: 'Stock',
    label: 'Stock ETF',
    amount: 250.0,
    date: '24 Aug 24',
  },
  {
    type: 'Income',
    label: 'Monthly Salary',
    amount: 3600.0,
    date: '01 Aug 24',
  },
  {
    type: 'Stock',
    label: 'Stock ETF',
    amount: 4000.0,
    date: '25 Jul 24',
  },
  {
    type: 'Stock',
    label: 'Stock ETF',
    amount: 4000.0,
    date: '04 Jul 24',
  },
  {
    type: 'Income',
    label: 'Monthly Salary',
    amount: 3800.0,
    date: '01 Jul 24',
  },
];

export const STOCK_NAMES = [
  'AAPL',
  'GOOGL',
  'AMZN',
  'MSFT',
  'TSLA',
  'NFLX',
  'NVDA',
  'META',
  'IBM',
  'INTC',
  'AMD',
  'BABA',
  'ORCL',
  'ADBE',
  'PYPL',
  'CSCO',
  'PEP',
  'KO',
  'DIS',
  'V',
];

export const STOCKS_DATA = generateStockData();
