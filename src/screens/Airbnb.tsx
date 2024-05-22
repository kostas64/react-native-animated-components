import {
  Text,
  View,
  Image,
  Platform,
  Keyboard,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  runOnJS,
  withTiming,
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import React from 'react';
import {MONTHS} from '@assets/months';
import {COUNTRIES} from '@assets/countries';
import {CalendarList} from 'react-native-calendars';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList} from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';
import {SEARCH_COUNTRIES} from '@assets/searchedCountries';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const AnimPressable = Animated.createAnimatedComponent(Pressable);

type TSearchItem = {
  place: string;
  date: string;
  guests: number;
};

type TRenderCountryItem = {
  item: {img: ImageSourcePropType; label: string};
  index: number;
};

type TRenderSearchItem = {
  item: {place: string; guests: number; date: string};
  index: number;
};

const SearchItem = ({place, date, guests}: TSearchItem) => (
  <View style={[styles.row, styles.alignCenter, styles.marBot24]}>
    <View style={styles.searchClockContainer}>
      <AntDesign name="clockcircleo" size={25} color={'black'} />
    </View>
    <View>
      <View style={styles.row}>
        <Text style={styles.font17}>{place}</Text>
        <Text style={styles.font17}> • Stays</Text>
      </View>
      <View style={[styles.row, styles.marTop4]}>
        <Text style={styles.searchItemSub}>{date}</Text>
        <Text style={styles.searchItemSub}>{` • ${guests} guests`}</Text>
      </View>
    </View>
  </View>
);

