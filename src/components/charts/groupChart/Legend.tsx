import {StyleSheet, View} from 'react-native';

import {COLORS} from './data';
import Text from '@components/Text';
import LegendItem from './LegendItem';
import {typography} from '@utils/typography';

const Legend = () => {
  return (
    <>
      <Text style={styles.title}>Revenue</Text>
      <View style={styles.container}>
        <LegendItem label="Income" color={COLORS.income} />
        <LegendItem label="Expenses" color={COLORS.expenses} />
      </View>
    </>
  );
};

export default Legend;

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.semiBold,
  },
  container: {
    flexDirection: 'row',
    gap: 12,
  },
});
