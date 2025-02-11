import {StyleSheet, View} from 'react-native';

import Text from '@components/Text';
import {typography} from '@utils/typography';

const ScreenTransitionSubjects = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {"Ok, this is enough.\nDon't you think?"}
      </Text>
    </View>
  );
};

export default ScreenTransitionSubjects;

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