const Airbnb = () => {
  const insets = useSafeAreaInsets();

  const progress = useSharedValue(0);
  const progresWhen = useSharedValue(0);
  const progressWhereTo = useSharedValue(0);
  const closeWhen = useSharedValue(0);
  const translatePicker = useSharedValue(0);

  const inputRef = React.createRef<TextInput>();
  const [showModal, setShowModal] = React.useState(false);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [country, setCountry] = React.useState(COUNTRIES[0].label);

  const top = insets.top > 24 ? insets.top : 40;

  const opacityStyle = useAnimatedStyle(
    () => ({opacity: interpolate(progress.value, [0, 0.8], [0, 1])}),
    [],
  );

  const opacityInputStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.1, 0.5, 0.8], [1, 1, 0, 0]),
    }),
    [],
  );

  const opacityWhereToStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.25, 0.8], [0, 0, 1]),
    }),
    [],
  );

  const opacityWhereToBold = useAnimatedStyle(() => {
    if (progresWhen.value > 0) {
      return {
        opacity: interpolate(
          progresWhen.value,
          [0, 0.5],
          [1, 0],
          Extrapolate.CLAMP,
        ),
      };
    }

    return {
      opacity: interpolate(
        progressWhereTo.value,
        [0, 0.5],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  }, []);

  const opacityWhenToStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.75, 1], [0, 0, 1]),
      height: interpolate(
        progresWhen.value,
        [0, 1],
        [67, height - insets.bottom - 186],
      ),
      marginBottom: interpolate(progresWhen.value, [0, 1], [0, 64]),
    }),
    [],
  );

  const opacityWhenClose = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(closeWhen.value, [0, 0.5, 1], [1, 0, 0]),
      };
    }

    return {};
  });

  const opacityClose = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(
          closeWhen.value,
          [0, 0.15],
          [1, 0],
          Extrapolate.CLAMP,
        ),
      };
    } else {
      return {};
    }
  }, []);

  const opacityWhoToStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.85, 1], [0, 0, 1]),
    }),
    [],
  );

  const opacityWhen = useAnimatedStyle(
    () => ({
      opacity: interpolate(progresWhen.value, [0, 1], [1, 0]),
    }),
    [],
  );

  const opacityWhenRevStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progresWhen.value, [0, 1], [0, 1]),
    }),
    [],
  );

  const opacityCloseWhenInput = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(closeWhen.value, [0, 1], [0, 1]),
      };
    }

    return {
      opacity: 0,
    };
  });

  const translateClose = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 0.75],
            [0, 24],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const translateCloseWhen = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: interpolate(
          closeWhen.value,
          [0, 1],
          [1, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {translateY: interpolate(closeWhen.value, [0, 1], [24, 0])},
        ],
      };
    } else {
      return {};
    }
  });

  const translateCloseWhere = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        transform: [
          {translateX: interpolate(closeWhen.value, [0.15, 0.16], [0, -width])},
        ],
      };
    } else {
      return {};
    }
  }, []);

  const transformCloseWhen = useAnimatedStyle(() => {
    if (closeWhen.value > 0) {
      return {
        opacity: 1,
        height: interpolate(
          closeWhen.value,
          [0, 1],
          [height - insets.bottom - 186, 60],
        ),
        borderRadius: interpolate(closeWhen.value, [0, 1], [16, 32]),
        width: interpolate(closeWhen.value, [0, 1], [width - 24, width - 100]),
        marginTop: interpolate(closeWhen.value, [0, 1], [60, 0]),
        top: interpolate(closeWhen.value, [0, 1], [0, -67]),
        transform: [
          {translateX: interpolate(closeWhen.value, [0, 1], [0, 10])},
        ],
      };
    } else {
      return {};
    }
  }, []);

  const listOpacityTranslate = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progressWhereTo.value,
        [0, 0.25],
        [1, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            progressWhereTo.value,
            [0.25, 0.251],
            [0, -width],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const listSearchStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progressWhereTo.value,
        [0, 0.25],
        [0, 1],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            progressWhereTo.value,
            [0, 0.01],
            [-width, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  const inputStyle = useAnimatedStyle(() => {
    if (progresWhen.value > 0) {
      return {
        height: interpolate(
          progresWhen.value,
          [0, 0.8],
          [330, 67],
          Extrapolate.CLAMP,
        ),
        width: interpolate(
          progresWhen.value,
          [0, 0.8],
          [width - 24, width - 30],
          Extrapolate.CLAMP,
        ),
        borderRadius: interpolate(
          progresWhen.value,
          [0, 0.8],
          [32, 16],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              progresWhen.value,
              [0, 0.8],
              [-12, -10],
              Extrapolate.CLAMP,
            ),
          },
          {translateY: 48},
        ],
      };
    }

    return {
      height: interpolate(
        progress.value,
        [0, 0.8],
        [60, 330],
        Extrapolate.CLAMP,
      ),
      width: interpolate(
        progress.value,
        [0, 0.8],
        [width - 100, width - 24],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 0.8],
            [0, -12],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            progress.value,
            [0, 0.8],
            [0, 48],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, []);

  const inputWhereToFocused = useAnimatedStyle(() => {
    if (progress.value !== 1) {
      return {};
    }

    return {
      height: interpolate(progressWhereTo.value, [0, 1], [330, height]),
      width: interpolate(progressWhereTo.value, [0, 1], [width - 24, width]),
      transform: [
        {translateX: interpolate(progressWhereTo.value, [0, 1], [-12, -24])},
        {
          translateY: interpolate(
            progress.value,
            [0, 0.8],
            [0, 48],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, []);

  const innerInputWhereToFocused = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progressWhereTo.value,
      [0, 1],
      ['rgb(161,161,161)', 'rgb(247,247,247)'],
    ),
    backgroundColor: interpolateColor(
      progressWhereTo.value,
      [0, 1],
      ['rgb(255,255,255)', 'rgb(247,247,247)'],
    ),
    width: interpolate(progressWhereTo.value, [0, 1], [width - 72, width - 48]),
    transform: [
      {translateY: interpolate(progressWhereTo.value, [0, 1], [0, -60])},
    ],
  }));

  const bottomStyle = useAnimatedStyle(() => {
    const bottomHeight = height > 800 ? 100 : 48 + (insets.bottom || 24);

    return {
      bottom: interpolate(progress.value, [0, 1], [-bottomHeight, 0]),
    };
  }, []);

  const bottomStyleWhereFocused = useAnimatedStyle(() => {
    const bottomHeight = height > 800 ? 100 : 48 + (insets.bottom || 24);

    if (progresWhen.value > 0) {
      return {
        bottom: interpolate(progresWhen.value, [0, 1], [0, -bottomHeight - 10]),
      };
    }

    return {
      bottom: interpolate(
        progressWhereTo.value,
        [0, 1],
        [0, -bottomHeight - 10],
      ),
    };
  }, []);

  const translatePickerStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            translatePicker.value,
            [0, 1, 2],
            [0, (width - 90) / 3, 2 * ((width - 90) / 3)],
          ),
        },
      ],
    }),
    [],
  );

  const animateOpen = React.useCallback(() => {
    progress.value = withTiming(1, {duration: 450});
  }, [showModal]);

  const animateClose = React.useCallback(() => {
    if (progresWhen.value && progress.value) {
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

  React.useEffect(() => {
    if (!showModal) {
      progress.value = 0;
      progresWhen.value = 0;
      progressWhereTo.value = 0;
      closeWhen.value = 0;
      translatePicker.value = 0;
    }
  }, [showModal]);

  const animateWhereToInput = () => {
    inputRef.current?.focus();
    setInputFocused(true);
    progressWhereTo.value = withTiming(1);
  };

  const animateWhereToInputClose = () => {
    inputRef.current?.blur();
    setInputFocused(false);
    progressWhereTo.value = withTiming(0);
  };

  const animateWhen = React.useCallback(() => {
    const toValue = progresWhen.value === 1 ? 0 : 1;
    progresWhen.value = withTiming(toValue);
  }, [progresWhen]);

  const renderItem = React.useCallback(
    ({item, index}: TRenderCountryItem) => {
      const isSelected = item.label === country;

      return (
        <TouchableOpacity
          activeOpacity={0.75}
          key={`country-${index}`}
          onPress={() => {
            setCountry(item.label);
            animateWhen();
          }}
          style={[
            styles.mapImgContainer,
            {
              paddingRight: index === COUNTRIES.length - 1 ? 24 : 16,
              paddingLeft: index === 0 ? 24 : 0,
            },
          ]}>
          {/* @ts-ignore */}
          <Image
            borderRadius={8}
            source={item.img}
            style={[
              styles.mapImg,
              isSelected ? styles.borderBlackW2 : styles.borderGreyW1,
            ]}
          />
          <Text style={[styles.marTop8, isSelected && styles.fontW500]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [country],
  );

  const renderSearchItem = React.useCallback(
    ({item, index}: TRenderSearchItem) => (
      <SearchItem
        key={`searchItem-${index}`}
        date={item.date}
        guests={item.guests}
        place={item.place}
      />
    ),
    [],
  );

  const generateMonthObjectUpToToday = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Adjust month + 1
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based
    const currentDay = currentDate.getDate();

    const monthObject = {};

    for (let day = 1; day <= daysInMonth; day++) {
      //@ts-ignore
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        day, //@ts-ignore
      ).padStart(2, '0')}`; // Adjust month + 1

      if (
        year < currentYear ||
        (year === currentYear && month + 1 < currentMonth) ||
        (year === currentYear && month + 1 === currentMonth && day < currentDay)
      ) {
        //@ts-ignore
        monthObject[dateKey] = {disabled: true};
      }
    }

    return monthObject;
  };

  React.useEffect(() => {
    if (showModal) {
      animateOpen();
    }
  }, [showModal]);

  return (
    <>
      {!showModal && (
        <View style={[styles.padHor24, {paddingTop: top}]}>
          <View style={styles.container}>
            <Pressable
              style={[
                styles.leftInput,
                styles.row,
                styles.initialDim,
                styles.padHor16,
              ]}
              onPress={() => setShowModal(true)}>
              <Entypo name="magnifying-glass" size={24} style={styles.lens} />
              <View>
                <Text style={styles.whereTo}>Where to?</Text>
                <Text style={styles.subtitle}>
                  Anywhere • Any week • Add guests
                </Text>
              </View>
            </Pressable>
            <View style={styles.filterContainer}>
              <Octicons name="filter" size={20} style={styles.top1} />
            </View>
          </View>
        </View>
      )}
      {showModal && (
        <>
          <View style={[styles.padHor24, styles.flex, {paddingTop: top}]}>
            <View style={styles.container}>
              <AnimPressable
                onPress={() => {
                  animateOpen();
                  progresWhen.value = withTiming(0);
                  progressWhereTo.value = withTiming(0);
                }}
                style={[
                  styles.leftInput,
                  styles.overflow,
                  inputStyle,
                  opacityClose,
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
                  <Entypo
                    size={24}
                    style={styles.lens}
                    name="magnifying-glass"
                  />
                  <View>
                    <Text style={styles.whereTo}>Where to?</Text>
                    <Text style={styles.subtitle}>
                      Anywhere • Any week • Add guests
                    </Text>
                  </View>
                </Animated.View>

                <Animated.View style={[opacityWhereToStyle, styles.padTop16]}>
                  <Animated.Text
                    style={[
                      styles.boldWhere,
                      styles.padLeft24,
                      opacityWhereToBold,
                    ]}>
                    Where to?
                  </Animated.Text>
                  <Animated.View
                    style={[
                      styles.absolute,
                      styles.row,
                      styles.justifyBtn,
                      styles.widthPadTop12,
                      opacityWhenRevStyle,
                    ]}>
                    <Text
                      style={[
                        styles.fontW500,
                        styles.color100,
                        styles.padLeft24,
                      ]}>
                      Where
                    </Text>
                    <Text style={styles.fontW500}>{country}</Text>
                  </Animated.View>
                  <AnimPressable
                    onPress={animateWhereToInput}
                    style={[
                      styles.row,
                      styles.inputContainer,
                      styles.marLeft24,
                      innerInputWhereToFocused,
                    ]}>
                    <Entypo
                      size={20}
                      style={styles.lens2}
                      name="magnifying-glass"
                    />
                    <TextInput
                      ref={inputRef}
                      style={[styles.fontW500]}
                      onFocus={animateWhereToInput}
                      placeholder="Search destinations"
                      placeholderTextColor={'rgb(100,100,100)'}
                    />
                  </AnimPressable>
                  <Animated.FlatList
                    horizontal
                    data={COUNTRIES}
                    renderItem={renderItem}
                    style={listOpacityTranslate}
                    showsHorizontalScrollIndicator={false}
                  />
                  <Animated.View
                    style={[
                      styles.marLeft24,
                      styles.searchListContainer,
                      listSearchStyle,
                      {height: height - top - insets.bottom - 156},
                    ]}>
                    <Text
                      style={[styles.marBot24, styles.fontW500, styles.font16]}>
                      Recent searches
                    </Text>
                    <FlatList
                      data={SEARCH_COUNTRIES}
                      renderItem={renderSearchItem}
                      onScroll={() => Keyboard.dismiss()}
                      showsVerticalScrollIndicator={false}
                    />
                  </Animated.View>
                </Animated.View>
              </AnimPressable>
            </View>
            <Animated.View
              style={[styles.otherBox, opacityWhenToStyle, transformCloseWhen]}>
              <AnimPressable
                onPress={animateWhen}
                style={[
                  styles.row,
                  styles.justifyBtn,
                  opacityWhen,
                  styles.absolute,
                  styles.alignCenter,
                  styles.whenAnyWeek,
                ]}>
                <Text style={[styles.fontW500, styles.color100]}>When</Text>
                <Text style={styles.fontW500}>Any week</Text>
              </AnimPressable>
              <Animated.View
                style={[
                  styles.absolute,
                  styles.padTop24,
                  opacityWhenRevStyle,
                  opacityWhenClose,
                ]}>
                <Text style={[styles.boldWhere, styles.padLeft24]}>
                  When's your trip?
                </Text>
                <View style={styles.pickerContainer}>
                  <Animated.View
                    style={[
                      styles.absolute,
                      translatePickerStyle,
                      styles.pickerPose,
                    ]}
                  />
                  <Pressable
                    onPress={() => {
                      translatePicker.value = withTiming(0);
                    }}
                    style={[styles.pickerItem, styles.marLeft6]}>
                    <Text style={styles.fontW500}>Dates</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      translatePicker.value = withTiming(1);
                    }}
                    style={styles.pickerItem}>
                    <Text style={styles.fontW500}>Months</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      translatePicker.value = withTiming(2);
                    }}
                    style={styles.pickerItem}>
                    <Text style={styles.fontW500}>Flexible</Text>
                  </Pressable>
                </View>
                <View
                  style={[styles.row, styles.justifyBtn, styles.daysContainer]}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((item, key) => (
                    <Text
                      key={`day-${key}`}
                      style={{color: 'rgb(125,125,125)'}}>
                      {item}
                    </Text>
                  ))}
                </View>

                <CalendarList
                  firstDay={1}
                  hideDayNames
                  pastScrollRange={0}
                  futureScrollRange={3}
                  calendarWidth={width - 48}
                  calendarHeight={280}
                  markedDates={generateMonthObjectUpToToday()}
                  //@ts-ignore
                  theme={styles.calendarTheme}
                  renderHeader={date => (
                    <View style={styles.headerCalendar}>
                      <Text style={[styles.fontW500, styles.font16]}>{`${
                        MONTHS[date.getMonth()]
                      } ${date.getFullYear()}`}</Text>
                    </View>
                  )}
                  style={[
                    styles.marLeft10,
                    {height: height - top - insets.bottom - 380},
                  ]}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.row,
                  styles.absolute,
                  styles.padTop12Left16,
                  opacityCloseWhenInput,
                ]}>
                <Entypo size={24} style={styles.lens} name="magnifying-glass" />
                <View>
                  <Text style={styles.whereTo}>Where to?</Text>
                  <Text style={styles.subtitle}>
                    Anywhere • Any week • Add guests
                  </Text>
                </View>
              </Animated.View>
            </Animated.View>
            <AnimPressable
              style={[
                styles.otherBox,
                styles.marTop12,
                opacityWhoToStyle,
                opacityClose,
              ]}>
              <View style={[styles.row, styles.justifyBtn]}>
                <Text style={[styles.fontW500, styles.color100]}>Who</Text>
                <Text style={styles.fontW500}>Add guests</Text>
              </View>
            </AnimPressable>
            <Animated.View
              style={[
                styles.absolute,
                styles.bottomContainer,
                bottomStyle,
                bottomStyleWhereFocused,
              ]}>
              <View
                style={[
                  styles.row,
                  styles.justifyBtn,
                  styles.padHor24,
                  styles.marTop4,
                  styles.widthCenter,
                  {
                    paddingBottom: insets.bottom,
                    height: height > 800 ? 100 : 48 + (insets.bottom || 24),
                  },
                ]}>
                <Text style={[styles.fontW500, styles.clearAll]}>
                  Clear all
                </Text>
                <View
                  style={[styles.row, styles.searchBtn, styles.alignCenter]}>
                  <Entypo
                    size={20}
                    style={styles.lens3}
                    name="magnifying-glass"
                  />
                  <Text style={[styles.white, styles.fontW500]}>Search</Text>
                </View>
              </View>
            </Animated.View>
          </View>
          <View style={[styles.absolute, {top: top - 24}]}>
            <AnimPressable
              style={[
                styles.closeContainer,
                opacityStyle,
                translateClose,
                translateCloseWhen,
                styles.marLeft24,
              ]}
              onPress={inputFocused ? animateWhereToInputClose : animateClose}>
              <MaterialCommunityIcons
                name={inputFocused ? 'arrow-left' : 'close'}
                size={16}
              />
            </AnimPressable>
          </View>
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
  initialDim: {
    height: 60,
    width: width - 100,
  },
  leftInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    paddingVertical: 12,
    borderRadius: 32,
  },
  lens: {
    paddingTop: 4,
    paddingRight: 12,
    color: 'black',
  },
  lens2: {
    paddingRight: 20,
    color: 'black',
  },
  lens3: {
    paddingRight: 8,
    color: 'white',
  },
  whereTo: {
    fontWeight: '500',
    color: 'black',
  },
  subtitle: {
    color: '#a1a1a1',
    fontSize: 12,
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
  boldWhere: {
    fontSize: 28,
    fontWeight: '700',
  },
  inputContainer: {
    marginTop: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: isIOS ? 20 : 6,
    paddingHorizontal: 20,
    width: width - 72,
  },
  padHor16: {
    paddingHorizontal: 16,
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
  padLeft24: {
    paddingLeft: 24,
  },
  padTop12Left16: {
    paddingTop: 12,
    paddingLeft: 16,
  },
  marLeft24: {
    marginLeft: 24,
  },
  marLeft6: {
    marginLeft: 6,
  },
  marLeft10: {
    marginLeft: 10,
  },
  marTop12: {
    marginTop: 12,
  },
  marTop16: {
    marginTop: 16,
  },
  marBot24: {
    marginBottom: 24,
  },
  marTop4: {
    marginTop: 4,
  },
  marTop8: {
    marginTop: 8,
  },
  fontW500: {
    fontWeight: '500',
  },
  font16: {
    fontSize: 16,
  },
  font17: {
    fontSize: 17,
  },
  mapImgContainer: {
    borderRadius: 8,
    marginTop: 16,
  },
  mapImg: {
    width: 116,
    height: 116,
  },
  borderBlackW2: {
    borderWidth: 2,
    borderColor: 'black',
  },
  borderGreyW1: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  otherBox: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderColor: '#e9e9e9',
    backgroundColor: 'white',
    marginTop: 60,
    width: width - 30,
    left: -10,
  },
  clearAll: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  searchBtn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#e51d51',
  },
  white: {
    color: 'white',
  },
  color100: {
    color: 'rgb(100,100,100)',
  },
  widthCenter: {
    width,
    alignItems: 'center',
  },
  searchListContainer: {
    position: 'absolute',
    top: 104,
    width,
  },
  searchClockContainer: {
    padding: 16,
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: 10,
    marginRight: 16,
  },
  searchItemSub: {
    fontSize: 12,
    color: 'rgb(125,125,125)',
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
  widthPadTop12: {
    width: width - 56,
    paddingTop: 12,
  },
  pickerContainer: {
    height: 45,
    width: width - 78,
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
    width: (width - 90) / 3,
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
  pickerItem: {
    width: (width - 89) / 3,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  daysContainer: {
    marginLeft: 40,
    marginRight: 16,
    marginVertical: 16,
  },
  calendarTheme: {
    //@ts-ignore
    todayTextColor: 'black',
    dayTextColor: 'black',
    textDayFontWeight: '500',
  },
  headerCalendar: {
    flex: 1,
    alignItems: 'flex-start',
    left: -12,
    marginBottom: 12,
  },
});
