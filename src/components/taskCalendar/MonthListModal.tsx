import {
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useDerivedValue,
  useScrollOffset,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import React, { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { scheduleOnRN } from "react-native-worklets";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MONTHS } from "./constants";
import { TMonthListModal } from "./types";
import MonthListItem from "./MonthListItem";
import { isIOS, isAndroid } from "@utils/device";
import MonthListPickerLines from "./MonthListPickerLines";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const triggerHaptik = () => {
  impactAsync(ImpactFeedbackStyle.Light);
};

const MonthListModal = ({ month, setMonth }: TMonthListModal) => {
  const scrollY = useSharedValue(0);
  const scrollRef = useAnimatedRef<FlatList>();
  const scrollOffset = useScrollOffset(scrollRef);
  const insets = useSafeAreaInsets();

  const initialScrollIndex = MONTHS.findIndex((m) => m === month);

  const getItemLayout = (_: unknown, index: number) => ({
    index,
    length: 46,
    offset: 46 * index,
  });

  const calculateNewIndex = useDebouncedCallback(
    (y: number) => {
      const step = 46;
      const newIndex = Math.round(y / step);

      setMonth(newIndex);
    },
    200,
    {
      leading: false,
      trailing: true,
    }
  );

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      calculateNewIndex(y);
    },
    [calculateNewIndex]
  );

  const scrollToMonth = useCallback(
    (monthToScroll: string) => {
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: MONTHS.findIndex((m) => m === monthToScroll) * 46,
      });

      isAndroid &&
        setTimeout(() => {
          onMomentumScrollEnd({
            //@ts-ignore
            nativeEvent: {
              contentOffset: {
                x: 0,
                y: MONTHS.findIndex((m) => m === month) * 46,
              },
            },
          });
        }, 15);
    },
    [month, scrollRef, onMomentumScrollEnd]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: unknown; index: number }) => (
      <MonthListItem
        index={index}
        item={item as string}
        scrollOffset={scrollOffset}
        scrollToMonth={scrollToMonth}
      />
    ),
    [scrollOffset, scrollToMonth]
  );

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  useDerivedValue(() => {
    if (Number.isInteger(scrollY.value / 46)) {
      scheduleOnRN(triggerHaptik);
    }
  });

  return (
    <View style={styles.list}>
      <MonthListPickerLines />
      <AnimatedFlatList
        data={MONTHS}
        ref={scrollRef}
        renderItem={renderItem}
        onScroll={onScroll}
        decelerationRate={"fast"}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={getItemLayout}
        scrollEventThrottle={16}
        initialScrollIndex={initialScrollIndex}
        onMomentumScrollEnd={onMomentumScrollEnd}
        snapToOffsets={MONTHS.map((_, i) => i * 46)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.alignCenter,
          isIOS ? { paddingBottom: insets.bottom + 56 } : styles.spaceBottom,
        ]}
      />
    </View>
  );
};

export default React.memo(MonthListModal);

const styles = StyleSheet.create({
  list: {
    height: 200,
  },
  alignCenter: {
    alignItems: "center",
    flexGrow: 1,
    paddingTop: 64,
  },
  spaceBottom: {
    paddingBottom: 90,
  },
});
