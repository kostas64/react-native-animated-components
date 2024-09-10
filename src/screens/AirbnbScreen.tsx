import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {MarkedDates} from 'react-native-calendars/src/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, View, TextInput, Pressable, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {HEIGHT, WIDTH} from '@utils/device';
import {typography} from '@utils/typography';
import Footer from '@components/airbnb/Footer';
import WhereTo from '@components/airbnb/WhereTo';
import WhenTrip from '@components/airbnb/WhenTrip';
import WhoComing from '@components/airbnb/WhoComing';
import InitialBox from '@components/airbnb/InitialBox';
import InitialView from '@components/airbnb/InitialView';
import {TStartDate, TDayObject} from '@components/airbnb/types';
import {getAnimatedStyles} from '@components/airbnb/animatedStyles';
import {_MS_PER_DAY, CALENDAR_PER, COUNTRIES} from '@components/airbnb/data';

const AnimPressable = Animated.createAnimatedComponent(Pressable);

const Airbnb = () => {
  const insets = useSafeAreaInsets();

  const progress = useSharedValue(0);
  const progresWhen = useSharedValue(0);
  const progressWhereTo = useSharedValue(0);
  const closeWhen = useSharedValue(0);
  const openWho = useSharedValue(0);
  const translatePicker = useSharedValue(0);
  const openCloseWho = useSharedValue(0);

  const inputRef = React.createRef<TextInput>();
  const [showModal, setShowModal] = React.useState(true);
  const [country, setCountry] = React.useState(COUNTRIES[0].label);
  const [period, setPeriod] = React.useState(CALENDAR_PER[0]);
  const [anyWeek, setAnyWeek] = React.useState('Any week');
  const [adults, setAdults] = React.useState(0);
  const [childs, setChilds] = React.useState(0);
  const [inflants, setInflants] = React.useState(0);
  const [pets, setPets] = React.useState(0);

  const [startDate, setStartDate] = React.useState<TStartDate>({});
  const [endDate, setEndDate] = React.useState({});
  const [periodo, setPeriodo] = React.useState<MarkedDates>({});

  const top = insets.top > 40 ? insets.top : 30;
  const bottom = insets.bottom > 30 ? insets.bottom : 0;
  const bottomHeight = HEIGHT > 800 ? 100 : 48 + (insets.bottom || 24);
  const extraHeight = HEIGHT <= 685 ? 10 : 0;
  const numOfGuests = adults + childs;
  const guestsToShow = `${
    numOfGuests === 1
      ? `${numOfGuests} guest`
      : numOfGuests > 1
      ? `${numOfGuests} guests`
      : ''
  }${
    inflants === 1
      ? `, ${inflants} inflant`
      : inflants > 1
      ? `, ${inflants} inflants`
      : ''
  }${pets === 1 ? `, ${pets} pet` : pets > 1 ? `, ${pets} pets` : ''}`;

  const {
    opacityStyle,
    opacityInputStyle,
    opacityWhereToStyle,
    opacityWhereToBold,
    opacityWhenToStyle,
    arrowAnimStyle,
    opacityWhenClose,
    opacityClose,
    opacityWhoToStyle,
    opacityWhen,
    opacityWhenRevStyle,
    opacityOpenWhoStyle,
    opacityOpenWhoRevStyle,
    opacityOpenWhoNormalStyle,
    opacityCloseWhenInput,
    opacityOpenWhoClose,
    opacityOpenWhoCloseRev,
    translateClose,
    translateCloseWhen,
    translateCloseWhere,
    transformCloseWhen,
    transformOpenWhoClose,
    listOpacityTranslate,
    listSearchStyle,
    inputStyle,
    inputWhereToFocused,
    innerInputWhereToFocused,
    bottomStyle,
    bottomStyleWhereFocused,
    translatePickerStyle,
  } = getAnimatedStyles(
    progress,
    progresWhen,
    progressWhereTo,
    openWho,
    openCloseWho,
    closeWhen,
    translatePicker,
    top,
    bottom,
    bottomHeight,
    extraHeight,
    insets,
  );

  const animateOpen = React.useCallback(() => {
    progress.value = withTiming(1, {duration: 450});
  }, [showModal]);

  const animateClose = React.useCallback(() => {
    if (progress.value && openWho.value) {
      openCloseWho.value = withTiming(1, {duration: 450}, finished => {
        if (finished) {
          runOnJS(setShowModal)(false);
        }
      });
    } else if (progress.value && progresWhen.value) {
      closeWhen.value = withTiming(1, {duration: 450}, finished => {
        if (finished) {
          runOnJS(setShowModal)(false);
        }
      });
    } else {
      progress.value = withTiming(0, {duration: 450}, finished => {
        if (finished) {
          runOnJS(setShowModal)(false);
        }
      });
    }
  }, [showModal]);

  const animateWhereToInput = () => {
    inputRef.current?.focus();
    progressWhereTo.value = withTiming(1);
  };

  const animateWhereToInputClose = () => {
    inputRef.current?.blur();
    progressWhereTo.value = withTiming(0);
  };

  const animateOpenWho = React.useCallback(() => {
    openWho.value = withTiming(1, {duration: 450});
  }, []);

  const animateWhen = React.useCallback(() => {
    const toValue = progresWhen.value === 1 ? 0 : 1;
    progresWhen.value = withTiming(toValue, {duration: 450});

    if (openWho.value === 1) {
      openWho.value = withTiming(0, {duration: 450});
    } else if (progresWhen.value === 1) {
      openWho.value = withTiming(1, {duration: 450});
    }
  }, [progresWhen]);

  const onPressWhereTo = React.useCallback(() => {
    animateOpen();
    progresWhen.value = withTiming(0);
    progressWhereTo.value = withTiming(0);
    openWho.value = withTiming(0);
  }, []);

  const onPressClear = React.useCallback(() => {
    onPressWhereTo();
    resetValues();
  }, [country, anyWeek, adults, childs, inflants, pets, period]);

  const resetValues = () => {
    country !== "I'm flexible" && setCountry("I'm flexible");
    anyWeek !== 'Any week' && setAnyWeek('Any week');
    period !== CALENDAR_PER[0] && setPeriod(CALENDAR_PER[0]);
    setPeriodo({});
    adults !== 0 && setAdults(0);
    childs !== 0 && setChilds(0);
    inflants !== 0 && setInflants(0);
    pets !== 0 && setPets(0);
  };

  const onPressSkipReset = React.useCallback(() => {
    if (Object.keys(periodo).length > 0) {
      setPeriodo({});
      setAnyWeek('Any week');
    } else {
      animateWhen();
    }
  }, [periodo]);

  const onPressNext = React.useCallback(() => {
    if (Object.keys(periodo).length > 0) {
      let week = '';
      if (Object.keys(periodo).length === 1) {
        const date = new Date(Object.keys(periodo)?.[0]);
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        week = `${day} ${month}`;
      } else {
        const stDate = new Date(Object.keys(periodo)?.[0]);
        const endDate = new Date(
          Object.keys(periodo)?.[Object.keys(periodo)?.length - 1],
        );
        const stDay = stDate.getDate();
        const stMonth = stDate.toLocaleString('default', {month: 'long'});
        const endDay = endDate.getDate();
        const endMonth = endDate.toLocaleString('default', {month: 'long'});
        const monthsEqual = stMonth === endMonth;
        week = !monthsEqual
          ? `${stDay} ${stMonth} - ${endDay} ${endMonth}`
          : `${stDay}-${endDay} ${stMonth}`;
      }

      setAnyWeek(week);
    }

    animateWhen();
  }, [periodo]);

  const getDateString = React.useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let dateString = `${year}-`;

    if (month < 10) {
      dateString += `0${month}-`;
    } else {
      dateString += `${month}-`;
    }

    if (day < 10) {
      dateString += `0${day}`;
    } else {
      dateString += day;
    }

    return dateString;
  }, []);

  const getPeriod = React.useCallback(
    (startTimestamp: string, endTimestamp: string) => {
      const period: MarkedDates = {};

      let currentTimestamp: string = startTimestamp;

      while (currentTimestamp < endTimestamp) {
        if (currentTimestamp === startTimestamp) {
          const dateString = getDateString(currentTimestamp);
          period[dateString] = {
            color: '#222222',
            textColor: 'white',
            startingDay: currentTimestamp === startTimestamp,
          };
        } else {
          const dateString = getDateString(currentTimestamp);
          period[dateString] = {
            color: 'rgb(225,225,225)',
            startingDay: currentTimestamp === startTimestamp,
          };
        }

        currentTimestamp += _MS_PER_DAY;
      }
      const dateString = getDateString(endTimestamp);
      period[dateString] = {
        color: '#222222',
        textColor: 'white',
        endingDay: true,
      };

      return period;
    },
    [],
  );

  const setDay = React.useCallback(
    (dayObj: TDayObject) => {
      const {dateString, day, month, year} = dayObj;
      // timestamp returned by dayObj is in 12:00AM UTC 0, want local 12:00AM
      const timestamp = new Date(year, month - 1, day).getTime();
      const newDayObj = {...dayObj, timestamp};
      // if there is no start day, add start. or if there is already a end and start date, restart
      const startIsEmpty = Object.keys(startDate).length === 0;
      const endIsEmpty = Object.keys(endDate).length === 0;

      const dayCalendarProps = {
        color: '#222222',
        textColor: 'white',
        endingDay: true,
        startingDay: true,
      };

      if (dayObj?.dateString === startDate?.dateString) {
        if (!endDate) {
          return;
        }

        const period: MarkedDates = {
          [dateString]: dayCalendarProps,
        };

        //@ts-ignore
        setStartDate(newDayObj);
        setPeriodo(period);
        setEndDate({});

        return;
      }

      if (startIsEmpty || (!startIsEmpty && !endIsEmpty)) {
        const period: MarkedDates = {
          [dateString]: dayCalendarProps,
        };

        //@ts-ignore
        setStartDate(newDayObj);
        setPeriodo(period);
        setEndDate({});
      } else {
        // if end date is older than start date switch
        const {timestamp: savedTimestamp} = startDate;

        //@ts-ignore
        if (savedTimestamp > timestamp) {
          const period: MarkedDates = {
            [dateString]: dayCalendarProps,
          };

          //@ts-ignore
          setStartDate(newDayObj);
          setPeriodo(period);
          // !!setMarkedPeriod && endDate && setMarkedPeriod(period);
          setEndDate({});
        } else {
          //@ts-ignore
          const period: MarkedDates = getPeriod(savedTimestamp, timestamp);
          setStartDate(startDate);
          setPeriodo(period);
          // !!setMarkedPeriod && endDate && setMarkedPeriod(period);
          setEndDate(newDayObj);
        }
      }
    },
    [startDate, endDate],
  );

  React.useEffect(() => {
    if (!showModal) {
      progress.value = 0;
      progresWhen.value = 0;
      progressWhereTo.value = 0;
      closeWhen.value = 0;
      openWho.value = 0;
      openCloseWho.value = 0;
      translatePicker.value = 0;

      setTimeout(() => {
        resetValues();
        setShowModal(true);
      }, 1);
    }
  }, [showModal]);

  return (
    <>
      {!showModal && <InitialView />}
      {showModal && (
        <>
          <View style={[styles.padHor24, styles.flex, {paddingTop: top}]}>
            <View style={styles.container}>
              <AnimPressable
                onPress={onPressWhereTo}
                style={[
                  styles.leftInput,
                  styles.overflow,
                  inputStyle,
                  opacityClose,
                  opacityOpenWhoCloseRev,
                  inputWhereToFocused,
                  translateCloseWhere,
                ]}>
                <Animated.View
                  style={[
                    styles.row,
                    styles.absolute,
                    styles.padTop12Left16,
                    opacityInputStyle,
                  ]}>
                  <InitialBox />
                </Animated.View>

                <Animated.View style={[opacityWhereToStyle, styles.padTop16]}>
                  <WhereTo
                    ref={inputRef}
                    country={country}
                    setCountry={setCountry}
                    animateWhen={animateWhen}
                    animateWhereToInput={animateWhereToInput}
                    listSearchStyle={listSearchStyle}
                    listOpacityTranslate={listOpacityTranslate}
                    opacityWhereToBold={opacityWhereToBold}
                    opacityOpenWhoStyle={opacityOpenWhoStyle}
                    innerInputWhereToFocused={innerInputWhereToFocused}
                  />
                </Animated.View>
              </AnimPressable>
            </View>
            <Animated.View
              style={[
                opacityInputStyle,
                styles.filterContainer,
                styles.absolute,
                {right: 24, top: top + 10},
              ]}>
              <Octicons name="filter" size={20} style={styles.top1} />
            </Animated.View>
            <Animated.View
              style={[
                styles.otherBox,
                styles.overflow,
                opacityWhenToStyle,
                opacityOpenWhoCloseRev,
                transformCloseWhen,
              ]}>
              <AnimPressable
                onPress={animateWhen}
                style={[
                  opacityWhen,
                  styles.row,
                  styles.justifyBtn,
                  styles.absolute,
                  styles.alignCenter,
                  styles.whenAnyWeek,
                ]}>
                <Text style={[styles.fontW500, styles.color100]}>When</Text>
                <Text style={[styles.fontW500, styles.value]}>{anyWeek}</Text>
              </AnimPressable>
              <Animated.View
                style={[
                  styles.absolute,
                  styles.padTop24,
                  opacityWhenRevStyle,
                  opacityWhenClose,
                ]}>
                <WhenTrip
                  onPressNext={onPressNext}
                  onPressSkipReset={onPressSkipReset}
                  period={period}
                  periodo={periodo}
                  setDay={setDay}
                  setPeriod={setPeriod}
                  translatePicker={translatePicker}
                  translatePickerStyle={translatePickerStyle}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.row,
                  styles.absolute,
                  styles.padTop12Left16,
                  opacityCloseWhenInput,
                ]}>
                <InitialBox />
              </Animated.View>
            </Animated.View>
            <Animated.View
              style={[
                styles.overflow,
                styles.otherBox,
                styles.marTop12,
                opacityWhoToStyle,
                opacityClose,
                transformOpenWhoClose,
              ]}>
              <AnimPressable
                onPress={animateOpenWho}
                style={[
                  styles.row,
                  styles.justifyBtn,
                  styles.absolute,
                  styles.alignCenter,
                  styles.whenAnyWeek,
                  opacityOpenWhoRevStyle,
                ]}>
                <Text style={[styles.fontW500, styles.color100]}>Who</Text>
                <Text style={[styles.fontW500, styles.value]}>
                  {guestsToShow ? guestsToShow : 'Add guests'}
                </Text>
              </AnimPressable>
              <Animated.View
                style={[
                  styles.row,
                  styles.absolute,
                  styles.padTop12Left16,
                  opacityOpenWhoClose,
                ]}>
                <InitialBox />
              </Animated.View>
              <Animated.View
                style={[
                  styles.absolute,
                  styles.padTop24,
                  opacityOpenWhoNormalStyle,
                ]}>
                <WhoComing
                  pets={pets}
                  adults={adults}
                  childs={childs}
                  inflants={inflants}
                  setPets={setPets}
                  setAdults={setAdults}
                  setChilds={setChilds}
                  setInflants={setInflants}
                />
              </Animated.View>
            </Animated.View>

            <Animated.View
              style={[
                styles.absolute,
                styles.bottomContainer,
                bottomStyle,
                bottomStyleWhereFocused,
              ]}>
              <Footer animateClose={animateClose} onPressClear={onPressClear} />
            </Animated.View>
          </View>
          {/* Arrow left button */}
          <AnimPressable
            style={[
              styles.absolute,
              {top: top - 24},
              styles.closeContainer,
              arrowAnimStyle,
              translateClose,
              styles.marLeft24,
            ]}
            onPress={animateWhereToInputClose}>
            <MaterialCommunityIcons name={'arrow-left'} size={16} />
          </AnimPressable>
          {/* Close button */}
          <AnimPressable
            style={[
              styles.absolute,
              {top: top - 24},
              styles.closeContainer,
              opacityStyle,
              translateClose,
              translateCloseWhen,
              styles.marLeft24,
            ]}
            onPress={animateClose}>
            <MaterialCommunityIcons name={'close'} size={16} />
          </AnimPressable>
        </>
      )}
    </>
  );
};

