import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {typography} from '@utils/typography';

const LessonHeader = () => {
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
      </View>
      <View style={{gap: 5}}>
        <Text style={styles.label}>English grammar</Text>
        <View style={styles.rowCenter}>
          <Text style={styles.description}>{'Will start in '}</Text>
          <Text style={styles.boldDescription}>1:20 min</Text>
        </View>
      </View>
    </View>
  );
};

export default LessonHeader;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    gap: 12,
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
  description: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: '#a1a1a1',
  },
  boldDescription: {
    fontSize: 14,
    fontFamily: typography.bold,
  },
});
