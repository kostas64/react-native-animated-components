import React from 'react';
import {Animated} from 'react-native';

import Item from './ConnectListItem';
import data from '@assets/doubleList';
import {ITEM_HEIGHT} from './constants';
import {HEIGHT_SCR} from '@utils/device';
import {IItemProps, TListProps} from './types';

const List = React.forwardRef(
  (
    {color, showText, style, onScroll, onItemIndexChanged}: TListProps,
    ref: any,
  ) => {
    const renderItem = React.useCallback(
      ({item}: {item: IItemProps | any}) => (
        <Item {...item} color={color} showText={showText} />
      ),
      [],
    );

    const listStyle = {
      paddingTop: showText ? 0 : HEIGHT_SCR / 2 - ITEM_HEIGHT / 2,
      paddingBottom: showText ? 0 : HEIGHT_SCR / 2 - ITEM_HEIGHT / 2,
      paddingHorizontal: 20,
    };

    return (
      <Animated.FlatList
        ref={ref}
        data={data}
        bounces={false}
        style={style}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        scrollEnabled={!showText}
        decelerationRate={'normal'}
        snapToInterval={ITEM_HEIGHT}
        contentContainerStyle={listStyle}
        keyExtractor={item => `${item.name}-${item.icon}`}
        renderItem={renderItem}
        onMomentumScrollEnd={e =>
          !!onItemIndexChanged &&
          onItemIndexChanged(
            Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT),
          )
        }
      />
    );
  },
);

export default List;
