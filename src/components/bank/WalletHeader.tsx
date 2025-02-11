import {G, Path, Svg} from 'react-native-svg';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import Text from '@components/Text';
import {morePath, personPath} from './data';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';

const WalletHeader = ({style}: {style?: StyleProp<ViewStyle>}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  return (
    <Animated.View
      style={[{paddingTop}, styles.rowCenter, styles.between, style]}>
      <View style={styles.gap}>
        <Text style={styles.label}>Morning Jude</Text>
        <View style={[styles.rowCenter, styles.gap]}>
          <Svg width={16} height={16} viewBox="0.46 0.4 63.04 63.01">
            <CommonGradient id={'person'} />
            <G transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
              <Path d={personPath} fill={'url(#person)'} />
            </G>
          </Svg>
          <Text style={styles.accountType}>Personal Card</Text>
        </View>
      </View>

      <View style={styles.bellContainer}>
        <Svg width={24} height={24} viewBox="0.39 0.4 63.11 63.01">
          <CommonGradient id={'more'} />
          <G transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
            <Path d={morePath} fill={'url(#more)'} />
          </G>
        </Svg>
      </View>
    </Animated.View>
  );
};

export default WalletHeader;

const styles = StyleSheet.create({
  between: {
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap: {
    gap: 6,
  },
  label: {
    color: '#121212',
    fontSize: 18,
    fontFamily: typography.semiBold,
  },
  accountType: {
    color: '#505050',
    fontSize: 12,
    fontFamily: typography.medium,
  },
  bellContainer: {
    padding: 14,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
});
