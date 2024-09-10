import {
  View,
  FlatList,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useAnimatedRef, useScrollViewOffset} from 'react-native-reanimated';

import React from 'react';
import ListItem from './ListItem';
import {TListItem, TValueRangePicker} from './types';

const ValueListPicker = ({range, unit, value, setValue}: TValueRangePicker) => {
  const scrollRef = useAnimatedRef<FlatList>(); //@ts-ignore
  const scrollOffset = useScrollViewOffset(scrollRef);

  //Empty items to center our first visible item
  const initialArray = ['', ''];
  const outerArray = new Array(range[1] - range[0] + 1)
    .fill(0)
    .map((_, i) => i + range[0]);
  const values = [...initialArray, ...outerArray];

  //Empty items to center our last visible item
  values.push('');
  values.push('');

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const yPosition = event.nativeEvent.contentOffset.y;
    const step = 30;
    const newIndex = yPosition / step;

    if (newIndex !== value) {
      setValue(newIndex + 2);
    }
  };

  const getItemLayout = (_: any, index: number) => ({
    index,
    length: 30 * index,
    offset: 30 * index,
  });

  const renderItem = ({item, index}: TListItem) => (
    <ListItem
      key={`list-item-${index}`}
      scrollOffset={scrollOffset}
      item={item}
      index={index}
      unit={unit}
      isLast={index === values.length - 1}
    />
  );

  return (
    <View style={styles.list}>
      <FlatList
        data={values}
        ref={scrollRef}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate={'normal'}
        getItemLayout={getItemLayout}
        initialScrollIndex={2}
        snapToOffsets={values.map((_, i) => i * 30)}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.alignCenter,
          {height: values.length * 30 + 50},
        ]}
      />
    </View>
  );
};

export default React.memo(ValueListPicker);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
    flexGrow: 1,
  },
});
