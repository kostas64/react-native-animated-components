import { ImageSourcePropType } from "react-native";

export const HOME_LIST = [
  {
    name: "Slide to Confirm",
    description: "Slide to confirm animation",
    screen: "SlideToConfirm",
    image: require("@assets/screenshots/33.png"),
  },
  {
    name: "Airbnb",
    description: "Main Search component\nWhere to - When - Who",
    screen: "Airbnb",
    image: require("@assets/screenshots/1.png"),
  },
  {
    name: "iOS Shutdown",
    description: "iOS progresive shutdown animation\nAnimated text color",
    screen: "ShutdownIOS",
    image: require("@assets/screenshots/2.png"),
  },
  {
    name: "iOS NFC Reader",
    description: "iOS NFC payment reader\nShadow like effect",
    screen: "NFCReader",
    image: require("@assets/screenshots/3.png"),
    isDark: true,
  },
  {
    name: "iOS Search Move",
    description: "iOS search bar animation",
    screen: "TranslateSearchIOS",
    image: require("@assets/screenshots/4.png"),
  },
  {
    name: "Circular Animated Text",
    description: "Animated text in circular shape",
    screen: "CircularAnimatedText",
    image: require("@assets/screenshots/5.png"),
  },
  {
    name: "Parallax List",
    description: "Parallax effect\nBlurred background",
    screen: "Parallax",
    image: require("@assets/screenshots/6.png"),
    isDark: true,
  },
  {
    name: "Double List",
    description: "Double scrolling effect\nScroll one list reveals the other",
    screen: "DoubleList",
    image: require("@assets/screenshots/7.png"),
  },
  {
    name: "Gallery List",
    description: "Animated gallery with elements interpolation",
    screen: "GalleryList",
    image: require("@assets/screenshots/8.png"),
  },
  {
    name: "Fade Item List",
    description: "Fade in/out effect on scroll",
    screen: "FadeItem",
    image: require("@assets/screenshots/9.png"),
  },
  {
    name: "Product List",
    description: "Animated product list with custom gestures",
    screen: "ProductList",
    image: require("@assets/screenshots/11.png"),
  },
  {
    name: "Enriched Chat",
    description: "Fully responsive chat\nEmoji reactions",
    screen: "Chat",
    image: require("@assets/screenshots/10.png"),
  },
  {
    name: "Screen Transitions",
    description: "Screen transitions on an education template",
    screen: "ScreenTransition",
    image: require("@assets/screenshots/12.png"),
  },
  {
    name: "Task Calendar",
    description: "Strip calendar\nAnimated task list",
    screen: "TaskCalendar",
    image: require("@assets/screenshots/13.png"),
  },
  {
    name: "Bank Template",
    description: "Template for banking app\nShadows & Animated gradient effect",
    screen: "BankStack",
    image: require("@assets/screenshots/14.png"),
  },
  {
    name: "Line & Pie Chart",
    description: "Fully customizable charts\nGestures support",
    screen: "LinePieCharts",
    image: require("@assets/screenshots/15.png"),
  },
  {
    name: "Group & Stack Chart",
    description: "Charts with tooltips",
    screen: "GroupStackCharts",
    image: require("@assets/screenshots/16.png"),
  },
  {
    name: "Roulette",
    description: "Spinning wheel\nReward animation",
    screen: "Lottery",
    image: require("@assets/screenshots/17.png"),
  },
  {
    name: "Navbar with Indicator",
    description: "Navbar with adaptive indicator",
    screen: "ListWithIndicator",
    image: require("@assets/screenshots/18.png"),
  },
  {
    name: "Drawer - Corner Transition",
    description: "High end drawer\nView manipulation",
    screen: "CustomDrawer",
    image: require("@assets/screenshots/19.png"),
    isDark: true,
  },
  {
    name: "Drawer - Window Transition",
    description: "Side by side drawer",
    screen: "DrawerInterpolate",
    image: require("@assets/screenshots/20.png"),
  },
  {
    name: "Progress Bar",
    description: "Classic animated progre",
    screen: "Progress",
    image: require("@assets/screenshots/21.png"),
  },
  {
    name: "Dancing Dots",
    description: "Dots moving while loading",
    screen: "DotLoader",
    image: require("@assets/screenshots/22.png"),
  },
  {
    name: "Floating to Modal",
    description: "Circle to modal shape transition",
    screen: "Floating",
    image: require("@assets/screenshots/23.png"),
  },
  {
    name: "Floating to Actions",
    description: "Menu presenation with floating action",
    screen: "FloatingActions",
    image: require("@assets/screenshots/24.png"),
  },
  {
    name: "Floating to Side Actions",
    description: "Side menu with floating action",
    screen: "AddButtonMove",
    image: require("@assets/screenshots/25.png"),
  },
  {
    name: "Pin Code",
    description: "Animated Pin like validaiton",
    screen: "PinCode",
    image: require("@assets/screenshots/26.png"),
    isDark: true,
  },
  {
    name: "Switches",
    description: "3 different ways to present a toggler",
    screen: "Togglers",
    image: require("@assets/screenshots/27.png"),
  },
  {
    name: "Sliders",
    description: "3 different ways to present a slider",
    screen: "ValuePickers",
    image: require("@assets/screenshots/28.png"),
  },
  {
    name: "Custom Scroll Bar",
    description: "A better scroll indicator with fade in/out effect",
    screen: "VerticalScrollBar",
    image: require("@assets/screenshots/29.png"),
    isDark: true,
  },
  {
    name: "Gesture Counter",
    description: "Bounce effect & Gesture down to reset counter",
    screen: "GestureCounter",
    image: require("@assets/screenshots/30.png"),
    isDark: true,
  },
  {
    name: "Like Interaction",
    description: "Moving avatarson like / dislike action",
    screen: "LikeInteraction",
    image: require("@assets/screenshots/31.png"),
  },
  {
    name: "Entering Text",
    description: "Animated Text Word by Word",
    screen: "AnimatedWordText",
    image: require("@assets/screenshots/32.png"),
  },
];

export type HomeListItem = {
  id: number;
  name: string;
  description: string;
  image: ImageSourcePropType;
  isDark?: undefined;
};
