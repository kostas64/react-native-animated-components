import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {isIOS} from '@utils/device';
import ScheduleHeader from '@components/screenTransition/ScheduleHeader';
import FadeInTransition from '@components/screenTransition/FadeInTransition';
import ScheduleCalendar from '@components/screenTransition/ScheduleCalendar';
import ScheduleTimeEvents from '@components/screenTransition/ScheduleTimeEvents';

const ScreenTransitionSchedule = () => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const paddingTop =
    insets.top > 24 ? (isIOS ? insets.top : insets.top + 12) : 32;
  const bottom = insets.bottom + 312;

  return (
    <View style={[styles.container, {paddingTop}]}>
      <FadeInTransition
        index={0}
        direction="left"
        animate={isFocused}
        containerStyle={styles.spaceHor}>
        <ScheduleHeader />
      </FadeInTransition>
      <FadeInTransition
        index={1}
        direction="top"
        animate={isFocused}
        containerStyle={[styles.spaceTop, styles.smSpaceHor]}>
        <ScheduleCalendar index={1.1} />
      </FadeInTransition>
      <FadeInTransition
        index={2}
        animate={isFocused}
        containerStyle={[styles.spaceTop, styles.spaceHor]}>
        <ScheduleTimeEvents contentContainerStyle={{paddingBottom: bottom}} />
      </FadeInTransition>
    </View>
  );
};

export default ScreenTransitionSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  spaceHor: {
    paddingHorizontal: 24,
  },
  smSpaceTop: {
    marginTop: 8,
  },
  spaceTop: {
    marginTop: 24,
  },
  smSpaceHor: {
    marginHorizontal: 8,
  },
  paddingTop: {
    paddingTop: 24,
  },
});
