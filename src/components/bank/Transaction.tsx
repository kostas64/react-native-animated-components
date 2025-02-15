import {StyleSheet, View} from 'react-native';

import {
  isAndroid,
  SM_FONT_UPSCALE_FACTOR,
  MED_FONT_UPSCALE_FACTOR,
} from '@utils/device';
import {shadows} from './styles';
import StockIcon from './StockIcon';
import {Colors} from '@utils/colors';
import WalletIcon from './WalletIcon';
import {TransactionProps} from './types';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';

const Transaction = ({
  date,
  amount,
  beenAdded,
  label,
  description,
}: TransactionProps) => {
  return (
    <View
      style={[
        styles.container,
        isAndroid ? styles.border : shadows.veryJustShadow,
      ]}>
      <View style={styles.iconContainer}>
        {description === 'Income' ? <WalletIcon /> : <StockIcon />}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.rowBetween}>
          <Text
            style={styles.label}
            maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
            {label}
          </Text>

          <Text
            maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}
            style={[styles.label, beenAdded ? styles.green : styles.red]}>
            {`$${amount.toFixed(2)}`}
          </Text>
        </View>

        <View style={styles.rowBetween}>
          <Text
            style={styles.description}
            maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
            {description}
          </Text>
          <Text
            style={styles.description}
            maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    padding: 3,
    paddingRight: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  iconContainer: {
    marginRight: 12,
    padding: 18,
    borderRadius: 12,
    backgroundColor: Colors.BRIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    gap: 2,
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontFamily: typography.semiBold,
  },
  description: {
    color: Colors.QUICK_SILVER,
    fontFamily: typography.medium,
  },
  green: {
    color: Colors.MEDIUM_SEA_GREEN,
  },
  red: {
    color: Colors.DARK_PINK,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.PLATINUM,
  },
});
