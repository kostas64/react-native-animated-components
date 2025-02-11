import {
  runOnJS,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import Text from '@components/Text';
import {typography} from '@utils/typography';
import {findScheduleForTimes} from './utils';
import {SCHEDULE_EVENTS, TIMES} from './data';
import {ScheduleTimeEventsProps} from './types';
import FadeInTransition from './FadeInTransition';
import {SM_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';
import {AnimatedPressable} from '@components/AnimatedComponents';
import {TWelcomeNavigationProps} from '@screens/ScreenTransition/ScreenTransitionStack';

type EventProps = {
  event: {
    event: string;
    time: string;
    backgroundColor: string;
  };
  eventIndex: number;
};

const Event = ({event, eventIndex}: EventProps) => {
  const navigation = useNavigation<TWelcomeNavigationProps>();
  const progress = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5], [1, 0.6]),
    transform: [{scale: interpolate(progress.value, [0, 0.5], [1, 0.93])}],
  }));

  const onPressIn = () => {
    progress.value = withTiming(0.5, {duration: 75}, () =>
      //@ts-ignore
      runOnJS(navigation.navigate)('Lesson'),
    );
  };

  const onPressOut = () => {
    progress.value = withTiming(0, {duration: 150});
  };

  return (
    <AnimatedPressable
      unstable_pressDelay={100}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        style,
        styles.eventInnerContainer,
        {
          left: eventIndex % 2 === 0 ? 120 : 86,
          backgroundColor: event.backgroundColor,
        },
      ]}>
      <Text
        style={styles.eventName}
        maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
        {event.event}
      </Text>
      <Text
        style={styles.eventTime}
        maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
        {event.time}
      </Text>
    </AnimatedPressable>
  );
};

const ScheduleTimeEvents = ({
  containerStyle,
  contentContainerStyle,
}: ScheduleTimeEventsProps) => {
  const isFocused = useIsFocused();

  const events = findScheduleForTimes(TIMES, SCHEDULE_EVENTS).filter(
    event => !(event.event === 'No event'),
  );

  return (
    <ScrollView
      style={containerStyle}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}>
      {TIMES.map((time, index) => {
        const event = events.find(event => event.time.startsWith(time));
        const eventIndex = events.findIndex(event =>
          event.time.startsWith(time),
        );

        return (
          <View key={`time-${index}`} style={styles.eventContainer}>
            <Text style={styles.time} allowFontScaling={false}>
              {time}
            </Text>
            <View style={styles.line} />
            {event && (
              <FadeInTransition
                index={index}
                direction="left"
                animate={isFocused}
                containerStyle={styles.eventAbsolute}>
                <Event event={event} eventIndex={eventIndex} />
              </FadeInTransition>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ScheduleTimeEvents;

const styles = StyleSheet.create({
  eventContainer: {
    paddingVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    width: 72,
    fontSize: 15,
    fontFamily: typography.semiBold,
    color: '#a0a0a0',
  },
  line: {
    width: WIDTH - 136,
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(0,0,0, 0.2)',
  },
  eventAbsolute: {
    position: 'absolute',
  },
  eventName: {
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  eventTime: {
    color: '#a3a3b2',
    fontFamily: typography.medium,
  },
  eventInnerContainer: {
    gap: 2,
    padding: 18,
    borderRadius: 20,
  },
});
