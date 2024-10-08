import Animated, {
  Easing,
  withTiming,
  useDerivedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';
import {format, isSameDay, isToday} from 'date-fns';
import {Pressable, StyleSheet, View} from 'react-native';

import {WIDTH} from '@utils/device';
import {_spacing} from './constants';
import {TWeekDayListItem} from './types';
import {setDayEmitter} from './Calendar';
import {typography} from '@utils/typography';

const WeekDayListItem = ({
  day,
  globalSelectedDate,
  selectedDate,
}: TWeekDayListItem) => {
  const [isSelected, setIsSelected] = React.useState(
    isSameDay(globalSelectedDate.current, day.date),
  );

  const date = new Date(day.date);
  const dayName = format(date, 'EEE');
  const showDot = isToday(day.date);

  const hasLeftSpace =
    day.isStartOfMonth || (parseInt(day.displayLabel) - 1) % 7 === 0;

  const hasRightSpace =
    day.isEndOfMonth || parseInt(day.displayLabel) % 7 === 0;

  const animValue = useDerivedValue(() =>
    withTiming(isSelected ? 1 : 0, {
      duration: 125,
      easing: Easing.ease,
    }),
  );

  const _containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animValue.value,
      [0, 1],
      ['transparent', 'white'],
    ),
  }));

  const _dayStyle = useAnimatedStyle(() => ({
    color: interpolateColor(animValue.value, [0, 1], ['white', '#121212']),
  }));

  const onPress = () => {
    setDayEmitter.emit('daySelected', day);
    selectedDate(day.date);
  };

  useEffect(() => {
    setDayEmitter.on('daySelected', selectedDay => {
      const isSameDate = isSameDay(selectedDay.date, day.date);

      if (isSameDate && !isSelected) {
        setIsSelected(true);
        globalSelectedDate.current = new Date(selectedDay.date);
      } else if (!isSameDate && isSelected) {
        setIsSelected(false);
      }
    });
  }, [isSelected]);

  useEffect(() => {
    if (new Date(globalSelectedDate.current).getDate() === day.date.getDate()) {
      setIsSelected(true);
    }
  }, []);

  return (
    <Pressable onPress={onPress} disabled={isSelected}>
      <Animated.View
        style={[
          styles.dayNameNumber,
          hasLeftSpace && styles.spaceLeft,
          hasRightSpace && styles.spaceRight,
          _containerStyle,
        ]}>
        <Animated.Text style={[styles.dayName, _dayStyle]}>
          {dayName}
        </Animated.Text>
        <Animated.Text style={[styles.dayNumber, _dayStyle]}>
          {day.displayLabel}
        </Animated.Text>
      </Animated.View>
      <View
        style={[
          styles.dot,
          parseInt(day.displayLabel) % 7 === 1 && styles.dotFirstDayOfWeek,
          {backgroundColor: showDot ? 'white' : 'transparent'},
        ]}
      />
    </Pressable>
  );
};

export default WeekDayListItem;

const styles = StyleSheet.create({
  spaceLeft: {
    marginLeft: 20,
  },
  spaceRight: {
    marginRight: 20,
  },
  dayNameNumber: {
    marginRight: _spacing,
    paddingVertical: 10,
    width: (WIDTH - 40 - 6 * _spacing) / 7,
    borderRadius: 48,
  },
  dayName: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: typography.medium,
  },
  dayNumber: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: typography.bold,
  },
  dot: {
    width: 6,
    height: 6,
    marginTop: 8,
    borderRadius: 3,
    left: (WIDTH - 40 - 6 * _spacing) / 14 - 4,
  },
  dotFirstDayOfWeek: {
    left: (WIDTH - 40 - 6 * _spacing) / 7 - 6,
  },
});
