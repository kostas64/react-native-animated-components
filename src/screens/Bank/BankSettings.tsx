import {
  View,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';

import {Colors} from '@utils/colors';
import {MONTHS} from '@assets/months';
import {isAndroid} from '@utils/device';
import Frozen from '@components/bank/Frozen';
import {shadows} from '@components/bank/styles';
import SettingsItem from '@components/bank/SettingsItem';
import HeaderWithIcon from '@components/bank/HeaderWithIcon';
import {PERSONAL_DETAILS, SUPPORT} from '@components/bank/data';
import SettingsContainer from '@components/bank/SettingsContainer';

const BankSettings = () => {
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
    paddingHorizontal: 24,
    borderBottomWidth: showBorder.value ? 1 : 0,
    borderBottomColor: Colors.PLATINUM,
  }));

  return (
    <View style={[styles.container, {paddingTop}]}>
      <HeaderWithIcon
        label={'Settings'}
        icon={
          <Image
            source={require('@assets/img/bank/settings.png')}
            style={styles.icon}
          />
        }
        style={separatorStyle}
      />

      <ScrollView
        onScroll={onScroll}
        contentContainerStyle={styles.contentContainer}>
        <SettingsItem
          isFirst
          isLast
          style={[
            styles.spaceTop,
            isAndroid ? styles.border : shadows.veryJustShadow,
          ]}
          placeholder="Change Password"
          value={`Expiring ${new Date().getDate()} ${
            MONTHS[new Date().getMonth() + 2]
          }`}
        />

        <SettingsItem
          isFirst
          isLast
          style={[
            styles.spaceTop,
            isAndroid ? styles.border : shadows.veryJustShadow,
          ]}
          placeholder="Freeze Card"
          rightItem={<Frozen />}
          value={`Lost card or get stolen?`}
        />

        <SettingsContainer
          title={'Personal Details'}
          data={PERSONAL_DETAILS}
          style={styles.spaceTop}
        />

        <SettingsItem
          isFirst
          isLast
          style={[
            styles.spaceTop,
            isAndroid ? styles.border : shadows.veryJustShadow,
          ]}
          placeholder="Daily Transfer Limits"
          value={`$1000`}
        />

        <SettingsContainer
          title={'Support'}
          data={SUPPORT}
          style={styles.spaceTop}
        />
      </ScrollView>
    </View>
  );
};

export default BankSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CULTURED,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 152,
  },
  spaceTop: {
    marginTop: 24,
  },
  border: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.PLATINUM,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 2,
    marginLeft: 2,
  },
});
