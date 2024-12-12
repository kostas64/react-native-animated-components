import Animated, {
  withDelay,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {typography} from '@utils/typography';
import {data} from '@components/verticalScrollBar/data';
import StatusBarManager from '@components/StatusBarManager';
import {ListItem} from '@components/verticalScrollBar/types';
import {preprocessNames} from '@components/verticalScrollBar/utils';

const VerticalScrollBarScreen = () => {
  const insets = useSafeAreaInsets();

  const scrollOffset = useSharedValue(0);
  const initialLayoutH = useSharedValue(0);
  const contentH = useSharedValue(0);
  const indicatorOpacity = useSharedValue(0);

  const DATA = preprocessNames(data);
  const marginTop = insets.top > 0 ? insets.top : 32;
  const marginBottom = insets.bottom > 0 ? insets.bottom : 32;

  const showIndicator = () => {
    indicatorOpacity.value = withTiming(1, {duration: 150});
  };

  const hideIndicator = () => {
    indicatorOpacity.value = withDelay(1000, withTiming(0, {duration: 200}));
  };

  const renderItem = ({item}: {item: ListItem}) => {
    return (
      <View
        style={{
          marginBottom: item.isLastOfLetter ? 36 : 0,
          borderColor: '#495057',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
        {item.isFirstOfLetter && (
          <View
            style={{
              paddingBottom: 12,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: '#495057',
            }}>
            <Text
              style={{
                lineHeight: 18,
                fontFamily: typography.bold,
                color: '#6c757d',
              }}>
              {item.letter}
            </Text>
          </View>
        )}
        <View style={{paddingVertical: 12}}>
          <Text
            style={{
              color: 'white',
              fontFamily: typography.medium,
              lineHeight: 18,
            }}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  const indicator = useAnimatedStyle(() => ({
    top: marginTop,
    opacity: indicatorOpacity.value,
    height: interpolate(
      scrollOffset.value,
      [
        -250,
        0,
        contentH.value - initialLayoutH.value,
        contentH.value - initialLayoutH.value + 250,
      ],
      [23, 46, 46, 23],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
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
            initialLayoutH.value - marginTop - marginBottom - 46,
            initialLayoutH.value - marginTop - marginBottom - 46 + 23,
          ],
        ),
      },
    ],
  }));

  const text = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [
        -30,
        0,
        contentH.value - initialLayoutH.value,
        contentH.value - initialLayoutH.value + 30,
      ],
      [0, 1, 1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const formattedText = useDerivedValue(() => {
    if (
      scrollOffset.value >= 0 &&
      scrollOffset.value <= contentH.value - initialLayoutH.value
    ) {
    }
  });

  return (
    <>
      <StatusBarManager barStyle="light" />
      <View style={styles.container}>
        <Animated.FlatList
          data={DATA}
          renderItem={renderItem}
          onScroll={e => (scrollOffset.value = e.nativeEvent.contentOffset.y)}
          onScrollBeginDrag={showIndicator}
          onScrollEndDrag={hideIndicator}
          onMomentumScrollBegin={showIndicator}
          onMomentumScrollEnd={hideIndicator}
          onLayout={e => (initialLayoutH.value = e.nativeEvent.layout.height)}
          onContentSizeChange={(_, height) => (contentH.value = height)}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.padding}
          style={[styles.bg, {marginTop, marginBottom}]}
          ListHeaderComponent={() => (
            <Text style={styles.header}>Contacts</Text>
          )}
          showsVerticalScrollIndicator={false}
        />

        <Animated.View style={[indicator, {marginTop}, styles.indicator]}>
          <Animated.Text style={[text, styles.indicatorText]}>A</Animated.Text>
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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 46,
    right: -16,
    borderRadius: 23,
    backgroundColor: '#01e395',
  },
  indicatorText: {
    right: 6,
    fontSize: 16,
    color: '#121212',
    fontFamily: typography.bold,
  },
});
