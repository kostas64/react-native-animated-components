import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {typography} from '@utils/typography';

const NotificationsHeader = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, styles.rowCenter]}>
      <View style={[styles.rowCenter, {gap: 12}]}>
        <View style={styles.chevronContainer}>
          <Entypo name="chevron-left" size={18} />
        </View>
        <View style={[styles.rowCenter, {gap: 8}]}>
          <Text style={styles.label}>Notifications</Text>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>7</Text>
          </View>
        </View>
      </View>
      <Ionicons name="checkmark-done-sharp" size={26} />
    </TouchableOpacity>
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
