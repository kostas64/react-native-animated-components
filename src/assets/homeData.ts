import {ColorValue} from 'react-native';

type TDATA = {
  iconName?: string;
  iconComp: string;
  iconColor?: ColorValue;
  iconSize?: number;
  iconText: string;
  items: {
    label: string;
    backgroundColor: string;
    screen:
      | 'Parallax'
      | 'DoubleList'
      | 'Carousel3D'
      | 'ScrollItem'
      | 'ListWithIndi'
      | 'CustomDrawer'
      | 'DrawerInterpolate'
      | 'Progress'
      | 'DotLoader'
      | 'Togglers'
      | 'PinCode'
      | 'Floating'
      | 'Airbnb'
      | 'ShutdownIOS'
      | 'NFCReader'
      | 'Ticket'
      | 'TranslateSearchIOS'
      | 'CircularProgressBar'
      | 'CreditCard'
      | 'ValuePickers';
  }[];
}[];

export const DATA: TDATA = [
  {
    iconName: 'animation',
    iconComp: 'MaterialCommunityIcons',
    iconColor: '#3f546a',
    iconSize: 40,
    iconText: 'Replicated animations',
    items: [
      {
        label: "Airbnb 'Where to'",
        backgroundColor: '#f298bc',
        screen: 'Airbnb',
      },
      {
        label: 'Credit Card',
        backgroundColor: '#7bc8d2',
        screen: 'CreditCard',
      },
      {
        label: 'iOS Shutdown confirmator',
        backgroundColor: '#a3b8f1',
        screen: 'ShutdownIOS',
      },
      {
        label: 'iOS NFC Reader',
        backgroundColor: '#ad77df',
        screen: 'NFCReader',
      },
      {
        label: 'iOS Translating Search',
        backgroundColor: '#eaa884',
        screen: 'TranslateSearchIOS',
      },
    ],
  },
  {
    iconName: 'clipboard-list',
    iconComp: 'MaterialCommunityIcons',
    iconColor: '#3f546a',
    iconSize: 40,
    iconText: 'List',
    items: [
      {
        label: 'Parallax List',
        backgroundColor: '#f298bc',
        screen: 'Parallax',
      },
      {
        label: 'Double List',
        backgroundColor: '#7bc8d2',
        screen: 'DoubleList',
      },
      {
        label: '3D Carousel',
        backgroundColor: '#a3b8f1',
        screen: 'Carousel3D',
      },
      {
        label: 'Fade Item Out',
        backgroundColor: '#ad77df',
        screen: 'ScrollItem',
      },
    ],
  },
  {
    iconName: require('../assets/img/menu-bar.png'),
    iconComp: 'image',
    iconText: 'Navbar',
    items: [
      {
        label: 'Navbar with Indicator',
        backgroundColor: '#f298bc',
        screen: 'ListWithIndi',
      },
      {
        label: 'Custom Drawer',
        backgroundColor: '#7bc8d2',
        screen: 'CustomDrawer',
      },
      {
        label: 'Drawer Interpolate',
        backgroundColor: '#a3b8f1',
        screen: 'DrawerInterpolate',
      },
    ],
  },
  {
    iconName: require('../assets/img/loader.png'),
    iconComp: 'image',
    iconText: 'Loader',
    items: [
      {
        label: 'Progress Loader',
        backgroundColor: '#f298bc',
        screen: 'Progress',
      },
      {
        label: 'Dot Loader',
        backgroundColor: '#7bc8d2',
        screen: 'DotLoader',
      },
    ],
  },
  {
    iconName: 'code',
    iconComp: 'FontAwesome',
    iconColor: '#3f546a',
    iconSize: 32,
    iconText: 'Common',
    items: [
      {
        label: 'Pin Code',
        backgroundColor: '#f298bc',
        screen: 'PinCode',
      },
      {
        label: 'Togglers',
        backgroundColor: '#7bc8d2',
        screen: 'Togglers',
      },
      {
        label: 'Floating Button',
        backgroundColor: '#a3b8f1',
        screen: 'Floating',
      },
      {
        label: 'Value Pickers',
        backgroundColor: '#ad77df',
        screen: 'ValuePickers',
      },
      // {
      //   label: 'Ticket',
      //   backgroundColor: '#c57f5d',
      //   screen: 'Ticket',
      // },
      // {
      //   label: 'Circular Progress Bar',
      //   backgroundColor: '#ad77df',
      //   screen: 'CircularProgressBar',
      // },
    ],
  },
];
