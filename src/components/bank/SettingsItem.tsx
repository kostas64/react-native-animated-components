import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import Pencil from './Pencil';
import {WIDTH} from '@utils/device';
import {SettingsItemProps} from './types';
import {typography} from '@utils/typography';

const SettingsItem = ({
  placeholder,
  value,
  style,
  onPress,
  rightItem,
  isFirst = true,
  isLast = true,
}: SettingsItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        pressed && styles.halfOpacity,
        isFirst && styles.topRadius,
        isLast && styles.lastRadius,
        !isLast && styles.border,
        style,
      ]}>
      <View style={styles.gap}>
        <Text style={styles.placeholder}>{placeholder}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {rightItem || <Pencil />}
    </Pressable>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  gap: {
    gap: 4,
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: 12,
    color: '#505050',
    fontFamily: typography.medium,
  },
  value: {
    fontSize: 13,
    maxWidth: WIDTH - 124,
    color: '#121212',
    fontFamily: typography.semiBold,
  },
  halfOpacity: {
    opacity: 0.5,
    backgroundColor: '#d9d9d9',
  },
  topRadius: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastRadius: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
});
