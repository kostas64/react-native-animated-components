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
      | 'TranslateSearchIOS';
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
        label: 'iOS Shutdown confirmator',
        backgroundColor: '#7bc8d2',
        screen: 'ShutdownIOS',
      },
      {
        label: 'iOS NFC Reader',
        backgroundColor: '#a3b8f1',
        screen: 'NFCReader',
      },
      {
        label: 'iOS Translating Search',
        backgroundColor: '#ad77df',
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
        backgroundColor: '#eaa884',
        screen: 'Parallax',
      },
      {
        label: 'Double List',
        backgroundColor: '#c57f5d',
        screen: 'DoubleList',
      },
      {
        label: '3D Carousel',
        backgroundColor: '#f298bc',
        screen: 'Carousel3D',
      },
      {
        label: 'Fade Item Out',
        backgroundColor: '#7bc8d2',
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
        backgroundColor: '#a3b8f1',
        screen: 'ListWithIndi',
      },
      {
        label: 'Custom Drawer',
        backgroundColor: '#ad77df',
        screen: 'CustomDrawer',
      },
      {
        label: 'Drawer Interpolate',
        backgroundColor: '#eaa884',
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
        backgroundColor: '#c57f5d',
        screen: 'Progress',
      },
      {
        label: 'Dot Loader',
        backgroundColor: '#f298bc',
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
        backgroundColor: '#7bc8d2',
        screen: 'PinCode',
      },
      {
        label: 'Togglers',
        backgroundColor: '#a3b8f1',
        screen: 'Togglers',
      },
      {
        label: 'Floating Button',
        backgroundColor: '#ad77df',
        screen: 'Floating',
      },
      {
        label: 'Ticket',
        backgroundColor: '#eaa884',
        screen: 'Ticket',
      },
    ],
  },
];
