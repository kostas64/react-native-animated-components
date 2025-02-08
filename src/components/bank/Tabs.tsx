import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {G, Path, Rect, Svg} from 'react-native-svg';

import {TabsProps} from './types';
import {isIOS} from '@utils/device';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';
import {chevronDown, chevronUp, SELECTED_TYPE} from './data';

const Tabs = ({selected = SELECTED_TYPE.EARNINGS, onSelectType}: TabsProps) => {
  const progress = useSharedValue(0);

  const earningsStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255,255,255,1)', 'rgba(255,255,255,0)'],
    ),
    ...(isIOS && {
      shadowColor: 'black',
      shadowOpacity: interpolate(progress.value, [0, 1], [0.2, 0]),
      shadowRadius: interpolate(progress.value, [0, 1], [5, 0]),
      shadowOffset: {
        width: 0,
        height: 0,
      },
    }),
  }));

  const spendingsStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    ),
    ...(isIOS && {
      shadowColor: 'black',
      shadowOpacity: interpolate(progress.value, [0, 1], [0, 0.2]),
      shadowRadius: interpolate(progress.value, [0, 1], [0, 5]),
      shadowOffset: {
        width: 0,
        height: 0,
      },
    }),
  }));

  progress.value = withTiming(selected === SELECTED_TYPE.EARNINGS ? 0 : 1);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.tabContainer, earningsStyle]}
        onTouchStart={() => onSelectType(SELECTED_TYPE.EARNINGS)}>
        <Text style={styles.label}>{'Earnings'}</Text>
        <View>
          <Svg width={24} height={24}>
            <CommonGradient id={'chevronDown'} />
            <Rect rx={12} width={24} height={24} fill={'url(#chevronDown)'} />
          </Svg>
          <Svg
            width={18}
            height={18}
            viewBox="2.19 2.28 59.31 59.42"
            style={styles.earningsIconContainer}>
            <G transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
              <Path d={chevronDown} fill={'white'} />
            </G>
          </Svg>
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.tabContainer, spendingsStyle]}
        onTouchStart={() => onSelectType(SELECTED_TYPE.SPENDINGS)}>
        <Text style={styles.label}>{'Spendings'}</Text>
        <View style={styles.paddingRightIcon}>
          <Svg width={20} height={20}>
            <CommonGradient id={'chevronDown'} />
            <Rect rx={11} width={20} height={20} fill={'url(#chevronDown)'} />
          </Svg>
          <Svg
            width={8}
            height={8}
            viewBox="2.19 2.28 59.31 59.42"
            style={styles.spendingsIconContainer}>
            <G transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
              <Path d={chevronUp} fill={'white'} />
            </G>
          </Svg>
        </View>
      </Animated.View>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e3e3e3',
    gap: 2,
    padding: 3,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  tabContainer: {
    flex: 1,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
  },
  label: {
    flex: 1,
    fontFamily: typography.semiBold,
    textAlign: 'center',
  },
  earningsIconContainer: {
    position: 'absolute',
    left: 3,
    top: 3,
  },
  spendingsIconContainer: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  paddingRightIcon: {
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 16,
  },
});
