import {FlatList, StyleSheet} from 'react-native';
import {forwardRef, useImperativeHandle, useRef} from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import Text from '@components/Text';
import {typography} from '@utils/typography';
import {ListRefProps, TChooseOption} from './types';
import {WHEEL_OPTIONS} from '@screens/LotteryScreen';
import ChooseOptionListItem from './ChooseOptionListItem';

const ChooseOption = forwardRef<ListRefProps, TChooseOption>(
  ({style, selectedO, spinning, selectOption}, ref) => {
    const listRef = useRef<FlatList>(null);

    const renderItem = ({item, index}: {item: number; index: number}) => (
      <ChooseOptionListItem
        item={item}
        index={index}
        spinning={spinning}
        selectedO={selectedO}
        selectOption={selectOption}
      />
    );

    const disabledStyle = useAnimatedStyle(() => ({
      opacity: spinning.value
        ? withTiming(0.6, {duration: 250})
        : withTiming(1, {duration: 125}),
      pointerEvents: spinning.value ? 'none' : 'auto',
    }));

    useImperativeHandle(ref, () => ({
      animateList: (index: number) => {
        listRef?.current?.scrollToIndex({
          index,
          animated: true,
          viewOffset: -index * 16 + 12,
        });
      },
    }));

    const getItemLayout = (_: any, index: number) => ({
      index,
      length: 86,
      offset: 86 * index,
    });

    return (
      <Animated.View style={[styles.container, disabledStyle, style]}>
        <Text style={styles.title}>Do you feel lucky?</Text>
        <FlatList
          ref={listRef}
          horizontal
          data={WHEEL_OPTIONS}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={styles.containerStyle}
        />
      </Animated.View>
    );
  },
);

ChooseOption.displayName = 'ChooseOption';

export default ChooseOption;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.33)',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: typography.semiBold,
  },
  containerStyle: {
    gap: 16,
    marginTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  optionContainer: {
    width: 86,
    alignItems: 'center',
    backgroundColor: '#7a54cd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  pressed: {
    opacity: 0.6,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: 'white',
  },
  unselectedBorder: {
    borderWidth: 2,
    borderColor: '#7a54cd',
  },
});
