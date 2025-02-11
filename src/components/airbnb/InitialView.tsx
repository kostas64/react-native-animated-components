import Feather from 'react-native-vector-icons/Feather';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WIDTH} from '@utils/device';
import InitialBox from './InitialBox';

const InitialView = () => {
  const insets = useSafeAreaInsets();
  const top = insets.top > 40 ? insets.top : 30;

  return (
    <View style={[styles.padHor24, {paddingTop: top}]}>
      <View style={styles.container}>
        <Pressable
          style={[
            styles.leftInput,
            styles.row,
            styles.initialDim,
            styles.padHor16,
          ]}>
          <InitialBox />
        </Pressable>
        <View style={styles.filterContainer}>
          <Feather name="sliders" size={18} style={styles.top1} />
        </View>
      </View>
    </View>
  );
};

export default InitialView;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  initialDim: {
    height: 60,
    width: WIDTH - 100,
  },
  top1: {
    top: 1,
    transform: [{rotate: '90deg'}],
  },
  padHor16: {
    paddingHorizontal: 16,
  },
  padHor24: {
    paddingHorizontal: 24,
  },
  filterContainer: {
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    paddingVertical: 12,
    borderRadius: 32,
  },
});
