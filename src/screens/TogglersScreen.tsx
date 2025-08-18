import {StyleSheet, View} from 'react-native';

import StatusBarManager from '@components/common/StatusBarManager';
import NativeIOSToggle from '@components/togglers/NativeIOSToggle';
import ToggleWithLabel from '@components/togglers/ToggleWithLabel';
import ToggleWithSymbol from '@components/togglers/ToggleWithSymbol';

const TogglersScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />

      <View style={styles.container}>
        <NativeIOSToggle />
        <View style={styles.space} />
        <NativeIOSToggle withTheme />
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
