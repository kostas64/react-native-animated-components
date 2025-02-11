import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {shadows} from './styles';
import SettingsItem from './SettingsItem';
import {typography} from '@utils/typography';
import {isAndroid, MAX_FONT_UPSCALE_FACTOR} from '@utils/device';
import {SettingsContainerProps, SettingsItemProps} from './types';

const SettingsContainer = ({title, data, style}: SettingsContainerProps) => {
  return (
    <>
      {title && (
        <Text
          style={[styles.title, style]}
          maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
          {title}
        </Text>
      )}
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
    backgroundColor: '#f7f7f7',
  },
  border: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#e3e3e3',
  },
});
