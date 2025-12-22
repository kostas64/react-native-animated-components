import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  SPACING,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from "@components/galleryList/constants";
import { Colors } from "@utils/colors";
import { isAndroid, WIDTH } from "@utils/device";
import { DATA } from "@components/galleryList/data";
import Arrows from "@components/galleryList/Arrows";
import Background from "@components/galleryList/Background";
import Description from "@components/galleryList/Description";
import { IGalleryDataType } from "@components/galleryList/types";
import StatusBarManager from "@components/common/StatusBarManager";
import GalleryListItem from "@components/galleryList/GalleryListItem";

const GalleryListScreen = () => {
  const [index, setIndex] = React.useState(0);

  const listRef = React.useRef<FlatList>(null);
  const scrollX = React.useRef<Animated.AnimatedValue>(
    new Animated.Value(0)
  ).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const onPressLeft = () => {
    listRef?.current?.scrollToOffset({
      offset: (index - 1) * WIDTH,
      animated: true,
    });
    isAndroid && setIndex((curIndex) => curIndex - 1);
  };

  const onPressRight = () => {
    listRef?.current?.scrollToOffset({
      offset: (index + 1) * WIDTH,
      animated: true,
    });
    isAndroid && setIndex((curIndex) => curIndex + 1);
  };

  const onMomentumScrollEndEvent = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => setIndex(Math.round(e.nativeEvent.contentOffset.x / WIDTH));

  const renderListItem = (
    item: IGalleryDataType,
    index: number,
    scrollX: Animated.AnimatedValue
  ) => <GalleryListItem item={item} index={index} scrollX={scrollX} />;

  return (
    <>
      <StatusBarManager barStyle="dark" />

      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.listContainer}>
            <Animated.FlatList
              ref={listRef}
              data={DATA}
              keyExtractor={(item) => item.key}
              horizontal
              pagingEnabled
              bounces={false}
              onScroll={onScroll}
              style={styles.list}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
              onMomentumScrollEnd={onMomentumScrollEndEvent}
              renderItem={({ item, index }) =>
                renderListItem(item, index, scrollX)
              }
            />
            <Description scrollX={scrollX} />
            <Background />
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
    backgroundColor: Colors.PASTEL_PURPLE,
  },
  safeAreaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    height: IMAGE_HEIGHT * 2.1,
    alignItems: "center",
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

export default GalleryListScreen;
