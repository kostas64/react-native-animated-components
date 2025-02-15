import {
  View,
  Share,
  ViewStyle,
  StyleProp,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {useState} from 'react';
import {G, Path, Svg} from 'react-native-svg';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '@utils/colors';
import Text from '@components/common/Text';
import {typography} from '@utils/typography';
import CommonGradient from './CommonGradient';
import ContextMenu from '@components/common/ContextMenu';
import {CARD_MENU_ITEMS, morePath, personPath} from './data';
import {TBankSettingsNavigationProps} from '@screens/Bank/BankBottomStack';

const WalletHeader = ({style}: {style?: StyleProp<ViewStyle>}) => {
  const isLight = useColorScheme() === 'light';
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<TBankSettingsNavigationProps>();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  const [isFavourite, setIsFavorite] = useState(false);

  const onPressAction = async ({event}: {event: string}) => {
    if (event === 'shareIban') {
      await Share.share({message: 'NL23INGB4746672490'});
    } else if (event === 'copyIban') {
      Clipboard.setString('NL23INGB4746672490');
    } else if (event === 'addToFavorits') {
      setIsFavorite(old => !old);
    } else if (event === 'settings') {
      navigation.navigate('BankSettings');
    }
  };

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

      <ContextMenu
        items={CARD_MENU_ITEMS({isLight, isFavourite})}
        onPress={onPressAction}>
        <View style={styles.bellContainer}>
          <Svg width={24} height={24} viewBox="0.39 0.4 63.11 63.01">
            <CommonGradient id={'more'} />
            <G transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
              <Path d={morePath} fill={'url(#more)'} />
            </G>
          </Svg>
        </View>
      </ContextMenu>
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
    color: Colors.CHINESE_BLACK,
    fontSize: 18,
    fontFamily: typography.semiBold,
  },
  accountType: {
    color: Colors.DARK_LIVER,
    fontSize: 12,
    fontFamily: typography.medium,
  },
  bellContainer: {
    padding: 14,
    borderRadius: 32,
    backgroundColor: Colors.WHITE,
  },
});
