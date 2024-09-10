import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors} from './constants';
import {typography} from '@utils/typography';

const ImplementedWith = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {top: insets.top + 16}]}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>Animated API</Text>
    </View>
  );
};

export default ImplementedWith;

const styles = StyleSheet.create({
  container: {
    left: 20,
    position: 'absolute',
  },
  implemented: {
    fontSize: 22,
    color: colors.yellow,
    fontFamily: typography.bold,
  },
  label: {
    fontSize: 18,
    color: colors.yellow,
    fontFamily: typography.medium,
  },
});
