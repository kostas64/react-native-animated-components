import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import {Colors} from '@utils/colors';
import WalletHeader from '@components/bank/WalletHeader';
import WalletCharts from '@components/bank/WalletCharts';
import CardTransactions from '@components/bank/CardTransactions';

const BankWallet = () => {
  const isFocused = useIsFocused();
  const showBorder = useSharedValue(false);

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
    borderBottomColor: Colors.PLATINUM,
    paddingBottom: 8,
  }));

  if (isFocused) {
    StatusBar.setBarStyle('dark-content');
  }

  return (
    <>
      <View style={styles.container}>
        <WalletHeader style={[styles.spaceBottom, separatorStyle]} />
        <FlatList
          data={[]}
          renderItem={() => null}
          onScroll={onScroll}
          onScrollEndDrag={onScroll}
          onMomentumScrollBegin={onScroll}
          onMomentumScrollEnd={onScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.xsmSpaceTop}
          ListHeaderComponent={<WalletCharts style={styles.smSpaceTop} />}
          ListFooterComponent={<CardTransactions style={styles.spaceTop} />}
          ListFooterComponentStyle={styles.xlSpaceBottom}
        />
      </View>
    </>
  );
};

export default BankWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CULTURED,
  },
  spaceTop: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  smSpaceTop: {
    marginHorizontal: 24,
  },
  spaceBottom: {
    paddingHorizontal: 24,
  },
  xsmSpaceTop: {
    paddingTop: 16,
  },
  xlSpaceBottom: {
    marginBottom: 142,
  },
});
