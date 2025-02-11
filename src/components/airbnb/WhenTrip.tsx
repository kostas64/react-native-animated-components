import {
  Calendar,
  toDateId,
  useDateRange,
} from '@marceloterreiro/flash-calendar';
import React, {useEffect, useMemo} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  WIDTH,
  HEIGHT,
  SM_FONT_UPSCALE_FACTOR,
  MED_FONT_UPSCALE_FACTOR,
} from '@utils/device';
import {TWhenTrip} from './types';
import {CALENDAR_PER} from './data';
import Text from '@components/Text';
import PickerItem from './PickerItem';
import PeriodItem from './PeriodItem';
import {typography} from '@utils/typography';

const now = new Date();
const today = toDateId(now);
const maxDate = toDateId(
  new Date(`${now.getFullYear() + 1}-${now.getMonth() + 1}-${now.getDate()}`),
);

const WhenTrip = ({
  period,
  setPeriod,
  setPeriodo,
  translatePicker,
  translatePickerStyle,
  onPressNext,
  onPressSkipReset,
}: TWhenTrip) => {
  const calendarPerRef = React.createRef<FlatList>();
  const insets = useSafeAreaInsets();
  const top = insets.top > 52 ? insets.top : 36;

  const renderPeriodItem = React.useCallback(
    ({item, index}: {item: string; index: number}) => {
      const isSelected = period === item;

      const onPress = () => {
        setPeriod(item);

        if (calendarPerRef?.current) {
          calendarPerRef?.current.scrollToIndex({
            index,
            animated: true,
            viewOffset: 24,
          });
        }
      };

      return (
        <PeriodItem
          key={`period-${index}`}
          index={index}
          isSelected={isSelected}
          item={item}
          onPress={onPress}
        />
      );
    },
    [period],
  );

  const theme = useMemo(
    () => ({
      itemDayContainer: {
        activeDayFiller: {
          width: 36,
          right: -18,
          backgroundColor: 'rgb(225,225,225)',
        },
      },
      rowMonth: {
        content: {
          color: '#000000',
          textAlign: 'left' as
            | 'auto'
            | 'center'
            | 'left'
            | 'right'
            | 'justify'
            | undefined,
          fontSize: 18,
          fontFamily: typography.semiBold,
        },
      },
      rowWeek: {
        container: {
          height: 0,
          opacity: 0,
        },
      },
      itemDay: {
        base: () => ({
          content: {
            padding: 0,
          },
        }),
        disabled: () => ({
          container: {
            width: 39,
            left: 4,
          },
          content: {
            textDecorationLine: 'line-through' as
              | 'none'
              | 'underline'
              | 'line-through'
              | 'underline line-through'
              | undefined,
            fontFamily: typography.medium,
          },
        }),
        idle: () => ({
          container: {
            width: 39,
            left: 4,
            backgroundColor: 'transparent',
          },
          content: {
            fontFamily: typography.medium,
            color: '#000000',
          },
        }),
        today: ({
          isStartOfRange,
          isEndOfRange,
        }: {
          isStartOfRange: boolean;
          isEndOfRange: boolean;
        }) => ({
          container: {
            width: 39,
            left: 4,
            borderWidth: 0,
            backgroundColor: 'transparent',
          },
          content: {
            fontFamily: typography.medium,
            color: isStartOfRange || isEndOfRange ? '#ffffff' : '#000000',
          },
        }),
        active: ({
          isRangeValid,
          isStartOfRange,
          isEndOfRange,
          isStartOfWeek,
          isEndOfWeek,
        }: {
          isRangeValid: boolean;
          isStartOfRange: boolean;
          isEndOfRange: boolean;
          isStartOfWeek: boolean;
          isEndOfWeek: boolean;
        }) => ({
          container: {
            width: 39,
            left: 4,
            zIndex: 1,
            borderTopRightRadius:
              isRangeValid && !isEndOfRange && !isStartOfRange && !isEndOfWeek
                ? 0
                : isRangeValid && !isEndOfRange && !isStartOfRange
                ? 10
                : 20,
            borderBottomRightRadius:
              isRangeValid && !isEndOfRange && !isStartOfRange && !isEndOfWeek
                ? 0
                : isRangeValid && !isEndOfRange && !isStartOfRange
                ? 10
                : 20,
            borderTopLeftRadius:
              isRangeValid && !isEndOfRange && !isStartOfRange && !isStartOfWeek
                ? 0
                : isRangeValid && !isEndOfRange && !isStartOfRange
                ? 10
                : 20,
            borderBottomLeftRadius:
              isRangeValid && !isEndOfRange && !isStartOfRange && !isStartOfWeek
                ? 0
                : isRangeValid && !isEndOfRange && !isStartOfRange
                ? 10
                : 20,
            backgroundColor:
              isStartOfRange || isEndOfRange ? '#222222' : 'rgb(225,225,225)',
          },
          content: {
            fontFamily: typography.medium,
            color: isStartOfRange || isEndOfRange ? '#ffffff' : '#000000',
          },
        }),
      },
    }),
    [],
  );

  const {
    calendarActiveDateRanges,
    onCalendarDayPress,
    dateRange,
    onClearDateRange,
  } = useDateRange();

  useEffect(() => {
    setPeriodo(dateRange);
  }, [dateRange]);

  const atLeastOneDaySelected =
    !!calendarActiveDateRanges?.[0]?.endId ||
    !!calendarActiveDateRanges?.[0]?.startId;

  const onPressSkipOrReset = () => {
    if (atLeastOneDaySelected) {
      onClearDateRange();
    }

    onPressSkipReset(atLeastOneDaySelected);
  };

  return (
    <>
      <Text
        maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}
        style={[styles.boldWhere, styles.padLeft24]}>
        {"When's your trip?"}
      </Text>
      <View style={styles.pickerContainer}>
        <Animated.View
          style={[styles.absolute, translatePickerStyle, styles.pickerPose]}
        />
        <PickerItem
          label={'Dates'}
          style={styles.marLeft6}
          onPress={() => (translatePicker.value = withTiming(0))}
        />
        <PickerItem
          label={'Months'}
          onPress={() => (translatePicker.value = withTiming(1))}
        />
        <PickerItem
          label={'Flexible'}
          onPress={() => (translatePicker.value = withTiming(2))}
        />
      </View>
      <View style={[styles.row, styles.justifyBtn, styles.daysContainer]}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((item, key) => (
          <Text
            key={`day-${key}`}
            style={styles.monthDay}
            maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
            {item}
          </Text>
        ))}
      </View>

      <View style={[{height: HEIGHT - top - 464}, styles.calendarContainer]}>
        <Calendar.List
          calendarFirstDayOfWeek="monday"
          calendarMonthHeaderHeight={36}
          calendarSpacing={24}
          calendarDayHeight={38}
          calendarRowHorizontalSpacing={0}
          calendarActiveDateRanges={calendarActiveDateRanges}
          calendarInitialMonthId={today}
          calendarMinDateId={today}
          calendarMaxDateId={maxDate}
          theme={theme}
          decelerationRate={'fast'}
          estimatedItemSize={1000}
          onCalendarDayPress={onCalendarDayPress}
        />
      </View>
      <View style={[styles.borderLine, styles.marBot10]} />
      <FlatList
        horizontal
        data={CALENDAR_PER}
        ref={calendarPerRef}
        renderItem={renderPeriodItem}
        contentContainerStyle={styles.center}
        showsHorizontalScrollIndicator={false}
      />
      <View style={[styles.borderLine, styles.marTop10]} />

      <View
        style={[
          styles.row,
          styles.justifyBtn,
          styles.padHor24,
          styles.height74,
        ]}>
        <Pressable onPress={onPressSkipOrReset} style={styles.skipResetBtn}>
          <Text style={[styles.font16, styles.fontW500, styles.underline]}>
            {atLeastOneDaySelected ? 'Reset' : 'Skip'}
          </Text>
        </Pressable>
        <Pressable style={styles.nextBtn} onPress={onPressNext}>
          <Text style={[styles.font16, styles.fontW500, styles.white]}>
            Next
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default WhenTrip;

