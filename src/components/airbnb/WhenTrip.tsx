import React from 'react';
import {CalendarList} from 'react-native-calendars';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {withTiming} from 'react-native-reanimated';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {TWhenTrip} from './types';
import PickerItem from './PickerItem';
import {MONTHS} from '@assets/months';
import {HEIGHT, WIDTH} from '@utils/device';
import {typography} from '@utils/typography';
import {CALENDAR_PER, MIN_DATE} from './data';

const WhenTrip = ({
  setDay,
  period,
  periodo,
  setPeriod,
  translatePicker,
  translatePickerStyle,
  onPressNext,
  onPressSkipReset,
}: TWhenTrip) => {
  const calendarPerRef = React.createRef<FlatList>();
  const insets = useSafeAreaInsets();
  const top = insets.top > 40 ? insets.top : 30;

  const renderPeriodItem = React.useCallback(
    ({item, index}: {item: string; index: number}) => {
      const isSelected = period === item;

      return (
        <Pressable
          onPress={() => {
            setPeriod(item);

            if (calendarPerRef?.current) {
              calendarPerRef?.current.scrollToIndex({
                index,
                animated: true,
                viewOffset: 24,
              });
            }
          }}
          key={`period-${index}`}
          style={[
            styles.periodItemContainer,
            isSelected
              ? styles.selectedPeriodItem
              : styles.unselectedPeriodItem,
            {
              marginLeft: index === 0 ? 20 : 0,
              marginRight: index !== CALENDAR_PER.length - 1 ? 10 : 20,
            },
          ]}>
          <Text style={styles.itemLabel}>{item}</Text>
        </Pressable>
      );
    },
    [period],
  );

  return (
    <>
      <Text style={[styles.boldWhere, styles.padLeft24]}>
        When's your trip?
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
          <Text key={`day-${key}`} style={{color: 'rgb(125,125,125)'}}>
            {item}
          </Text>
        ))}
      </View>

      <CalendarList
        firstDay={1}
        hideDayNames
        minDate={MIN_DATE}
        pastScrollRange={0}
        markingType={'period'}
        futureScrollRange={3}
        calendarWidth={WIDTH - 48}
        calendarHeight={280}
        onDayPress={setDay}
        markedDates={periodo}
        //@ts-ignore
        theme={styles.calendarTheme}
        renderHeader={date => (
          <View style={styles.headerCalendar}>
            <Text style={[styles.fontW500, styles.font16]}>{`${
              MONTHS[date.getMonth()]
            } ${date.getFullYear()}`}</Text>
          </View>
        )}
        style={[styles.marLeft10, {height: HEIGHT - top - 464}]}
      />
      <View style={[styles.borderLine, styles.marBot10]} />
      <FlatList
        horizontal
        data={CALENDAR_PER}
        ref={calendarPerRef}
        renderItem={renderPeriodItem}
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
        <Pressable onPress={onPressSkipReset} style={styles.skipResetBtn}>
          <Text style={[styles.font16, styles.fontW500, styles.underline]}>
            {Object.keys(periodo).length === 0 ? 'Skip' : 'Reset'}
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
  daysContainer: {
    marginLeft: 40,
    marginRight: 16,
    marginVertical: 16,
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
  headerCalendar: {
    flex: 1,
    alignItems: 'flex-start',
    left: -12,
    marginBottom: 12,
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
  marLeft10: {
    marginLeft: 10,
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
  periodItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  selectedPeriodItem: {
    backgroundColor: 'rgb(248, 248,248)',
    borderWidth: 2,
    borderColor: 'black',
  },
  unselectedPeriodItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(225,225,225)',
  },
  calendarTheme: {
    //@ts-ignore
    todayTextColor: 'black',
    dayTextColor: 'black',
    textDayFontFamily: typography.medium,
  },
  itemLabel: {
    fontFamily: typography.medium,
  },
});
