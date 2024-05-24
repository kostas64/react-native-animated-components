import {
  Text,
  View,
  Image,
  Platform,
  Keyboard,
  TextInput,
  Pressable,
  ViewStyle,
  Dimensions,
  StyleSheet,
  ImageStyle,
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
import React, {SetStateAction} from 'react';
import {MONTHS} from '@assets/months';
import {COUNTRIES} from '@assets/countries';
import {CalendarList} from 'react-native-calendars';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList} from 'react-native-gesture-handler';
import {CALENDAR_PER} from '@assets/approximatePeriods';
import Octicons from 'react-native-vector-icons/Octicons';
import {SEARCH_COUNTRIES} from '@assets/searchedCountries';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MarkedDates} from 'react-native-calendars/src/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const AnimPressable = Animated.createAnimatedComponent(Pressable);

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const now = new Date();
const MIN_DATE = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

type TSearchItem = {
  place: string;
  date: string;
  guests: number;
};

type TPickerItem = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

type TCounterBtn = {
  isPlus?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

type TItemCounter = {
  label: string;
  subLabel: string;
  subLabelStyle?: (ViewStyle | ImageStyle)[];
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
  extraOnPress?: (val: number) => void;
  disabledLeft?: boolean;
};

type TStartDate = {
  dateString?: string;
  timestamp?: string;
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
        <Text style={styles.subtitle}>{date}</Text>
        <Text style={styles.subtitle}>{` • ${guests} guests`}</Text>
      </View>
    </View>
  </View>
);

const PickerItem = ({label, onPress, style}: TPickerItem) => (
  <Pressable onPress={onPress} style={[styles.pickerItem, style]}>
    <Text style={styles.fontW500}>{label}</Text>
  </Pressable>
);

const CounterBtn = ({isPlus, onPress, disabled}: TCounterBtn) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    activeOpacity={0.75}
    style={[disabled && styles.opa3, styles.counterBtnContainer]}>
    <Entypo
      size={18}
      color={'rgb(150,150,150)'}
      name={isPlus ? 'plus' : 'minus'}
    />
  </TouchableOpacity>
);

const ItemCounter = ({
  label,
  subLabel,
  subLabelStyle,
  value,
  setValue,
  extraOnPress,
  disabledLeft,
}: TItemCounter) => (
  <View
    style={[
      styles.row,
      styles.justifyBtn,
      styles.alignCenter,
      styles.itemCounterContainer,
    ]}>
    <View>
      <Text style={styles.font16}>{label}</Text>
      <Text style={[styles.subtitle, subLabelStyle, styles.marTop4]}>
        {subLabel}
      </Text>
    </View>
    <View style={[styles.row, styles.alignCenter]}>
      <CounterBtn
        isPlus={false}
        disabled={value <= 0 || disabledLeft}
        onPress={() => {
          setValue((old: number) => old - 1);
        }}
      />
      <Text
        style={[
          styles.fontW500,
          styles.font16,
          styles.textCenter,
          {minWidth: value < 10 ? 30 : 36},
        ]}>
        {value}
      </Text>
      <CounterBtn
        isPlus
        onPress={() => {
          setValue((old: number) => {
            !!extraOnPress && extraOnPress(old + 1);
            return old + 1;
          });
        }}
      />
    </View>
  </View>
);

