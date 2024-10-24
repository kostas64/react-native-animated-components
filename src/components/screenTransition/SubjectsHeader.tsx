import React from 'react';
import Animated from 'react-native-reanimated';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import {
  TInnerStackList,
  TScheduleNavigationProps,
} from '@screens/ScreenTransition/ScreenTransitionScheduleStack';
import {isIOS} from '@utils/device';
import {typography} from '@utils/typography';
import FadeInTransition from './FadeInTransition';

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

const AnimTouch = Animated.createAnimatedComponent(Pressable);

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
    <View style={{backgroundColor: 'white'}}>
      <FadeInTransition index={0} direction="left" animate={isFocused}>
        <View style={[styles.container, {paddingTop}]}>
          {TABS.map((tab, index) => (
            <AnimTouch
              key={`tab-${index}`}
              style={styles.tabContainer}
              onPress={() =>
                navigation.navigate(tab.screen as keyof TInnerStackList)
              }>
              <Text
                style={[styles.tab, stackIndex === index && {color: 'black'}]}>
                {tab.label}
              </Text>
            </AnimTouch>
          ))}
        </View>
      </FadeInTransition>
    </View>
  );
};

export default SubjectsHeader;

const styles = StyleSheet.create({
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
