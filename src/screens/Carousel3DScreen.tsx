import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  SafeAreaView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React from 'react';

import {
  SPACING,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from '@components/carousel3d/constants';
import {isAndroid, WIDTH} from '@utils/device';
import {DATA} from '@components/carousel3d/data';
import Arrows from '@components/carousel3d/Arrows';
import Background from '@components/carousel3d/Background';
import Description from '@components/carousel3d/Description';
import StatusBarManager from '../components/StatusBarManager';
import {ICarouselDataType} from '@components/carousel3d/types';
import ImplementedWith from '@components/carousel3d/ImplementedWith';
import Carousel3dListItem from '../components/carousel3d/Carousel3dListItem';

const Carousel3DScreen = () => {
  const [index, setIndex] = React.useState(0);

  const listRef = React.useRef<FlatList>(null);
  const scrollX = React.useRef<Animated.AnimatedValue>(
    new Animated.Value(0),
  ).current;
  const progress = Animated.modulo(Animated.divide(scrollX, WIDTH), WIDTH);

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: true},
  );

  const onPressLeft = () => {
    listRef?.current?.scrollToOffset({
      offset: (index - 1) * WIDTH,
      animated: true,
    });
    isAndroid && setIndex(curIndex => curIndex - 1);
  };

  const onPressRight = () => {
    listRef?.current?.scrollToOffset({
      offset: (index + 1) * WIDTH,
      animated: true,
    });
    isAndroid && setIndex(curIndex => curIndex + 1);
  };

  const onMomentumScrollEndEvent = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => setIndex(Math.round(e.nativeEvent.contentOffset.x / WIDTH));

  const renderListItem = (
    item: ICarouselDataType,
    index: number,
    scrollX: Animated.AnimatedValue,
  ) => <Carousel3dListItem item={item} index={index} scrollX={scrollX} />;

  return (
    <>
      <StatusBarManager barStyle="dark" />

      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <ImplementedWith />
          <View style={styles.listContainer}>
            <Animated.FlatList
              ref={listRef}
              data={DATA}
              keyExtractor={item => item.key}
              horizontal
              pagingEnabled
              bounces={false}
              onScroll={onScroll}
              style={styles.list}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
              onMomentumScrollEnd={onMomentumScrollEndEvent}
              renderItem={({item, index}) =>
                renderListItem(item, index, scrollX)
              }
            />
            <Description scrollX={scrollX} />
            <Background progress={progress} />
          </View>
          <Arrows
            index={index}
            onPressLeft={onPressLeft}
            onPressRight={onPressRight}
            disabledLeft={index === 0}
            disabledRight={index === DATA.length - 1}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5F1FA',
  },
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    height: IMAGE_HEIGHT * 2.1,
    alignItems: 'center',
  },
  listContentContainer: {
    height: IMAGE_HEIGHT + SPACING * 2,
    paddingHorizontal: (WIDTH - IMAGE_WIDTH) / 2,
  },
  list: {
    flexGrow: 0,
    zIndex: 1000,
  },
});

export default Carousel3DScreen;
