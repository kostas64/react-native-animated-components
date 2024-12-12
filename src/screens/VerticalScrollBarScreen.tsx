import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {typography} from '@utils/typography';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StatusBarManager from '@components/StatusBarManager';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

const data: string[] = [
  'Alice',
  'Andrew',
  'Amelia',
  'Adam',
  'Bella',
  'Benjamin',
  'Blake',
  'Brianna',
  'Charlotte',
  'Daniel',
  'Ethan',
  'Emily',
  'Evan',
  'Eleanor',
  'Faith',
  'Felix',
  'Fiona',
  'Frederick',
  'Gabriel',
  'Gavin',
  'Georgia',
  'Harper',
  'Hudson',
  'Isaac',
  'Isla',
  'Ivy',
  'Ian',
  'James',
  'Julia',
  'Katherine',
  'Kyle',
  'Kayla',
  'Kevin',
  'Liam',
  'Lily',
  'Lucas',
  'Mason',
  'Noah',
  'Natalie',
  'Penelope',
  'Ryan',
  'Rachel',
  'Riley',
  'Rebecca',
  'Samuel',
  'Thomas',
  'Tessa',
  'Ulysses',
  'Victoria',
  'Vincent',
  'William',
  'Xena',
  'Yvonne',
  'Yosef',
  'Yasmin',
  'Zoe',
];

type ListItem = {
  name: string;
  isFirstOfLetter: boolean;
  isLastOfLetter: boolean;
  letter: string;
};

const preprocessNames = (names: string[]): ListItem[] => {
  const processedNames: ListItem[] = [];
  const letterGroups: Record<string, string[]> = {};

  // Group names by their starting letter
  names.forEach(name => {
    const firstLetter = name[0].toUpperCase();
    if (!letterGroups[firstLetter]) {
      letterGroups[firstLetter] = [];
    }
    letterGroups[firstLetter].push(name);
  });

  // Flatten the grouped names and mark first/last
  Object.entries(letterGroups).forEach(([letter, group]) => {
    group.forEach((name, index) => {
      processedNames.push({
        name,
        letter,
        isFirstOfLetter: index === 0,
        isLastOfLetter: index === group.length - 1,
      });
    });
  });

  return processedNames;
};

const VerticalScrollBarScreen = () => {
  const insets = useSafeAreaInsets();

  const scrollOffset = useSharedValue(0);
  const initialLayoutH = useSharedValue(0);
  const contentH = useSharedValue(0);
  const parentRef = useRef<View>(null);
  const listRef = useAnimatedRef<FlatList>();

  const marginTop = insets.top > 0 ? insets.top : 32;
  const marginBottom = insets.bottom > 0 ? insets.bottom : 32;

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
      <View ref={parentRef} style={styles.container}>
        <Animated.FlatList
          ref={listRef}
          onScroll={e => (scrollOffset.value = e.nativeEvent.contentOffset.y)}
          data={preprocessNames(data)}
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
          style={[
            indicator,
            {marginTop},
            {
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              width: 46,
              right: -16,
              borderRadius: 23,
              backgroundColor: '#01e395',
            },
          ]}>
          <Animated.Text
            style={[
              text,
              {
                right: 4,
                fontSize: 16,
                color: '#121212',
                fontFamily: typography.bold,
              },
            ]}>
            A
          </Animated.Text>
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
});
