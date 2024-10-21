import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

import {WIDTH} from '@utils/device';
import {typography} from '@utils/typography';
import {findScheduleForTimes} from './utils';
import {SCHEDULE_EVENTS, TIMES} from './data';
import {ScheduleTimeEventsProps} from './types';
import FadeInTransition from './FadeInTransition';

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
            <Text style={styles.time}>{time}</Text>
            <View style={styles.line} />
            {event && (
              <FadeInTransition
                index={index}
                direction="left"
                animate={isFocused}
                containerStyle={[
                  styles.eventAbsolute,
                  {
                    left: eventIndex % 2 === 0 ? 120 : 86,
                    backgroundColor: event.backgroundColor,
                  },
                ]}>
                <Text style={styles.eventName}>{event.event}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
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
    gap: 2,
    padding: 18,
    borderRadius: 20,
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
});
