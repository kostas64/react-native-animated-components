import React from 'react';
import {Svg, Text as SVGText} from 'react-native-svg';
import {Text, View, Pressable, StyleSheet} from 'react-native';

import {SectionHeaderProps} from './types';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';
import {isIOS, MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const SectionHeader = ({
  label,
  rightLabel,
  style,
  onPress,
}: SectionHeaderProps) => {
  return (
    <View
      style={[styles.container, !rightLabel && {paddingVertical: 12}, style]}>
      <Text
        style={styles.mainLabel}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>

      {rightLabel && (
        <Pressable
          onPress={onPress}
          style={({pressed}) => [
            styles.viewAllContainer,
            pressed && styles.halfOpacity,
          ]}>
          <Svg height={30} width={72}>
            <CommonGradient id={'viewAll'} />

            <SVGText
              x="0"
              y="21"
              fontSize="16"
              fill="url(#viewAll)"
              fontWeight={'600'}
              fontFamily={isIOS ? 'AvenirNext-Medium' : typography.semiBold}>
              {rightLabel}
            </SVGText>
          </Svg>
        </Pressable>
      )}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainLabel: {
    fontSize: 18,
    fontFamily: typography.semiBold,
  },
  viewAllContainer: {
    paddingLeft: 16,
    paddingVertical: 8,
    paddingRight: 24,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: typography.regular,
  },
  halfOpacity: {
    opacity: 0.5,
  },
});
