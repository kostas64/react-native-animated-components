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
      | 'PinCode';
  }[];
}[];

export const DATA: TDATA = [
  {
    iconName: 'ios-list-circle',
    iconComp: 'Ionicons',
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
        backgroundColor: '#eaa884',
        screen: 'ListWithIndi',
      },
      {
        label: 'Custom Drawer',
        backgroundColor: '#c57f5d',
        screen: 'CustomDrawer',
      },
      {
        label: 'Drawer Interpolate',
        backgroundColor: '#f298bc',
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
        backgroundColor: '#7bc8d2',
        screen: 'Progress',
      },
      {
        label: 'Dot Loader',
        backgroundColor: '#a3b8f1',
        screen: 'DotLoader',
      },
    ],
  },
  {
    iconName: 'toggle-on',
    iconComp: 'FontAwesome',
    iconColor: '#3f546a',
    iconSize: 32,
    iconText: 'Toggler',
    items: [
      {
        label: 'Togglers',
        backgroundColor: '#ad77df',
        screen: 'Togglers',
      },
    ],
  },
  {
    iconName: 'code',
    iconComp: 'FontAwesome',
    iconColor: '#3f546a',
    iconSize: 32,
    iconText: 'Validator',
    items: [
      {
        label: 'Pin Code',
        backgroundColor: '#eeba0b',
        screen: 'PinCode',
      },
    ],
  },
];
