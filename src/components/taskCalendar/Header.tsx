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
import {isIOS} from '@utils/device';
import MonthPicker from './MonthPicker';
import {ANIMATION_DUR} from './constants';
import MonthListModal from './MonthListModal';
import {useModalContext} from '@providers/ModalProvider';

const Header = ({month, selectedDate, onSelecteMonth}: THeader) => {
  const insets = useSafeAreaInsets();
  const {setModalInfo} = useModalContext();

  const fadeFinished = useSharedValue(false);

  const paddingTop = insets.top > 32 ? insets.top : 32;

  const entering = FadeInDown.delay(isIOS ? 50 : 100)
    .duration(ANIMATION_DUR)
    .withCallback(finished => {
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
      <Animated.View entering={entering}>
        <MenuIcon />
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
    backgroundColor: '#121212',
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
    backgroundColor: '#121212',
    borderRadius: 0,
    elevation: 10,
  },
  modalInnerContainer: {
    borderRadius: 0,
    backgroundColor: '#121212',
    borderWidth: isIOS ? 0 : 2,
    borderTopColor: 'white',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  linStyle: {
    marginTop: 16,
    backgroundColor: 'white',
  },
});
