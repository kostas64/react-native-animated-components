import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const NotificationsHeader = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, styles.rowCenter]}>
      <View style={[styles.rowCenter, {gap: 12}]}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.6}
          style={styles.chevronContainer}>
          <Entypo name="chevron-left" size={18} />
        </TouchableOpacity>
        <View style={[styles.rowCenter, {gap: 8}]}>
          <Text
            style={styles.label}
            maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
            Notifications
          </Text>
          <View style={styles.numberContainer}>
            <Text
              style={styles.number}
              maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
              7
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="checkmark-done-sharp" size={26} />
    </View>
  );
};

export default NotificationsHeader;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  chevronContainer: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#e5e5e5',
  },
  label: {
    fontSize: 20,
    fontFamily: typography.bold,
  },
  numberContainer: {
    height: 27,
    minWidth: 27,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  number: {
    fontFamily: typography.semiBold,
    fontSize: 12,
    paddingHorizontal: 8,
  },
});
