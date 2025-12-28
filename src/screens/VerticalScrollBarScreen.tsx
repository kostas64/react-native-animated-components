import {
  View,
  FlatList,
  StyleSheet,
  PanResponder,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Animated, {
  withDelay,
  withTiming,
  withSpring,
  useSharedValue,
  useDerivedValue,
  cancelAnimation,
} from "react-native-reanimated";
import { useRef } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import ReText from "@components/common/ReText";
import { data } from "@components/verticalScrollBar/data";
import { HAPTIC_TYPE, triggerHaptic } from "@utils/haptics";
import ListItem from "@components/verticalScrollBar/ListItem";
import { isIOS, MAX_FONT_UPSCALE_FACTOR } from "@utils/device";
import { TListItem } from "@components/verticalScrollBar/types";
import StatusBarManager from "@components/common/StatusBarManager";
import { preprocessNames } from "@components/verticalScrollBar/utils";
import useAnimatedStyle from "@components/verticalScrollBar/animatedStyles";

const Header = () => <Text style={styles.header}>Contacts</Text>;

const VerticalScrollBarScreen = () => {
  const insets = useSafeAreaInsets();

  const scrollOffset = useSharedValue(0);
  const initialLayoutH = useSharedValue(0);
  const contentH = useSharedValue(0);
  const firstLetterH = useSharedValue(0);
  const lastLetterH = useSharedValue(0);
  const restLetterH = useSharedValue(0);
  const indicatorOpacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isTouching = useSharedValue(false);
  const currentLetter = useSharedValue("A");
  const progressIndicator = useSharedValue(0);

  const listRef = useRef<FlatList>(null);
  let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

  const DATA = preprocessNames(data);
  const marginTop = insets.top > 0 ? insets.top : 32;
  const marginBottom = insets.bottom > 0 ? insets.bottom : 32;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove(_, gestureState) {
        const MAX_THRESHOLD =
          ((gestureState.moveY - marginTop - 80) /
            (initialLayoutH.value -
              marginTop -
              marginBottom -
              (isIOS ? 72 : 84))) *
          (contentH.value - initialLayoutH.value);

        // Case when scrollOfsset is off upper limit
        if (MAX_THRESHOLD > contentH.value - initialLayoutH.value) {
          scrollTo(contentH.value - initialLayoutH.value);
          return;
        }
        // Case when scrollOfsset is off upper limit
        else if (MAX_THRESHOLD < 0) {
          scrollTo(0);
          return;
        }

        scrollTo(
          ((gestureState.moveY - marginTop - 80) /
            (initialLayoutH.value -
              marginTop -
              marginBottom -
              (isIOS ? 72 : 84))) *
            (contentH.value - initialLayoutH.value)
        );
      },
    })
  ).current;

  const showIndicator = () => {
    indicatorOpacity.value = withTiming(1, { duration: 150 });
  };

  const hideIndicator = () => {
    indicatorOpacity.value = withDelay(1000, withTiming(0, { duration: 200 }));
  };

  const renderItem = ({ item }: { item: TListItem }) => (
    <ListItem
      item={item}
      formattedText={formattedText}
      firstLetterH={firstLetterH}
      restLetterH={restLetterH}
      lastLetterH={lastLetterH}
    />
  );

  const { indicator } = useAnimatedStyle({
    translateY,
    scrollOffset,
    indicatorOpacity,
    progressIndicator,
    contentH,
    initialLayoutH,
  });

  const formattedText = useDerivedValue(() => {
    const listItems = DATA;

    // Case when scrollOfsset is inside limits
    if (
      scrollOffset.value >= 0 &&
      scrollOffset.value <= contentH.value - initialLayoutH.value
    ) {
      const scrollPosition = scrollOffset.value;

      let cumulativeOffset = -30;

      for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        const itemHeight =
          item.isFirstOfLetter && item.isLastOfLetter
            ? firstLetterH.value + 36
            : item.isFirstOfLetter
              ? firstLetterH.value
              : item.isLastOfLetter
                ? lastLetterH.value
                : restLetterH.value;

        cumulativeOffset += itemHeight;

        if (scrollPosition + translateY.value - 12 < cumulativeOffset) {
          if (currentLetter.value !== item.letter && scrollOffset.value !== 0) {
            currentLetter.value = item.letter;
            scheduleOnRN(triggerHaptic, HAPTIC_TYPE.SOFT);
          }

          return item.letter;
        }
      }
    }
    // Case when scrollOfsset is off upper limit
    else if (
      scrollOffset.value >= 0 &&
      scrollOffset.value > contentH.value - initialLayoutH.value
    ) {
      return listItems[listItems.length - 1].letter;
    }
    // Case when scrollOfsset is off lower limit
    else if (scrollOffset.value < 0) {
      return listItems[0].letter;
    }

    return "";
  });

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = e.nativeEvent.contentOffset.y;
    clearTimeout(timeout);

    if (!isTouching.value) {
      // Debounce
      timeout = setTimeout(() => {
        cancelAnimation(indicatorOpacity);
        hideIndicator();
      }, 500);
    }
  };

  const ouTouchIndicator = () => {
    isTouching.value = true;
    cancelAnimation(indicatorOpacity);
    showIndicator();
    progressIndicator.value = withSpring(1);
  };

  const onReleaseIndicator = () => {
    isTouching.value = false;
    progressIndicator.value = withSpring(0);

    timeout = setTimeout(() => {
      cancelAnimation(indicatorOpacity);
      hideIndicator();
    }, 500);
  };

  const scrollTo = (e: number) => {
    listRef.current?.scrollToOffset({
      offset: e,
      animated: false,
    });
  };

  return (
    <>
      <StatusBarManager barStyle="light" />
      <View style={styles.container}>
        <Animated.FlatList
          ref={listRef}
          data={DATA}
          scrollEventThrottle={16}
          onScroll={onScroll}
          onScrollBeginDrag={showIndicator}
          onMomentumScrollBegin={showIndicator}
          renderItem={renderItem}
          onLayout={(e) => (initialLayoutH.value = e.nativeEvent.layout.height)}
          onContentSizeChange={(_, height) => (contentH.value = height)}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.padding}
          style={[styles.bg, { marginTop, marginBottom }]}
          ListHeaderComponent={Header}
          showsVerticalScrollIndicator={false}
        />

        {/* Indicator */}
        <Animated.View
          onTouchStart={ouTouchIndicator}
          onTouchEnd={onReleaseIndicator}
          {...panResponder.panHandlers}
          style={[
            indicator,
            { marginTop: marginTop },
            styles.indicatorContainer,
          ]}
        >
          <ReText
            text={formattedText}
            pointerEvents="none"
            maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
            style={styles.indicatorLabel}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default VerticalScrollBarScreen;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.CHINESE_BLACK,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.CHINESE_BLACK,
  },
  header: {
    fontSize: 24,
    lineHeight: 24,
    color: Colors.WHITE,
    marginBottom: 32,
    fontFamily: typography.bold,
  },
  padding: {
    padding: 16,
  },
  indicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 112,
    right: -76,
    borderRadius: 23,
    backgroundColor: Colors.CARIBBEAN_GREEN,
  },
  indicatorLabel: {
    fontSize: 16,
    color: Colors.CHINESE_BLACK,
    right: isIOS ? 36 : 35,
    fontFamily: typography.bold,
  },
});
