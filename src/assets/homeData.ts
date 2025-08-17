import {ColorValue} from 'react-native';

type TDATA = {
  iconName?: string;
  iconComp: string;
  iconColor?: ColorValue;
  iconSize?: number;
  iconText: string;
  padding?: number;
  borderRadius?: number;
  backgroundColor?: ColorValue;
  items: {
    label: string;
    backgroundColor: string;
    screen:
      | 'Parallax'
      | 'DoubleList'
      | 'GalleryList'
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
      | 'LinePieCharts'
      | 'GroupStackCharts'
      | 'ProductList'
      | 'TaskCalendar'
      | 'ScreenTransition'
      | 'Lottery'
      | 'VerticalScrollBar'
      | 'GestureCounter'
      | 'FloatingActions'
      | 'AddButtonMove'
      | 'BankStack';
  }[];
}[];

export const DATA: TDATA = [
  {
    iconName: 'animation',
    iconComp: 'MaterialCommunityIcons',
    iconColor: 'white',
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 18,
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
        label: 'Circular Animated Text',
        backgroundColor: '#ff8c00',
        screen: 'CircularAnimatedText',
      },
    ],
  },
  {
    iconName: 'clipboard-list',
    iconComp: 'MaterialCommunityIcons',
    iconColor: 'white',
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 18,
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
        label: 'Gallery List',
        backgroundColor: '#9500ff',
        screen: 'GalleryList',
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
        backgroundColor: '#fdc921',
        screen: 'ProductList',
      },
    ],
  },
  {
    iconName: 'layers',
    iconComp: 'Entypo',
    iconColor: 'white',
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 18,
    iconText: 'Templates',
    items: [
      {
        label: 'Screen Transition',
        backgroundColor: '#0ad2ff',
        screen: 'ScreenTransition',
      },
      {
        label: 'Task Calendar',
        backgroundColor: '#2962ff',
        screen: 'TaskCalendar',
      },
      {
        label: 'Bank',
        backgroundColor: '#9500ff',
        screen: 'BankStack',
      },
    ],
  },
  {
    iconName: 'areachart',
    iconComp: 'AntDesign',
    iconText: 'Charts',
    iconColor: 'white',
    padding: 7,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 16,
    items: [
      {
        label: 'Line & Pie Chart',
        backgroundColor: '#0ad2ff',
        screen: 'LinePieCharts',
      },
      {
        label: 'Group & Stack Chart',
        backgroundColor: '#2962ff',
        screen: 'GroupStackCharts',
      },
    ],
  },
  {
    iconName: 'games',
    iconComp: 'MaterialIcons',
    iconText: 'Have fun',
    iconColor: 'white',
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 18,
    items: [
      {
        label: 'Lottery',
        backgroundColor: '#0ad2ff',
        screen: 'Lottery',
      },
    ],
  },
  {
    iconName: 'menu',
    iconComp: 'Entypo',
    iconText: 'Navbar',
    iconColor: 'white',
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 18,
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
    iconName: 'loader',
    iconComp: 'Feather',
    iconText: 'Loader',
    iconColor: 'white',
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 18,
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
    iconName: 'resize-full-screen',
    iconComp: 'Entypo',
    iconText: 'Floating',
    iconColor: 'white',
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 18,
    items: [
      {
        label: 'Floating Button',
        backgroundColor: '#0ad2ff',
        screen: 'Floating',
      },
      {
        label: 'Button to Actions',
        backgroundColor: '#2962ff',
        screen: 'FloatingActions',
      },
      {
        label: 'Plus Button Move Screen',
        backgroundColor: '#9500ff',
        screen: 'AddButtonMove',
      },
    ],
  },
  {
    iconName: 'code-brackets',
    iconComp: 'MaterialCommunityIcons',
    iconColor: 'white',
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#819cb8',
    iconSize: 18,
    iconText: 'Micro interactions',
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
        label: 'Value Pickers',
        backgroundColor: '#9500ff',
        screen: 'ValuePickers',
      },
      {
        label: 'Vertical Scroll Bar',
        backgroundColor: '#ff0059',
        screen: 'VerticalScrollBar',
      },
      {
        label: 'Gesture Counter',
        backgroundColor: '#ff8c00',
        screen: 'GestureCounter',
      },
      {
        label: 'Like Interaction',
        backgroundColor: '#fdc921',
        screen: 'LikeInteraction',
      },
      // {
      //   label: 'Ticket',
      //   backgroundColor: '#c57f5d', '#95e214'
      //   screen: 'Ticket',
      // },
    ],
  },
];
