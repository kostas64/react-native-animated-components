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
      | 'ShutdownIOS';
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
        backgroundColor: '#a3b8f1',
        screen: 'Parallax',
      },
      {
        label: 'Double List',
        backgroundColor: '#ad77df',
        screen: 'DoubleList',
      },
      {
        label: '3D Carousel',
        backgroundColor: '#eaa884',
        screen: 'Carousel3D',
      },
      {
        label: 'Fade Item Out',
        backgroundColor: '#c57f5d',
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
        backgroundColor: '#ad77df',
        screen: 'Progress',
      },
      {
        label: 'Dot Loader',
        backgroundColor: '#eaa884',
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
        backgroundColor: '#c57f5d',
        screen: 'PinCode',
      },
      {
        label: 'Togglers',
        backgroundColor: '#f298bc',
        screen: 'Togglers',
      },
      {
        label: 'Floating Button',
        backgroundColor: '#7bc8d2',
        screen: 'Floating',
      },
    ],
  },
];