const styles = StyleSheet.create({
  calendarContainer: {
    width: WIDTH - 60,
    alignSelf: 'center',
    left: 6,
    flex: 1,
  },
  daysContainer: {
    alignSelf: 'center',
    marginVertical: 16,
    width: WIDTH - 60,
    left: 6,
  },
  monthDay: {
    textAlign: 'center',
    color: 'rgb(125,125,125)',
    width: (WIDTH - 60) / 7,
  },
  padLeft24: {
    paddingLeft: 24,
  },
  pickerContainer: {
    height: 45,
    width: WIDTH - 78,
    marginTop: 16,
    marginLeft: 24,
    backgroundColor: 'rgb(225,225,225)',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 32,
  },
  pickerPose: {
    top: 6,
    left: 6,
    height: 33,
    borderRadius: 20,
    width: (WIDTH - 90) / 3,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  absolute: {
    position: 'absolute',
  },
  row: {
    flexDirection: 'row',
  },
  justifyBtn: {
    justifyContent: 'space-between',
  },
  boldWhere: {
    fontSize: 28,
    fontFamily: typography.bold,
  },
  marLeft6: {
    marginLeft: 6,
  },
  marTop10: {
    marginTop: 10,
  },
  marBot10: {
    marginBottom: 10,
  },
  padHor24: {
    paddingHorizontal: 24,
  },
  borderLine: {
    height: 1,
    backgroundColor: 'rgb(210,210,210)',
    width: WIDTH - 32,
  },
  height74: {
    height: 74,
  },
  nextBtn: {
    backgroundColor: '#222222',
    alignSelf: 'center',
    paddingHorizontal: 46,
    paddingVertical: 14,
    borderRadius: 8,
  },
  skipResetBtn: {
    alignSelf: 'center',
    padding: 10,
  },
  font16: {
    fontSize: 16,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  white: {
    color: 'white',
  },
  fontW500: {
    fontWeight: '500',
  },
  center: {
    alignItems: 'center',
  },
});