const Airbnb = () => {
  const insets = useSafeAreaInsets();

  const progress = useSharedValue(0);
  const progresWhen = useSharedValue(0);
  const progressWhereTo = useSharedValue(0);
  const closeWhen = useSharedValue(0);
  const openWho = useSharedValue(0);
  const translatePicker = useSharedValue(0);

  const inputRef = React.createRef<TextInput>();
  const calendarPerRef = React.createRef<FlatList>();
  const [showModal, setShowModal] = React.useState(true);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [country, setCountry] = React.useState(COUNTRIES[0].label);
  const [period, setPeriod] = React.useState(CALENDAR_PER[0]);
  const [anyWeek, setAnyWeek] = React.useState('');
  const [adults, setAdults] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [inflants, setInflants] = React.useState(0);
  const [pets, setPets] = React.useState(0);

  const [startDate, setStartDate] = React.useState<TStartDate>({});
  const [endDate, setEndDate] = React.useState({});
  const [periodo, setPeriodo] = React.useState<MarkedDates>({});

  const top = insets.top > 40 ? insets.top : 30;
  const bottom = insets.bottom > 30 ? insets.bottom : 0;
  const bottomHeight = height > 800 ? 100 : 48 + (insets.bottom || 24);
  const extraHeight = height <= 685 ? 10 : 0;
  const numOfGuests = adults + children;
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
    if (openWho.value > 0 && progress.value > 0 && progresWhen.value > 0) {
      return {};
    }

    if (openWho.value > 0) {
      return {
        opacity: interpolate(
          openWho.value,
          [0, 0.5],
          [1, 0],
          Extrapolate.CLAMP,
        ),
      };
    }

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
        [67, height - bottom - 186],
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

  const opacityWhoToStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 0.85, 1], [0, 0, 1]),
      height: interpolate(
        openWho.value,
        [0, 0.8],
        [67, height + extraHeight - top - bottomHeight - 230],
        Extrapolate.CLAMP,
      ),
    };
  }, []);

  const opacityWhen = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progresWhen.value,
        [0, 0.25],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    }),
    [],
  );

  const opacityWhenRevStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progresWhen.value,
        [0.5, 1],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    }),
    [],
  );

  const opacityOpenWhoStyle = useAnimatedStyle(() => {
    if (openWho.value > 0 && progresWhen.value > 0 && progress.value > 0) {
      return {
        opacity: 1,
      };
    }

    if (openWho.value > 0) {
      return {
        opacity: interpolate(openWho.value, [0, 1], [0, 1]),
      };
    }

    return {
      opacity: interpolate(progresWhen.value, [0, 1], [0, 1]),
    };
  }, []);

  const opacityOpenWhoRevStyle = useAnimatedStyle(() => {
    if (openWho.value > 0) {
      return {
        opacity: interpolate(openWho.value, [0, 1], [1, 0]),
      };
    }

    return {};
  }, []);

  const opacityOpenWhoNormalStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(openWho.value, [0.5, 1], [0, 1], Extrapolate.CLAMP),
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
    if (openWho.value > 0 && progress.value > 0 && progresWhen.value > 0) {
      return {
        height: 67,
        width: width - 30,
        borderRadius: 16,
        transform: [{translateX: -10}, {translateY: 48}],
      };
    }

    if (openWho.value > 0) {
      return {
        height: interpolate(
          openWho.value,
          [0, 0.8],
          [330, 67],
          Extrapolate.CLAMP,
        ),
        width: interpolate(
          openWho.value,
          [0, 0.8],
          [width - 24, width - 30],
          Extrapolate.CLAMP,
        ),
        borderRadius: interpolate(
          openWho.value,
          [0, 0.8],
          [32, 16],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              openWho.value,
              [0, 0.8],
              [-12, -10],
              Extrapolate.CLAMP,
            ),
          },
          {translateY: 48},
        ],
      };
    }

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

  const bottomStyle = useAnimatedStyle(
    () => ({
      bottom: interpolate(progress.value, [0, 1], [-bottomHeight, 0]),
    }),
    [],
  );

  const bottomStyleWhereFocused = useAnimatedStyle(() => {
    if (openWho.value > 0 && progresWhen.value > 0 && progress.value > 0) {
      return {
        bottom: -bottomHeight - 10,
      };
    }

    if (openWho.value > 0 && progress.value > 0) {
      return {
        bottom: 0,
      };
    }

    if (progresWhen.value > 0) {
      return {
        bottom: interpolate(progresWhen.value, [0, 1], [0, -bottomHeight - 10]),
      };
    }

    if (progressWhereTo.value > 0) {
      return {
        bottom: interpolate(
          progressWhereTo.value,
          [0, 1],
          [0, -bottomHeight - 10],
        ),
      };
    }

    return {};
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

  const animateOpenWho = () => {
    openWho.value = withTiming(1, {duration: 450});
  };

  const animateWhen = React.useCallback(() => {
    const toValue = progresWhen.value === 1 ? 0 : 1;
    progresWhen.value = withTiming(toValue, {duration: 450});

    if (openWho.value === 1) {
      openWho.value = withTiming(0, {duration: 450});
    } else if (progresWhen.value === 1) {
      openWho.value = withTiming(1, {duration: 450});
    }
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

  const renderPeriodItem = React.useCallback(
    ({item, index}: {item: string; index: number}) => {
      const isSelected = period === item;

      return (
        <Pressable
          onPress={() => {
            setPeriod(item);
            calendarPerRef.current?.scrollToIndex({
              index,
              animated: true,
              viewOffset: 24,
            });
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
          <Text>{item}</Text>
        </Pressable>
      );
    },
    [period],
  );

  const onPressSkipReset = React.useCallback(() => {
    if (Object.keys(periodo).length > 0) {
      setPeriodo({});
      setAnyWeek('');
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

  const getDateString = (timestamp: string) => {
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
  };

  const getPeriod = (startTimestamp: string, endTimestamp: string) => {
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
  };

  const setDay = (dayObj: {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  }) => {
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
  };

  React.useEffect(() => {
    if (!showModal) {
      progress.value = 0;
      progresWhen.value = 0;
      progressWhereTo.value = 0;
      closeWhen.value = 0;
      openWho.value = 0;
      translatePicker.value = 0;

      setTimeout(() => {
        setCountry(COUNTRIES[0].label);
        setPeriod(CALENDAR_PER[0]);
        setPeriodo({});
        setAnyWeek('');
        setAdults(0);
        setChildren(0);
        setInflants(0);
        setPets(0);
        setShowModal(true);
      }, 1);
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
              ]}>
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
                  openWho.value = withTiming(0);
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
                      opacityOpenWhoStyle,
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
                <Text style={styles.fontW500}>
                  {anyWeek ? anyWeek : 'Any week'}
                </Text>
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
                  minDate={MIN_DATE}
                  pastScrollRange={0}
                  markingType={'period'}
                  futureScrollRange={3}
                  calendarWidth={width - 48}
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
                  style={[styles.marLeft10, {height: height - top - 464}]}
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
                  <Pressable
                    onPress={onPressSkipReset}
                    style={styles.skipResetBtn}>
                    <Text
                      style={[
                        styles.font16,
                        styles.fontW500,
                        styles.underline,
                      ]}>
                      {Object.keys(periodo).length === 0 ? 'Skip' : 'Reset'}
                    </Text>
                  </Pressable>
                  <Pressable style={styles.nextBtn} onPress={onPressNext}>
                    <Text
                      style={[styles.font16, styles.fontW500, styles.white]}>
                      Next
                    </Text>
                  </Pressable>
                </View>
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
            <Animated.View
              style={[
                styles.overflow,
                styles.otherBox,
                styles.marTop12,
                opacityWhoToStyle,
                opacityClose,
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
                <Text style={styles.fontW500}>
                  {guestsToShow ? guestsToShow : 'Add guests'}
                </Text>
              </AnimPressable>
              <Animated.View
                style={[
                  styles.absolute,
                  styles.padTop24,
                  opacityOpenWhoNormalStyle,
                ]}>
                <Text
                  style={[
                    styles.boldWhere,
                    height > 685 && height < 750
                      ? styles.marBot24
                      : height > 750
                      ? styles.marBot36
                      : styles.marBot16,
                    styles.padLeft24,
                  ]}>
                  Who's coming?
                </Text>

                <ItemCounter
                  disabledLeft={
                    adults === 1 && (pets > 0 || inflants > 0 || children > 0)
                  }
                  label={'Adults'}
                  subLabel={'Ages 13 or above'}
                  value={adults}
                  setValue={setAdults}
                />
                <View style={styles.divider} />
                <ItemCounter
                  value={children}
                  setValue={setChildren}
                  label={'Children'}
                  subLabel={'Ages 2-12'}
                  extraOnPress={(child: number) => {
                    if (child === 1 && adults === 0) {
                      setAdults(1);
                    }
                  }}
                />
                <View style={styles.divider} />
                <ItemCounter
                  value={inflants}
                  setValue={setInflants}
                  label={'Inflants'}
                  subLabel={'Under 2'}
                  extraOnPress={(infl: number) => {
                    if (infl === 1 && adults === 0) {
                      setAdults(1);
                    }
                  }}
                />
                <View style={styles.divider} />
                <ItemCounter
                  value={pets}
                  setValue={setPets}
                  extraOnPress={(petsValue: number) => {
                    if (petsValue === 1 && adults === 0) {
                      setAdults(1);
                    }
                  }}
                  label={'Pets'}
                  subLabel={'Bringing a service animal?'}
                  subLabelStyle={[styles.fontW600, styles.underline]}
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
    color: 'rgb(75,75,75)',
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
  padHor12: {
    paddingHorizontal: 12,
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
  divider: {
    height: 1,
    marginVertical: 16,
    width: width - 80,
    alignSelf: 'center',
    backgroundColor: 'rgb(200,200,200)',
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
  marTop4: {
    marginTop: 4,
  },
  marTop8: {
    marginTop: 8,
  },
  marTop10: {
    marginTop: 10,
  },
  marTop12: {
    marginTop: 12,
  },
  marTop16: {
    marginTop: 16,
  },
  marBot10: {
    marginBottom: 10,
  },
  marBot16: {
    marginBottom: 16,
  },
  marBot24: {
    marginBottom: 24,
  },
  marBot36: {
    marginBottom: 36,
  },
  fontW500: {
    fontWeight: '500',
  },
  fontW600: {
    fontWeight: '600',
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
    textDayFontFamily: isIOS ? null : 'sans-serif-medium',
    textDayFontWeight: isIOS ? '500' : null,
  },
  headerCalendar: {
    flex: 1,
    alignItems: 'flex-start',
    left: -12,
    marginBottom: 12,
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
  borderLine: {
    height: 1,
    backgroundColor: 'rgb(210,210,210)',
    width: width - 32,
  },
  height74: {
    height: 74,
  },
  skipResetBtn: {
    alignSelf: 'center',
    padding: 10,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  nextBtn: {
    backgroundColor: '#222222',
    alignSelf: 'center',
    paddingHorizontal: 46,
    paddingVertical: 14,
    borderRadius: 8,
  },
  textCenter: {
    textAlign: 'center',
  },
  itemCounterContainer: {
    width: width - 80,
    marginHorizontal: 24,
  },
  counterBtnContainer: {
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgb(150,150,150)',
    borderRadius: 50,
  },
  opa3: {
    opacity: 0.3,
  },
});
