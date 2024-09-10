import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
  return <View style={styles.pickerContainer}>{children}</View>;
};

const ValuePickersScreen = () => {
  const [dotValue, setDotValue] = React.useState(0);
  const [listValue, setListValue] = React.useState(0);
  const [arrowListValue, setArrowListValue] = React.useState(0);

  return (
    <LinearGradient
      style={styles.container}
      colors={['#c4e4e1', '#3b5998', '#c4e4e1']}>
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
    </LinearGradient>
  );
};

export default ValuePickersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1a1a1',
  },
  rowAround: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pickerContainer: {
    width: 64,
    height: 200,
    borderRadius: 26,
    backgroundColor: '#161616',
  },
});
