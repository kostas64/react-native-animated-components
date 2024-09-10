import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {typography} from '@utils/typography';

const Header = React.memo(() => (
  <View style={styles.innerHeaderContainer}>
    <Text style={styles.chatLabel}>Chat</Text>
    <View style={styles.iconsContainer}>
      <Ionicons name={'videocam-outline'} size={24} />
      <Feather size={20} name={'phone'} />
    </View>
  </View>
));

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
