import {StyleSheet, View} from 'react-native';

import {Colors} from '@utils/colors';
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
    backgroundColor: Colors.CHARLESTON_GREEN,
  },
});
