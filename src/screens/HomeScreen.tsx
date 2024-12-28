//Native Libs
import {
  withTiming,
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {AnimatedScrollView} from 'react-native-reanimated/lib/typescript/component/ScrollView';

//My Libs
import Splash from '@components/home/Splash';
import HomeBody from '@components/home/HomeBody';
import HomeHeader from '@components/home/HomeHeader';
import StatusBarManager from '@components/StatusBarManager';

const HomeScreen = () => {
  const scrollRef = useAnimatedRef<AnimatedScrollView>();

  //Header shared values
  const progress = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const isAnimating = useSharedValue(false);
  const lastContentOffset = useSharedValue(1);

  //Splash shared values
  const splashProgress = useSharedValue(0);

  const hideSplash = async () => {
    return await BootSplash.hide({fade: true});
  };

  useEffect(() => {
    hideSplash().then(() => {
      splashProgress.value = withTiming(1);
    });
  }, []);

  return (
    <>
      <StatusBarManager barStyle="light" />

      <Splash splashProgress={splashProgress} />

      <View style={styles.container}>
        <HomeHeader progress={progress} />
        <HomeBody
          progress={progress}
          scrollRef={scrollRef}
          isScrolling={isScrolling}
          isAnimating={isAnimating}
          lastContentOffset={lastContentOffset}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f546a',
  },
});

export default HomeScreen;
