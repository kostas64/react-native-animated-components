import {StyleSheet, View} from 'react-native';

import {shadows} from './styles';
import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {isAndroid} from '@utils/device';
import SettingsItem from './SettingsItem';
import {typography} from '@utils/typography';
import {SettingsContainerProps, SettingsItemProps} from './types';

const SettingsContainer = ({title, data, style}: SettingsContainerProps) => {
  return (
    <>
      {title && <Text style={[styles.title, style]}>{title}</Text>}
      <View
        style={[
          !title ? style : styles.spaceTop,
          isAndroid ? styles.border : shadows.veryJustShadow,
        ]}>
        {data.map((item: SettingsItemProps, index: number) => (
          <SettingsItem
            key={index}
            {...item}
            isFirst={data.length === 0 || index === 0}
            isLast={data.length === 0 || index === data.length - 1}
          />
        ))}
      </View>
    </>
  );
};

export default SettingsContainer;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  spaceTop: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: Colors.CULTURED,
  },
  border: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.PLATINUM,
  },
});
