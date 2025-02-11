import React from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Text from '@components/Text';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const Header = React.memo(() => (
  <View style={styles.innerHeaderContainer}>
    <Text
      style={styles.chatLabel}
      maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
      Chat
    </Text>
    <View style={styles.iconsContainer}>
      <Ionicons name={'videocam-outline'} size={24} />
      <Feather size={20} name={'phone'} />
    </View>
  </View>
));

Header.displayName = 'Header';

export default Header;

const styles = StyleSheet.create({
  innerHeaderContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatLabel: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: typography.bold,
  },
  iconsContainer: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
