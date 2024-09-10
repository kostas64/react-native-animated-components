import {Animated, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {TImplementedWith} from './types';
import {typography} from '@utils/typography';

const ImplementedWith = ({opacity}: TImplementedWith) => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[styles.container, {bottom: insets.bottom + 16, opacity}]}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>Animated API</Text>
      <Text style={styles.label}>react-native-svg</Text>
      <Text style={styles.label}>react-native-masked-view</Text>
    </Animated.View>
  );
};

export default ImplementedWith;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
  },
  implemented: {
    paddingBottom: 8,
    fontSize: 22,
    fontFamily: typography.bold,
    color: 'black',
  },
  label: {
    fontSize: 18,
    fontFamily: typography.medium,
    color: 'black',
  },
});
