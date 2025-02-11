import {StyleSheet, View} from 'react-native';

import Text from '@components/Text';
import {typography} from '@utils/typography';

const ScreenTransitionHomework = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{'You think im lazy?\n😔😔😔'}</Text>
    </View>
  );
};

export default ScreenTransitionHomework;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: typography.semiBold,
  },
});
