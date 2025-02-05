import {
  Text,
  View,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Svg, Text as SVGText} from 'react-native-svg';

import {isIOS} from '@utils/device';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';

const Transactions = ({style}: {style?: StyleProp<ViewStyle>}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.mainLabel}>{'Recent Transactions'}</Text>

      <Pressable
        style={({pressed}) => [
          styles.viewAllContainer,
          pressed && styles.halfOpacity,
        ]}>
        <Svg height={30} width={64}>
          <CommonGradient id={'viewAll'} />

          <SVGText
            x="0"
            y="21"
            fontSize="16"
            fill="url(#viewAll)"
            fontWeight={'600'}
            fontFamily={isIOS ? 'San Francisco' : typography.semiBold}
            textAnchor="start">
            View all
          </SVGText>
        </Svg>
      </Pressable>
    </View>
  );
};

export default Transactions;

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
    paddingVertical: 4,
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
