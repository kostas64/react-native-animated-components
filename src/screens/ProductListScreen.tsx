import {
  State,
  Directions,
  FlingGestureHandler,
  HandlerStateChangeEvent,
  FlingGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {typography} from '@utils/typography';
import {items} from '@components/productList/data';
import {ProductItem} from '@components/productList/types';
import AddToBagButton from '@components/productList/AddToBagButton';
import ItemDescription from '@components/productList/ItemDescription';
import ProductListItem from '@components/productList/ProductListItem';

const ProductListScreen = () => {
  const [index, setIndex] = React.useState(0);
  const insets = useSafeAreaInsets();
  const listRef = React.useRef<FlatList>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const animateIndex = React.useRef(new Animated.Value(0)).current;

  const backgroundColor = scrollX.interpolate({
    inputRange: items?.map((_, i) => i * WIDTH),
    outputRange: items?.map(item => item.backgroundColor),
  });

  React.useEffect(() => {
    Animated.timing(animateIndex, {
      toValue: index,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const renderItem = ({item, index: localIndex}: ProductItem) => (
    <ProductListItem
      animateIndex={animateIndex}
      localIndex={localIndex}
      item={item}
    />
  );

  const onFlingLeft = (
    e: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>,
  ) => {
    if (e.nativeEvent.state === State.END) {
      if (index === items.length - 1) return;

      listRef.current?.scrollToIndex({animated: true, index: index + 1});
      setIndex(oldInd => oldInd + 1);
    }
  };

  const onFlingRight = (
    ev: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>,
  ) => {
    if (ev.nativeEvent.state === State.END) {
      if (index === 0) {
        return;
      }
      listRef.current?.scrollToIndex({animated: true, index: index - 1});
      setIndex(index - 1);
    }
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, {backgroundColor}]}
      />
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={onFlingLeft}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={onFlingRight}>
          <View>
            <Animated.FlatList
              ref={listRef}
              bounces={false}
              horizontal
              data={items}
              pagingEnabled
              scrollEnabled={false}
              onScroll={onScroll}
              renderItem={renderItem}
            />
            <ItemDescription index={index} />
            <Text
              style={[
                styles.implementedWith,
                {bottom: insets.bottom + 92, color: items[index].halfFontColor},
              ]}>
              {`Implemented with:\nAnimated API + RN Gesture Handler`}
            </Text>
            <AddToBagButton index={index} />
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  implementedWith: {
    fontSize: 16,
    fontFamily: typography.medium,
    position: 'absolute',
    left: 24,
  },
});
