import React from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import StatusBarManager from '@components/StatusBarManager';
import {FadeItemProps} from '@components/fadeItemList/types';
import FadeListItem from '@components/fadeItemList/FadeListItem';
import ImplementedWith from '@components/fadeItemList/ImplementedWith';
import {BG_IMG, DATA, SPACING} from '@components/fadeItemList/constants';

const ScrollItemListScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}: FadeItemProps) => (
    <FadeListItem item={item} index={index} scrollY={scrollY} />
  );

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  return (
    <>
      <StatusBarManager barStyle="dark" />

      <View style={styles.container}>
        <ImplementedWith />
        <Image
          blurRadius={50}
          source={{uri: BG_IMG}}
          style={StyleSheet.absoluteFillObject}
        />
        <Animated.FlatList
          data={DATA}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.flatlistContainer,
            {paddingTop: insets.top + 100},
          ]}
          keyExtractor={item => item.key}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatlistContainer: {
    paddingHorizontal: SPACING,
  },
});

export default ScrollItemListScreen;
