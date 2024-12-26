import {AnimatedRef, SharedValue} from 'react-native-reanimated';
import {AnimatedScrollView} from 'react-native-reanimated/lib/typescript/component/ScrollView';

export type HomeHeaderProps = {
  progress: SharedValue<number>;
};

export type HomeBodyProps = {
  progress: SharedValue<number>;
  isScrolling: SharedValue<boolean>;
  isAnimating: SharedValue<boolean>;
  lastContentOffset: SharedValue<number>;
  scrollRef: AnimatedRef<AnimatedScrollView>;
};

export type SplashProps = {
  splashProgress: SharedValue<number>;
};
