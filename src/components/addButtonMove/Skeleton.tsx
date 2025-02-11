import {StyleSheet, View} from 'react-native';

import {shadow} from './styles';
import {Colors} from '@utils/colors';

const Skeleton = ({skeletonHeight}: {skeletonHeight: number}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, shadow]} />

      <View style={[styles.box, {height: skeletonHeight}, shadow]}>
        <View style={[styles.smLine, {height: skeletonHeight * 0.15}]} />
        <View style={[styles.xlLine, {height: skeletonHeight * 0.15}]} />
        <View style={[styles.xlLine, {height: skeletonHeight * 0.15}]} />
      </View>
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.GLOSSY_GRAPE,
  },
  box: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    borderTopLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: Colors.DARK_LAVENDER,
  },
  smLine: {
    width: '60%',
    borderRadius: 24,
    backgroundColor: Colors.GLOSSY_GRAPE,
  },
  xlLine: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: Colors.FRENCH_LILAC,
  },
});
