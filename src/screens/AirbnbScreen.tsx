import React, { useCallback } from "react";
import Feather from "@expo/vector-icons/Feather";
import { scheduleOnRN } from "react-native-worklets";
import { View, TextInput, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CalendarActiveDateRange } from "@marceloterreiro/flash-calendar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { withTiming, useSharedValue } from "react-native-reanimated";

import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { SHORT_MONTHS } from "@assets/months";
import { typography } from "@utils/typography";
import Footer from "@components/airbnb/Footer";
import WhereTo from "@components/airbnb/WhereTo";
import WhenTrip from "@components/airbnb/WhenTrip";
import WhoComing from "@components/airbnb/WhoComing";
import InitialBox from "@components/airbnb/InitialBox";
import InitialView from "@components/airbnb/InitialView";
import { CALENDAR_PER, COUNTRIES } from "@components/airbnb/data";
import StatusBarManager from "@components/common/StatusBarManager";
import { useAnimatedStyles } from "@components/airbnb/animatedStyles";
import { HEIGHT, MED_FONT_UPSCALE_FACTOR, WIDTH } from "@utils/device";
import { AnimatedPressable } from "@components/common/AnimatedComponents";

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
  const [anyWeek, setAnyWeek] = React.useState("Any week");
  const [adults, setAdults] = React.useState(0);
  const [childs, setChilds] = React.useState(0);
  const [inflants, setInflants] = React.useState(0);
  const [pets, setPets] = React.useState(0);

  const [periodo, setPeriodo] = React.useState<CalendarActiveDateRange>({});

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
        : ""
  }${
    inflants === 1
      ? `, ${inflants} inflant`
      : inflants > 1
        ? `, ${inflants} inflants`
        : ""
  }${pets === 1 ? `, ${pets} pet` : pets > 1 ? `, ${pets} pets` : ""}`;

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
  } = useAnimatedStyles(
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
    insets
  );

  const animateOpen = React.useCallback(() => {
    progress.value = withTiming(1, { duration: 450 });
  }, [progress]);

  const animateClose = React.useCallback(() => {
    if (progress.value && openWho.value) {
      openCloseWho.value = withTiming(1, { duration: 450 }, (finished) => {
        if (finished) {
          scheduleOnRN(setShowModal, false);
        }
      });
    } else if (progress.value && progresWhen.value) {
      closeWhen.value = withTiming(1, { duration: 450 }, (finished) => {
        if (finished) {
          scheduleOnRN(setShowModal, false);
        }
      });
    } else {
      progress.value = withTiming(0, { duration: 450 }, (finished) => {
        if (finished) {
          scheduleOnRN(setShowModal, false);
        }
      });
    }
  }, [closeWhen, openCloseWho, openWho, progress, progresWhen]);

  const animateWhereToInput = () => {
    inputRef.current?.focus();
    progressWhereTo.value = withTiming(1);
  };

  const animateWhereToInputClose = () => {
    inputRef.current?.blur();
    progressWhereTo.value = withTiming(0);
  };

  const animateOpenWho = React.useCallback(() => {
    openWho.value = withTiming(1, { duration: 450 });
  }, [openWho]);

  const animateWhen = React.useCallback(() => {
    const toValue = progresWhen.value === 1 ? 0 : 1;
    progresWhen.value = withTiming(toValue, { duration: 450 });

    if (openWho.value === 1) {
      openWho.value = withTiming(0, { duration: 450 });
    } else if (progresWhen.value === 1) {
      openWho.value = withTiming(1, { duration: 450 });
    }
  }, [progresWhen, openWho]);

  const onPressWhereTo = React.useCallback(() => {
    animateOpen();
    progresWhen.value = withTiming(0);
    progressWhereTo.value = withTiming(0);
    openWho.value = withTiming(0);
  }, [animateOpen, openWho, progresWhen, progressWhereTo]);

  const resetValues = useCallback(() => {
    country !== "I'm flexible" && setCountry("I'm flexible");
    anyWeek !== "Any week" && setAnyWeek("Any week");
    period !== CALENDAR_PER[0] && setPeriod(CALENDAR_PER[0]);
    setPeriodo({});
    adults !== 0 && setAdults(0);
    childs !== 0 && setChilds(0);
    inflants !== 0 && setInflants(0);
    pets !== 0 && setPets(0);
  }, [
    adults,
    anyWeek,
    childs,
    inflants,
    pets,
    period,
    country,
    setAdults,
    setAnyWeek,
    setChilds,
    setCountry,
    setInflants,
    setPets,
    setPeriod,
    setPeriodo,
  ]);

  const onPressClear = React.useCallback(() => {
    onPressWhereTo();
    resetValues();
  }, [onPressWhereTo, resetValues]);

  const onPressSkipReset = React.useCallback(
    (shouldReset = false) => {
      if (shouldReset) {
        setPeriodo({});
        setAnyWeek("Any week");
      } else {
        animateWhen();
      }
    },
    [animateWhen]
  );

  const onPressNext = React.useCallback(() => {
    if (!!periodo.startId || !!periodo.endId) {
      let week = "";
      if (
        !!periodo.startId &&
        !!periodo.endId &&
        periodo.startId !== periodo.endId
      ) {
        const isSameYear =
          new Date(periodo.startId).getFullYear() ===
          new Date(periodo.endId).getFullYear();

        const isSameMonth =
          new Date(periodo.startId).getMonth() ===
            new Date(periodo.endId).getMonth() && isSameYear;

        week =
          isSameMonth && isSameYear
            ? `${new Date(periodo.startId).getDate()}-${new Date(
                periodo.endId
              ).getDate()} ${
                SHORT_MONTHS[new Date(periodo.startId).getMonth()]
              }`
            : isSameYear
              ? `${new Date(periodo.startId).getDate()} ${
                  SHORT_MONTHS[new Date(periodo.startId).getMonth()]
                } - ${new Date(periodo.endId).getDate()} ${
                  SHORT_MONTHS[new Date(periodo.endId).getMonth()]
                }`
              : `${new Date(periodo.startId).getDate()} ${
                  SHORT_MONTHS[new Date(periodo.startId).getMonth()]
                } ${new Date(periodo.startId).getFullYear()} - ${new Date(
                  periodo.endId
                ).getDate()} ${
                  SHORT_MONTHS[new Date(periodo.endId).getMonth()]
                } ${new Date(periodo.endId).getFullYear()}`;
      } else if (periodo.startId) {
        week = `${new Date(periodo.startId).getDate()} ${
          SHORT_MONTHS[new Date(periodo.startId).getMonth()]
        }`;
      }

      setAnyWeek(week);
    }

    animateWhen();
  }, [periodo, animateWhen]);

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
  }, [
    showModal,
    closeWhen,
    openCloseWho,
    openWho,
    progress,
    progresWhen,
    progressWhereTo,
    translatePicker,
    resetValues,
  ]);

  return (
    <>
      <StatusBarManager />
      {!showModal && <InitialView />}
      {showModal && (
        <>
          <View style={[styles.padHor24, styles.flex, { paddingTop: top }]}>
            <View style={styles.container}>
              <AnimatedPressable
                onPress={onPressWhereTo}
                style={[
                  styles.leftInput,
                  styles.overflow,
                  inputStyle,
                  opacityClose,
                  opacityOpenWhoCloseRev,
                  inputWhereToFocused,
                  translateCloseWhere,
                ]}
              >
                <Animated.View
                  style={[
                    styles.row,
                    styles.absolute,
                    styles.padTop12Left16,
                    opacityInputStyle,
                  ]}
                >
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
              </AnimatedPressable>
            </View>
            <Animated.View
              style={[
                opacityInputStyle,
                styles.filterContainer,
                styles.absolute,
                styles.right24,
                { top: top + 10 },
              ]}
            >
              <Feather name="sliders" size={18} style={styles.top1} />
            </Animated.View>
            <Animated.View
              style={[
                styles.otherBox,
                styles.overflow,
                opacityWhenToStyle,
                opacityOpenWhoCloseRev,
                transformCloseWhen,
              ]}
            >
              <AnimatedPressable
                onPress={animateWhen}
                style={[
                  opacityWhen,
                  styles.row,
                  styles.justifyBtn,
                  styles.absolute,
                  styles.alignCenter,
                  styles.whenAnyWeek,
                ]}
              >
                <Text
                  style={[styles.fontW500, styles.color100]}
                  maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
                >
                  When
                </Text>
                <Text
                  style={[styles.fontW500, styles.value]}
                  maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
                >
                  {anyWeek}
                </Text>
              </AnimatedPressable>
              <Animated.View
                style={[
                  styles.absolute,
                  styles.padTop24,
                  opacityWhenRevStyle,
                  opacityWhenClose,
                ]}
              >
                <WhenTrip
                  onPressNext={onPressNext}
                  onPressSkipReset={onPressSkipReset}
                  period={period}
                  setPeriodo={setPeriodo}
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
                ]}
              >
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
              ]}
            >
              <AnimatedPressable
                onPress={animateOpenWho}
                style={[
                  styles.row,
                  styles.justifyBtn,
                  styles.absolute,
                  styles.alignCenter,
                  styles.whenAnyWeek,
                  opacityOpenWhoRevStyle,
                ]}
              >
                <Text
                  style={[styles.fontW500, styles.color100]}
                  maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
                >
                  Who
                </Text>
                <Text
                  style={[styles.fontW500, styles.value]}
                  maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
                >
                  {guestsToShow ? guestsToShow : "Add guests"}
                </Text>
              </AnimatedPressable>
              <Animated.View
                style={[
                  styles.row,
                  styles.absolute,
                  styles.padTop12Left16,
                  opacityOpenWhoClose,
                ]}
              >
                <InitialBox />
              </Animated.View>
              <Animated.View
                style={[
                  styles.absolute,
                  styles.padTop24,
                  opacityOpenWhoNormalStyle,
                ]}
              >
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
              ]}
            >
              <Footer animateClose={animateClose} onPressClear={onPressClear} />
            </Animated.View>
          </View>
          {/* Arrow left button */}
          <AnimatedPressable
            style={[
              styles.absolute,
              { top: top - 24 },
              styles.closeContainer,
              arrowAnimStyle,
              translateClose,
              styles.marLeft24,
            ]}
            onPress={animateWhereToInputClose}
          >
            <MaterialCommunityIcons name={"arrow-left"} size={16} />
          </AnimatedPressable>
          {/* Close button */}
          <AnimatedPressable
            style={[
              styles.absolute,
              { top: top - 24 },
              styles.closeContainer,
              opacityStyle,
              translateClose,
              translateCloseWhen,
              styles.marLeft24,
            ]}
            onPress={animateClose}
          >
            <MaterialCommunityIcons name={"close"} size={16} />
          </AnimatedPressable>
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
    flexDirection: "row",
  },
  justifyBtn: {
    justifyContent: "space-between",
  },
  alignCenter: {
    alignItems: "center",
  },
  overflow: {
    overflow: "hidden",
  },
  absolute: {
    position: "absolute",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftInput: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BRIGHT_GRAY,
    paddingVertical: 12,
    borderRadius: 32,
  },
  filterContainer: {
    borderColor: Colors.QUICK_SILVER,
    borderWidth: 1,
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  closeContainer: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    borderColor: Colors.PLATINUM,
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
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
    fontWeight: "500",
  },
  otherBox: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderColor: Colors.BRIGHT_GRAY,
    backgroundColor: Colors.WHITE,
    marginTop: 60,
    width: WIDTH - 30,
    left: -10,
  },
  color100: {
    color: Colors.GRANITE_GRAY,
    fontFamily: typography.medium,
  },
  bottomContainer: {
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: Colors.PLATINUM,
  },
  top1: {
    top: 1,
    transform: [{ rotate: "90deg" }],
  },
  whenAnyWeek: {
    width: "100%",
    alignSelf: "center",
    height: 64,
    zIndex: 1000,
  },
  value: {
    fontFamily: typography.semiBold,
  },
  right24: {
    right: 24,
  },
});
