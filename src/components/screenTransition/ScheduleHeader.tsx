import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Text from '@components/Text';
import {typography} from '@utils/typography';

const ScheduleHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Schedule</Text>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} />
      </View>
    </View>
  );
};

export default ScheduleHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: typography.bold,
    fontSize: 24,
  },
  searchContainer: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#e5e5e5',
  },
});
