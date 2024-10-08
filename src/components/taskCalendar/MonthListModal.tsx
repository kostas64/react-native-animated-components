import {
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAnimatedRef, useScrollViewOffset} from 'react-native-reanimated';

import {MONTHS} from './constants';
import {isIOS} from '@utils/device';
import MonthListItem from './MonthListItem';
import {TMonthListItem, TMonthListModal} from './types';
import MonthListPickerLines from './MonthListPickerLines';

const MonthListModal = ({month, setMonth}: TMonthListModal) => {
  const scrollRef = useAnimatedRef<FlatList>(); //@ts-ignore
  const scrollOffset = useScrollViewOffset(scrollRef);
  const insets = useSafeAreaInsets();

  const initialScrollIndex = MONTHS.findIndex(m => m === month);

  const getItemLayout = (_: any, index: number) => ({
    index,
    length: 46 * index,
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
    ({item, index}: TMonthListItem) => (
      <MonthListItem
        key={index}
        item={item}
        index={index}
        scrollOffset={scrollOffset}
      />
    ),
    [],
  );

  return (
    <View style={styles.list}>
      <MonthListPickerLines />
      <FlatList
        data={MONTHS}
        ref={scrollRef}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate={'fast'}
        getItemLayout={getItemLayout}
        initialScrollIndex={initialScrollIndex}
        onMomentumScrollEnd={onMomentumScrollEnd}
        snapToOffsets={MONTHS.map((_, i) => i * 46)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.alignCenter,
          {
            paddingTop: 64,
            paddingBottom: isIOS ? insets.bottom + 60 : 94,
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
