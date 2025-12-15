//Native Libs
import {
  View,
  StatusBar,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated as RNAnimated,
} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {useIsFocused} from '@react-navigation/native';
import {useRef, useEffect, useCallback} from 'react';
import {withTiming, useSharedValue} from 'react-native-reanimated';

import {isIOS} from '@utils/device';
import {Colors} from '@utils/colors';
import {HOME_LIST} from '@assets/homeList';
import Splash from '@components/home/Splash';
import {HEIGHT, isAndroid} from '@utils/device';
import HomeListItem from '@components/home/HomeListItem';
import HomeBackground from '@components/home/HomeBackground';
import {HomeListItemType, HomeBackgroundRef} from '@components/home/types';

const ITEM_WIDTH = HEIGHT * 0.6 * 0.48;

const HomeScreen = () => {
  const isFocused = useIsFocused();

  const scrollX = useRef(new RNAnimated.Value(0)).current;
  const backgroundRef = useRef<HomeBackgroundRef>(null);

  //Splash shared values
  const splashProgress = useSharedValue(0);

  const hideSplash = async () => {
    return await BootSplash.hide({fade: true});
  };

  if (isFocused) {
    StatusBar.setBarStyle('light-content');
  }

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(x / ITEM_WIDTH);

    if (nextIndex === backgroundRef?.current?.selectedIndex) {
      return;
    }

    backgroundRef?.current?.setSelectedIndex(
      Math.max(0, Math.min(nextIndex, HOME_LIST.length - 1)),
    );
  };

  const onScroll = RNAnimated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: true},
  );

  const renderItem = useCallback(
    ({item, index}: {item: HomeListItemType; index: number}) => (
      <HomeListItem item={item} index={index} scrollX={scrollX} />
    ),
    [],
  );

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  useEffect(() => {
    hideSplash().then(() => {
      splashProgress.value = withTiming(1, {duration: 500});
    });
  }, []);

  return (
    <>
      <Splash splashProgress={splashProgress} />

      <View style={styles.container}>
        <HomeBackground ref={backgroundRef} />

        <RNAnimated.FlatList
          onScroll={onScroll}
          horizontal
          data={HOME_LIST}
          windowSize={21}
          initialNumToRender={3}
          snapToAlignment="start"
          scrollEventThrottle={16}
          getItemLayout={getItemLayout}
          renderToHardwareTextureAndroid
          onMomentumScrollEnd={onMomentumScrollEnd}
          contentContainerStyle={{paddingRight: ITEM_WIDTH / 2 + 24}}
          showsHorizontalScrollIndicator={false}
          decelerationRate={isIOS ? 0 : 0.875}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          snapToInterval={ITEM_WIDTH - (isAndroid ? 0.25 : 0)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.POLICE_BLUE,
  },
});

export default HomeScreen;
