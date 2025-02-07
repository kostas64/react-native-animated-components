import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
