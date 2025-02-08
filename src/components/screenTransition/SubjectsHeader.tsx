import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import {
  TInnerStackList,
  TScheduleNavigationProps,
} from '@screens/ScreenTransition/ScreenTransitionScheduleStack';
import {typography} from '@utils/typography';
import FadeInTransition from './FadeInTransition';
import {isIOS, MAX_FONT_UPSCALE_FACTOR} from '@utils/device';
import {AnimatedPressable} from '@components/AnimatedComponents';

const TABS = [
  {
    label: 'Subjects',
    screen: 'ScreenTransitionSchedule',
  },
  {
    label: 'Homework',
    screen: 'ScreenTransitionHomework',
  },
];

const SubjectsHeader = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<TScheduleNavigationProps>();
  const insets = useSafeAreaInsets();

  const navState = navigation.getState();
  const state = navState?.routes?.[navState.index].state;
  const stackIndex = state?.index || 0;

  const paddingTop =
    insets.top > 24 ? (isIOS ? insets.top : insets.top + 12) : 32;

  return (
    <View style={styles.whiteBg}>
      <FadeInTransition index={0} direction="left" animate={isFocused}>
        <View style={[styles.container, {paddingTop}]}>
          {TABS.map((tab, index) => (
            <AnimatedPressable
              key={`tab-${index}`}
              style={styles.tabContainer}
              onPress={() =>
                navigation.navigate(tab.screen as keyof TInnerStackList)
              }>
              <Text
                maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
                style={[styles.tab, stackIndex === index && {color: 'black'}]}>
                {tab.label}
              </Text>
            </AnimatedPressable>
          ))}
        </View>
      </FadeInTransition>
    </View>
  );
};

export default SubjectsHeader;

const styles = StyleSheet.create({
  whiteBg: {
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tabContainer: {
    width: '50%',
  },
  tab: {
    paddingVertical: 4,
    textAlign: 'center',
    fontSize: 20,
    color: '#a0a0a0',
    fontFamily: typography.semiBold,
  },
});
