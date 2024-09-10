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
      | 'FadeItem'
      | 'ListWithIndicator'
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
      | 'ValuePickers'
      | 'LikeInteraction'
      | 'CircularAnimatedText'
      | 'Chat'
      | 'LineChart'
      | 'ProductList';
  }[];
}[];

export const DATA: TDATA = [
  {
    iconName: 'animation',
    iconComp: 'MaterialCommunityIcons',
    iconColor: '#3f546a',
    iconSize: 32,
    iconText: 'Replicated animations',
    items: [
      {
        label: "Airbnb 'Where to'",
        backgroundColor: '#0ad2ff',
        screen: 'Airbnb',
      },
      {
        label: 'iOS Shutdown confirmator',
        backgroundColor: '#2962ff',
        screen: 'ShutdownIOS',
      },
      {
        label: 'iOS NFC Reader',
        backgroundColor: '#9500ff',
        screen: 'NFCReader',
      },
      {
        label: 'iOS Translating Search',
        backgroundColor: '#ff0059',
        screen: 'TranslateSearchIOS',
      },
      {
        label: 'Like Interaction',
        backgroundColor: '#ff8c00',
        screen: 'LikeInteraction',
      },
      {
        label: 'Circular Animated Text',
        backgroundColor: '#95e214',
        screen: 'CircularAnimatedText',
      },
    ],
  },
  {
    iconName: 'clipboard-list',
    iconComp: 'MaterialCommunityIcons',
    iconColor: '#3f546a',
    iconSize: 32,
    iconText: 'List',
    items: [
      {
        label: 'Parallax List',
        backgroundColor: '#0ad2ff',
        screen: 'Parallax',
      },
      {
        label: 'Double List',
        backgroundColor: '#2962ff',
        screen: 'DoubleList',
      },
      {
        label: '3D Carousel',
        backgroundColor: '#9500ff',
        screen: 'Carousel3D',
      },
      {
        label: 'Fade Item Out',
        backgroundColor: '#ff0059',
        screen: 'FadeItem',
      },
      {
        label: 'Chat',
        backgroundColor: '#ff8c00',
        screen: 'Chat',
      },
      {
        label: 'Product List',
        backgroundColor: '#95e214',
        screen: 'ProductList',
      },
    ],
  },
  {
    iconName: 'linechart',
    iconComp: 'AntDesign',
    iconText: 'Charts',
    iconColor: '#3f546a',
    iconSize: 26,
    items: [
      {
        label: 'Line Chart',
        backgroundColor: '#0ad2ff',
        screen: 'LineChart',
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
        backgroundColor: '#0ad2ff',
        screen: 'ListWithIndicator',
      },
      {
        label: 'Custom Drawer',
        backgroundColor: '#2962ff',
        screen: 'CustomDrawer',
      },
      {
        label: 'Drawer Interpolate',
        backgroundColor: '#9500ff',
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
        backgroundColor: '#0ad2ff',
        screen: 'Progress',
      },
      {
        label: 'Dot Loader',
        backgroundColor: '#2962ff',
        screen: 'DotLoader',
      },
    ],
  },
  {
    iconName: 'code',
    iconComp: 'FontAwesome',
    iconColor: '#3f546a',
    iconSize: 28,
    iconText: 'Common',
    items: [
      {
        label: 'Pin Code',
        backgroundColor: '#0ad2ff',
        screen: 'PinCode',
      },
      {
        label: 'Togglers',
        backgroundColor: '#2962ff',
        screen: 'Togglers',
      },
      {
        label: 'Floating Button',
        backgroundColor: '#9500ff',
        screen: 'Floating',
      },
      {
        label: 'Value Pickers',
        backgroundColor: '#ff0059',
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
