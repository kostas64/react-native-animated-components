import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Keyboard,
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
import {COUNTRIES} from '@assets/countries';
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

const SearchItem = ({
  place,
  date,
  guests,
}: {
  place: string;
  date: string;
  guests: number;
}) => (
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
  const progressWhereTo = useSharedValue(0);

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

  const opacityWhereToBold = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progressWhereTo.value,
        [0, 0.5],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    }),
    [],
  );

  const opacityWhenToStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.75, 1], [0, 0, 1]),
    }),
    [],
  );

  const opacityWhoToStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, [0, 0.85, 1], [0, 0, 1]),
    }),
    [],
  );

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

  const listOpacityTranslate = useAnimatedStyle(() => {
    return {
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
    };
  }, []);

  const listSearchStyle = useAnimatedStyle(() => ({
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
  }));

  const inputStyle = useAnimatedStyle(
    () => ({
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
    }),
    [],
  );

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

    return {
      bottom: interpolate(
        progressWhereTo.value,
        [0, 1],
        [0, -bottomHeight - 10],
      ),
    };
  }, []);

  const animateOpen = React.useCallback(() => {
    progress.value = withTiming(1, {duration: 450});
  }, [showModal]);

  const animateClose = React.useCallback(() => {
    progress.value = withTiming(0, {duration: 450}, finished => {
      if (finished) {
        runOnJS(setShowModal)(false);
      }
    });
  }, [showModal]);

  const animateWhereToInput = React.useCallback(() => {
    inputRef.current?.focus();
    setInputFocused(true);
    progressWhereTo.value = withTiming(1);
  }, [inputFocused]);

  const animateWhereToInputClose = React.useCallback(() => {
    inputRef.current?.blur();
    setInputFocused(false);
    progressWhereTo.value = withTiming(0);
  }, [inputFocused]);

  const renderItem = React.useCallback(
    ({
      item,
      index,
    }: {
      item: {img: ImageSourcePropType; label: string};
      index: number;
    }) => {
      const isSelected = item.label === country;

      return (
        <TouchableOpacity
          activeOpacity={0.75}
          key={`country-${index}`}
          onPress={() => setCountry(item.label)}
          style={[
            styles.mapImgContainer,
            {
              paddingRight: index === COUNTRIES.length - 1 ? 24 : 16,
              paddingLeft: index === 0 ? 24 : 0,
            },
          ]}>
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

  const renderSearchItem = ({
    item,
    index,
  }: {
    item: {place: string; guests: number; date: string};
    index: number;
  }) => (
    <SearchItem
      key={`searchItem-${index}`}
      date={item.date}
      guests={item.guests}
      place={item.place}
    />
  );

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
              <Animated.View
                style={[
                  styles.leftInput,
                  styles.overflow,
                  inputStyle,
                  inputWhereToFocused,
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
              </Animated.View>
            </View>
            <Animated.View
              style={[styles.row, styles.otherBox, opacityWhenToStyle]}>
              <Text style={[styles.fontW500, styles.color100]}>When</Text>
              <Text style={styles.fontW500}>Any week</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.row,
                styles.otherBox,
                styles.marTop12,
                opacityWhoToStyle,
              ]}>
              <Text style={[styles.fontW500, styles.color100]}>Who</Text>
              <Text style={styles.fontW500}>Add guests</Text>
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
    elevation: 7,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
    justifyContent: 'space-between',
    marginTop: 64,
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
});
