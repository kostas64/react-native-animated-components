import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

import {Colors} from '@utils/colors';
import StatusBarManager from '@components/StatusBarManager';
import ValueDotPicker from '@components/valuePickers/valueDot/ValueDotPicker';
import ValueListPicker from '@components/valuePickers/valueList/ValueListPicker';
import ValueArrowPicker from '@components/valuePickers/valueArrow/ValueArrowPicker';

export type TValueRangePicker = {
  range: [number, number];
  unit?: string;
  value: number;
  setValue: (value: number) => void;
};

type TPickerContainer = {
  children: JSX.Element | JSX.Element[];
};

const PickerContainer = ({children}: TPickerContainer) => {
  return <View style={styles.pickerWrapper}>{children}</View>;
};

const ValuePickersScreen = () => {
  const [dotValue, setDotValue] = React.useState(0);
  const [listValue, setListValue] = React.useState(0);
  const [arrowListValue, setArrowListValue] = React.useState(0);

  return (
    <>
      <StatusBarManager />
      <Svg width={'100%'} height={'100%'}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
            <Stop offset="0%" stopColor="#c4e4e1" />
            <Stop offset="50%" stopColor="#3b5998" />
            <Stop offset="100%" stopColor="#c4e4e1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" height={'100%'} width={'100%'} fill="url(#grad)" />
      </Svg>
      <View style={styles.pickersContainer}>
        <View style={styles.rowAround}>
          <PickerContainer>
            <ValueDotPicker
              unit="°"
              range={[0, 15]}
              value={dotValue}
              setValue={setDotValue}
            />
          </PickerContainer>
          <PickerContainer>
            <ValueListPicker
              unit="°"
              value={listValue}
              range={[-28, -10]}
              setValue={setListValue}
            />
          </PickerContainer>
          <PickerContainer>
            <ValueArrowPicker
              unit="°"
              range={[-28, -10]}
              value={arrowListValue}
              setValue={setArrowListValue}
            />
          </PickerContainer>
        </View>
      </View>
    </>
  );
};

export default ValuePickersScreen;

const styles = StyleSheet.create({
  pickersContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  rowAround: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pickerWrapper: {
    width: 64,
    height: 200,
    borderRadius: 20,
    backgroundColor: Colors.CHINESE_BLACK,
    zIndex: 100000,
  },
});
