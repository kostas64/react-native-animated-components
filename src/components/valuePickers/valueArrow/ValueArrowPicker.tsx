import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAnimatedRef, useScrollViewOffset} from 'react-native-reanimated';

import Arrow from './Arrow';
import ListItem from './ListItem';
import {TValueRangePicker, TViewableItems} from './types';

const ValueArrowPicker = ({
  range,
  unit,
  value = range[0],
  setValue,
}: TValueRangePicker) => {
  const listRef = useAnimatedRef<FlatList>(); //@ts-ignore
  const scrollOffset = useScrollViewOffset(listRef);

  const values = new Array(range[1] - range[0] + 1)
    .fill(0)
    .map((_, i) => i + range[0]);

  const renderItem = ({item, index}: {item: number; index: number}) => (
    <ListItem
      item={item}
      index={index}
      unit={unit}
      scrollOffset={scrollOffset}
      key={`arrow-list-item-${index}`}
    />
  );

  const onPressArrow = (direction: 'up' | 'down') => {
    const index = values.indexOf(value);
    listRef.current?.scrollToIndex({
      index: direction === 'down' ? index + 1 : index - 1,
    });
  };

  const onViewableItemsChanged = ({viewableItems}: TViewableItems) => {
    setValue(viewableItems?.[0]?.item);
  };

  const viewabilityConfigCallbackPairs = React.useRef([
    {onViewableItemsChanged},
  ]);

  return (
    <View style={styles.itemsCenter}>
      <Arrow
        direction={'up'}
        disabled={value === range[0]}
        onPress={() => onPressArrow('up')}
      />
      <View style={{height: 112}}>
        <FlatList
          ref={listRef}
          data={values}
          pagingEnabled
          renderItem={renderItem}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 100,
          }} //@ts-ignore
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Arrow
        direction={'down'}
        disabled={value === range[1]}
        onPress={() => onPressArrow('down')}
      />
    </View>
  );
};

export default React.memo(ValueArrowPicker);

const styles = StyleSheet.create({
  itemsCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
