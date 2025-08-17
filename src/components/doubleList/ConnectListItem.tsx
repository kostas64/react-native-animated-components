import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Text from '@components/common/Text';
import {typography} from '@utils/typography';
import {IIconProps, IItemProps} from './types';
import {ICON_SIZE, ITEM_HEIGHT} from './constants';

const Icon = React.memo(({icon, color}: IIconProps) => {
  return <MaterialIcons name={icon} color={color} size={ICON_SIZE} />;
});

Icon.displayName = 'Icon';

const Item = React.memo(({icon, color, name, showText}: IItemProps | any) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, {color}]}>{name}</Text>
      ) : (
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

Item.displayName = 'Item';

export default Item;

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontFamily: typography.bold,
    textTransform: 'capitalize',
  },
});