export default Airbnb;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  justifyBtn: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  overflow: {
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    paddingVertical: 12,
    borderRadius: 32,
  },
  whereTo: {
    fontFamily: typography.medium,
    color: 'black',
  },
  filterContainer: {
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeContainer: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: 'center',
    borderColor: '#e3e3e3',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  padHor24: {
    paddingHorizontal: 24,
  },
  padTop16: {
    paddingTop: 16,
  },
  padTop24: {
    paddingTop: 24,
  },
  padTop12Left16: {
    paddingTop: 12,
    paddingLeft: 16,
  },
  marLeft24: {
    marginLeft: 24,
  },
  marTop12: {
    marginTop: 12,
  },
  fontW500: {
    fontWeight: '500',
  },
  otherBox: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderColor: '#e9e9e9',
    backgroundColor: 'white',
    marginTop: 60,
    width: WIDTH - 30,
    left: -10,
  },
  white: {
    color: 'white',
  },
  color100: {
    color: 'rgb(100,100,100)',
    fontFamily: typography.medium,
  },
  bottomContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
  },
  top1: {
    top: 1,
  },
  whenAnyWeek: {
    width: '100%',
    alignSelf: 'center',
    height: 64,
    zIndex: 1000,
  },
  value: {
    fontFamily: typography.semiBold,
  },
});
