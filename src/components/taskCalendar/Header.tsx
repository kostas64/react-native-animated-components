import Animated, {
  FadeInDown,
  useSharedValue,
  LinearTransition,
} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {THeader} from './types';
import Calendar from './Calendar';
import MenuIcon from './MenuIcon';
import MonthPicker from './MonthPicker';
import {ANIMATION_DUR} from './constants';
import MonthListModal from './MonthListModal';
import {useModalContext} from '@providers/ModalProvider';

const Header = ({month, selectedDate, onSelecteMonth}: THeader) => {
  const insets = useSafeAreaInsets();
  const {closeModal, setModalInfo} = useModalContext();

  const fadeFinished = useSharedValue(false);

  const paddingTop = insets.top > 0 ? insets.top : 24;

  const entering = FadeInDown.duration(ANIMATION_DUR).withCallback(finished => {
    if (finished) {
      fadeFinished.value = true;
    }
  });

  const onPressMonthPicker = useCallback(() => {
    setModalInfo({
      content: (
        <View style={styles.modalContainer}>
          <MonthListModal
            month={month}
            setMonth={month => {
              onSelecteMonth(month);
              closeModal();
            }}
          />
        </View>
      ),
      modalHeight: 250,
      lineStyle: styles.linStyle,
      contentContainerStyle: styles.modalInnerContainer,
    });
  }, [month]);

  const executeChild = (cb: () => void) => {
    !!cb && cb();
  };

  return (
    <Animated.View
      layout={LinearTransition}
      style={[styles.container, {paddingTop}]}>
      <MenuIcon />

      <Animated.View entering={entering}>
        <MonthPicker month={month} onPress={onPressMonthPicker} />
        <Calendar
          month={month}
          fadeFinished={fadeFinished}
          executeChild={executeChild}
          selectedDate={selectedDate}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5f0f40',
    paddingBottom: 16,
    borderRadius: 32,
    overflow: 'hidden',
  },
  firstRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#5f0f40',
  },
  modalInnerContainer: {
    backgroundColor: '#5f0f40',
  },
  linStyle: {
    marginTop: 16,
    backgroundColor: 'white',
  },
});
