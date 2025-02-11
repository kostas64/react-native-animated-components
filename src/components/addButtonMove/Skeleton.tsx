import {StyleSheet, View} from 'react-native';

import {shadow} from './styles';

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
    backgroundColor: '#a187b2',
  },
  box: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    borderTopLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#714f90',
  },
  smLine: {
    width: '60%',
    borderRadius: 24,
    backgroundColor: '#ab99b9',
  },
  xlLine: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#85669f',
  },
});
