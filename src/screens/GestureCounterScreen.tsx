import {StyleSheet, View} from 'react-native';

import GestureCounter from '@components/gestureCounter/GestureCounter';

const GestureCounterScreen = () => {
  return (
    <View style={styles.container}>
      <GestureCounter />
    </View>
  );
};

export default GestureCounterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c2c',
  },
});
