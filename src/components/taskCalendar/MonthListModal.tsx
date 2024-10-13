import {
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useSharedValue,
  useDerivedValue,
  useScrollViewOffset,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import React, {useCallback} from 'react';
import Haptic from 'react-native-haptic-feedback';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {MONTHS} from './constants';
import {isIOS, isAndroid} from '@utils/device';
import {TMonthListModal} from './types';
import MonthListItem from './MonthListItem';
import {HAPTIC_CONFIG} from '@utils/haptics';
import MonthListPickerLines from './MonthListPickerLines';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const triggerHaptik = () => {
  Haptic.trigger('impactLight', HAPTIC_CONFIG);
};

const MonthListModal = ({month, setMonth}: TMonthListModal) => {
  const scrollY = useSharedValue(0);
  const scrollRef = useAnimatedRef<FlatList>(); //@ts-ignore
  const scrollOffset = useScrollViewOffset(scrollRef);
  const insets = useSafeAreaInsets();

  const initialScrollIndex = MONTHS.findIndex(m => m === month);

  const getItemLayout = (_: any, index: number) => ({
    index,
    length: 46,
    offset: 46 * index,
  });

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const yPosition = event.nativeEvent.contentOffset.y;
      const step = 46;
      const newIndex = Math.round(yPosition / step);

      setMonth(newIndex);
    },
    [],
  );

  const renderItem = useCallback(
    ({item, index}: {item: unknown; index: number}) => (
      <MonthListItem
        index={index}
        item={item as string}
        scrollOffset={scrollOffset}
        scrollToMonth={scrollToMonth}
      />
    ),
    [],
  );

  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const scrollToMonth = useCallback((month: string) => {
    scrollRef.current?.scrollToOffset({
      animated: true,
      offset: MONTHS.findIndex(m => m === month) * 46,
    });

    isAndroid &&
      setTimeout(() => {
        onMomentumScrollEnd({
          //@ts-ignore
          nativeEvent: {
            contentOffset: {x: 0, y: MONTHS.findIndex(m => m === month) * 46},
          },
        });
      }, 50);
  }, []);

  useDerivedValue(() => {
    if (Number.isInteger(scrollY.value / 46)) {
      runOnJS(triggerHaptik)();
    }
  });

  return (
    <View style={styles.list}>
      <MonthListPickerLines />
      <AnimatedFlatList
        data={MONTHS}
        ref={scrollRef}
        renderItem={renderItem}
        pagingEnabled
        onScroll={onScroll}
        decelerationRate={'fast'}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={getItemLayout}
        scrollEventThrottle={16}
        initialScrollIndex={initialScrollIndex}
        onMomentumScrollEnd={onMomentumScrollEnd}
        snapToOffsets={MONTHS.map((_, i) => i * 46)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.alignCenter,
          {
            paddingTop: 64,
            paddingBottom: isIOS ? insets.bottom + 56 : 90,
          },
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
    alignItems: 'center',
    flexGrow: 1,
  },
});
