import {
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated as RNAnimated,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import {HEIGHT, WIDTH} from '@utils/device';
import {data} from '@components/parallax/data';
import {ParallaxListItemProps} from '@components/parallax/types';
import StatusBarManager from '@components/common/StatusBarManager';
import ParallaxListItem from '@components/parallax/ParallaxListItem';

const ParallaxScreen = () => {
  const scrollX = React.useRef(new RNAnimated.Value(0)).current;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderItem = React.useCallback(
    ({item, index}: ParallaxListItemProps) => (
      <ParallaxListItem item={item} index={index} scrollX={scrollX} />
    ),
    [],
  );

  const onScroll = RNAnimated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: true,
      listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = e.nativeEvent.contentOffset.x;
        const nextIndex = Math.round(x / WIDTH);
        setSelectedIndex(Math.max(0, Math.min(nextIndex, data.length - 1)));
      },
    },
  );

  return (
    <>
      <StatusBarManager barStyle="dark" />

      <View style={styles.container}>
        <Animated.Image
          key={`image-${selectedIndex}`}
          blurRadius={10}
          style={styles.img}
          entering={FadeIn}
          exiting={FadeOut}
          source={data[selectedIndex]?.photo ?? data[0]?.photo}
        />

        <RNAnimated.FlatList
          data={data}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: {key: string}) => item.key}
        />
      </View>
    </>
  );
};

export default ParallaxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
  },
});
