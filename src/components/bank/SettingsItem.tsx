import {Pressable, StyleSheet, View} from 'react-native';

import Pencil from './Pencil';
import Text from '@components/Text';
import {WIDTH} from '@utils/device';
import {Colors} from '@utils/colors';
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
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: 12,
    color: Colors.DARK_LIVER,
    fontFamily: typography.medium,
  },
  value: {
    fontSize: 13,
    maxWidth: WIDTH - 124,
    color: Colors.CHINESE_BLACK,
    fontFamily: typography.semiBold,
  },
  halfOpacity: {
    opacity: 0.5,
    backgroundColor: Colors.LIGHT_SILVER,
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
    borderBottomColor: Colors.PLATINUM,
  },
});
