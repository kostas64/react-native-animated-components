import {
  View,
  Image,
  FlatList,
  StatusBar,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React, {useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import {typography} from '@utils/typography';
import {STOCKS_DATA} from '@components/bank/data';
import StockItem from '@components/bank/StockItem';
import {StocksItemProps} from '@components/bank/types';
import HeaderWithIcon from '@components/bank/HeaderWithIcon';

const BankStocks = () => {
  const isFocused = useIsFocused();
  const showBorder = useSharedValue(false);

  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  if (isFocused) {
    StatusBar.setBarStyle('dark-content');
  }

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;

    if (contentOffset.y > 0 && !showBorder.value) {
      showBorder.value = true;
    } else if (contentOffset.y === 0 && showBorder.value) {
      showBorder.value = false;
    }
  }, []);

  const separatorStyle = useAnimatedStyle(() => ({
    borderBottomWidth: showBorder.value ? 1 : 0,
    borderBottomColor: '#e3e3e3',
  }));

  const renderItem = ({
    item,
    index,
  }: {
    item: StocksItemProps;
    index: number;
  }) => {
    return <StockItem {...item} key={index} />;
  };
  return (
    <View style={[styles.container, {paddingTop}]}>
      <HeaderWithIcon
        label="Stocks"
        icon={
          <Image
            style={styles.icon}
            source={require('../../assets/img/bank/stocks.png')}
          />
        }
        style={separatorStyle}
      />
      <FlatList
        data={STOCKS_DATA}
        renderItem={renderItem}
        onScroll={onScroll}
        onScrollEndDrag={onScroll}
        onMomentumScrollEnd={onScroll}
        onMomentumScrollBegin={onScroll}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default BankStocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    backgroundColor: '#f7f7f7',
  },
  label: {
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spaceHorizontal: {
    marginHorizontal: 24,
  },
  spacePadHorizontal: {
    paddingHorizontal: 24,
  },
  contentContainer: {
    gap: 16,
    paddingTop: 24,
    paddingBottom: 150,
    overflow: 'visible',
  },
  icon: {
    width: 26,
    height: 26,
  },
});
