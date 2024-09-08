import React from 'react';
import {StyleSheet, View} from 'react-native';

import StatusBarManager from '@components/StatusBarManager';
import ImplementedWith from '@components/togglers/ImplementedWith';
import NativeIOSToggle from '@components/togglers/NativeIOSToggle';
import ToggleWithLabel from '@components/togglers/ToggleWithLabel';
import ToggleWithSymbol from '@components/togglers/ToggleWithSymbol';

const TogglersScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />

      <View style={styles.container}>
        <ImplementedWith />
        <NativeIOSToggle />
        <View style={styles.space} />
        <ToggleWithLabel />
        <View style={styles.space} />
        <ToggleWithSymbol />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    paddingVertical: 8,
  },
});

export default TogglersScreen;
