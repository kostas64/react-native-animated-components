import {Pressable} from 'react-native';
import Animated from 'react-native-reanimated';
import {Path, Rect, Svg} from 'react-native-svg';
import {ScrollView} from 'react-native-gesture-handler';

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const AnimatedRect = Animated.createAnimatedComponent(Rect);
export const AnimatedSvg = Animated.createAnimatedComponent(Svg);
export const AnimatedPath = Animated.createAnimatedComponent(Path);
export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
