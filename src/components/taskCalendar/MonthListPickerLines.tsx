import {StyleSheet, View} from 'react-native';

import {isIOS} from '@utils/device';

const MonthListPickerLines = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lines} />
    </View>
  );
};

export default MonthListPickerLines;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 200,
    width: '100%',
    justifyContent: 'center',
  },
  lines: {
    height: 42,
    width: 200,
    alignSelf: 'center',
    borderBottomColor: 'rgba(255,255,255,0.2)',
    borderTopColor: 'rgba(255,255,255,0.2)',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 2,
    transform: [{translateY: isIOS ? -22 : -19}],
  },
});
