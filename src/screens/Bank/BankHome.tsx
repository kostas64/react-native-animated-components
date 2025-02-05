import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {isIOS} from '@utils/device';
import HomeHeader from '@components/bank/HomeHeader';

const BankHome = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <HomeHeader
        style={{
          paddingTop: paddingTop,
          marginHorizontal: isIOS ? 4 : 0,
        }}
      />
    </View>
  );
};

export default BankHome;

const styles = StyleSheet.create({});
