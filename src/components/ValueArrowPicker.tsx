import Animated, {
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {TValueRangePicker} from 'src/screens/ValuePickersScreen';

type TArrow = {
  direction: 'up' | 'down';
  disabled: boolean;
  onPress: () => void;
};

type TListItem = {
  item: number;
  index: number;
  unit: string | undefined;
  scrollOffset: SharedValue<number>;
};

type TViewableItems = {
  viewableItems: [{item: number}];
};

const Arrow = ({direction, onPress = () => {}, disabled = false}: TArrow) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.5} disabled={disabled}>
    <Entypo
      size={24}
      name={`chevron-${direction}`}
      color={disabled ? 'rgba(255,255,255, 0.20)' : 'rgba(255,255,255, 0.80)'}
    />
  </TouchableOpacity>
);

const ListItem = React.memo(({item, index, unit, scrollOffset}: TListItem) => {
  const animStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [
        index * 112 - 40,
        index * 112 - 20,
        index * 112,
        index * 112 + 20,
        index * 112 + 40,
      ],
      [0.2, 0.5, 1, 0.5, 0.2],
    ),
  }));

  return (
    <Animated.View style={[animStyle, styles.itemContainer]}>
      <Text style={styles.item}>{`${item}${unit}`}</Text>
    </Animated.View>
  );
});

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
  itemContainer: {
    height: 112,
    justifyContent: 'center',
  },
  item: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
