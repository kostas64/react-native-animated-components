import {
  Animated,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

export type ButtonProps = {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  style: StyleProp<TextStyle>;
};

export type DrawerProps = {
  animatedValue: Animated.AnimatedValueXY;
  onPress: () => void;
};

export type TImplementedWith = {
  opacity: Animated.AnimatedInterpolation<number>;
};

export type TAnimatedIcon = {
  onOpenDrawer: () => void;
  opacity: Animated.AnimatedInterpolation<string | number>;
  translateX: Animated.AnimatedInterpolation<string | number>;
};

export type TRouteProps = {
  index: number;
  route: string;
  selectedRoute: string;
  onPress: () => void;
};

export type TLinkProps = {
  link: string;
  index: number;
  routes: string[];
  onPress: () => void;
};
