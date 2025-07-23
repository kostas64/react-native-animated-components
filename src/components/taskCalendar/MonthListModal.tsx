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
import {useDebouncedCallback} from 'use-debounce';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {MONTHS} from './constants';
import {TMonthListModal} from './types';
import MonthListItem from './MonthListItem';
import {HAPTIC_CONFIG} from '@utils/haptics';
import {isIOS, isAndroid} from '@utils/device';
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
      const y = event.nativeEvent.contentOffset.y;
      calculateNewIndex(y);
    },
    [],
  );

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
    },
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

  const scrollToMonth = useCallback((monthToScroll: string) => {
    scrollRef.current?.scrollToOffset({
      animated: true,
      offset: MONTHS.findIndex(m => m === monthToScroll) * 46,
    });

    isAndroid &&
      setTimeout(() => {
        onMomentumScrollEnd({
          //@ts-ignore
          nativeEvent: {
            contentOffset: {x: 0, y: MONTHS.findIndex(m => m === month) * 46},
          },
        });
      }, 15);
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
          isIOS ? {paddingBottom: insets.bottom + 56} : styles.spaceBottom,
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
    paddingTop: 64,
  },
  spaceBottom: {
    paddingBottom: 90,
  },
});
