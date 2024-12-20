import Animated, {
  runOnJS,
  withDelay,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, PanResponder, StyleSheet, Text, View} from 'react-native';

import {isIOS} from '../utils/device';
import ReText from '@components/ReText';
import {typography} from '@utils/typography';
import {data} from '@components/verticalScrollBar/data';
import StatusBarManager from '@components/StatusBarManager';
import ListItem from '@components/verticalScrollBar/ListItem';
import {TListItem} from '@components/verticalScrollBar/types';
import {preprocessNames} from '@components/verticalScrollBar/utils';
import {triggerHaptik} from '@components/taskCalendar/MonthListModal';

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
  const currentLetter = useSharedValue('A');

  const listRef = useRef<FlatList>(null);

  const DATA = preprocessNames(data);
  const marginTop = insets.top > 0 ? insets.top : 32;
  const marginBottom = insets.bottom > 0 ? insets.bottom : 32;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove(e, gestureState) {
        const MAX_THRESHOLD =
          ((gestureState.moveY - marginTop - 80) /
            (initialLayoutH.value -
              marginTop -
              marginBottom -
              (isIOS ? 72 : 84))) *
          (contentH.value - initialLayoutH.value);

        if (MAX_THRESHOLD > contentH.value - initialLayoutH.value) {
          scrollTo(contentH.value - initialLayoutH.value);
          return;
        } else if (MAX_THRESHOLD < 0) {
          scrollTo(0);
          return;
        }

        scrollTo(
          ((gestureState.moveY - marginTop - 80) /
            (initialLayoutH.value -
              marginTop -
              marginBottom -
              (isIOS ? 72 : 84))) *
            (contentH.value - initialLayoutH.value),
        );
      },
    }),
  ).current;

  const showIndicator = () => {
    indicatorOpacity.value = withTiming(1, {duration: 150});
  };

  const hideIndicator = () => {
    indicatorOpacity.value = withDelay(1000, withTiming(0, {duration: 200}));
  };

  const renderItem = ({item}: {item: TListItem}) => (
    <ListItem
      item={item}
      firstLetterH={firstLetterH}
      restLetterH={restLetterH}
      lastLetterH={lastLetterH}
    />
  );

  const indicator = useAnimatedStyle(() => {
    translateY.value = interpolate(
      scrollOffset.value,
      [
        -250,
        0,
        contentH.value - initialLayoutH.value,
        contentH.value - initialLayoutH.value + 250,
      ],
      [
        0,
        0,
        initialLayoutH.value - marginTop - marginBottom - (isIOS ? 72 : 84),
        initialLayoutH.value -
          marginTop -
          marginBottom -
          (isIOS ? 72 : 84) +
          23,
      ],
    );

    return {
      top: 72,
      opacity: indicatorOpacity.value,
      height: interpolate(
        scrollOffset.value,
        [
          -250,
          0,
          contentH.value - initialLayoutH.value,
          contentH.value - initialLayoutH.value + 250,
        ],
        [21, 42, 42, 21],
        Extrapolation.CLAMP,
      ),
      transform: [{translateY: translateY.value}],
    };
  });

  const formattedText = useDerivedValue(() => {
    const listItems = DATA;

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
          if (currentLetter.value !== item.letter) {
            currentLetter.value = item.letter;
            runOnJS(triggerHaptik)();
          }

          return item.letter;
        }
      }
    } else if (
      scrollOffset.value >= 0 &&
      scrollOffset.value > contentH.value - initialLayoutH.value
    ) {
      return listItems[listItems.length - 1].letter;
    } else if (scrollOffset.value < 0) {
      return listItems[0].letter;
    }

    return '';
  });

  const scrollTo = (e: number) => {
    listRef.current?.scrollToOffset({
      offset: e, //+ translateY.value,
      animated: true,
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
          onScrollBeginDrag={showIndicator}
          onScrollEndDrag={hideIndicator}
          onMomentumScrollBegin={showIndicator}
          onMomentumScrollEnd={hideIndicator}
          onScroll={e => (scrollOffset.value = e.nativeEvent.contentOffset.y)}
          onLayout={e => (initialLayoutH.value = e.nativeEvent.layout.height)}
          onContentSizeChange={(_, height) => (contentH.value = height)}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.padding}
          style={[styles.bg, {marginTop, marginBottom}]}
          ListHeaderComponent={() => (
            <Text style={styles.header}>Contacts</Text>
          )}
          showsVerticalScrollIndicator={false}
        />

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            indicator,
            {marginTop: marginTop},
            styles.indicatorContainer,
          ]}>
          <ReText
            text={formattedText}
            pointerEvents="none"
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
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    lineHeight: 24,
    color: 'white',
    marginBottom: 32,
    fontFamily: typography.bold,
  },
  padding: {
    padding: 16,
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 46,
    right: -16,
    borderRadius: 23,
    backgroundColor: '#01e395',
  },
  indicatorLabel: {
    fontSize: 16,
    color: '#121212',
    right: isIOS ? 6 : 5,
    fontFamily: typography.bold,
  },
});