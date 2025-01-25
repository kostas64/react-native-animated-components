import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR} from '@utils/device';

const ChartHeader = ({iconName, label}: {iconName: string; label: string}) => (
  <View style={styles.chartHeaderContainer}>
    <View style={styles.chartHeaderInnerContainer}>
      <View style={styles.chartHeaderIconContainer}>
        <AntDesign name={iconName} size={20} color={'#556d36'} />
      </View>
      <Text
        style={styles.chartHeaderLabel}
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
        {label}
      </Text>
    </View>
  </View>
);

export default ChartHeader;

const styles = StyleSheet.create({
  chartHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartHeaderInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3e5d7',
    padding: 10,
    borderRadius: 16,
  },
  chartHeaderIconContainer: {
    backgroundColor: '#eeeee2',
    marginRight: 10,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  chartHeaderLabel: {
    lineHeight: 20,
    color: '#556d36',
    fontFamily: typography.bold,
  },
});
