import Octicons from 'react-native-vector-icons/Octicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Image, StyleProp, ViewStyle, StyleSheet} from 'react-native';

import Cards from './Cards';
import {shadows} from './styles';
import Text from '@components/Text';
import {isIOS, WIDTH} from '@utils/device';
import {typography} from '@utils/typography';
import {CARD_BODY_HEIGHT, CARD_FOOTER_HEIGHT, CARD_WIDTH} from './constants';

const HomeHeader = ({style}: {style?: StyleProp<ViewStyle>}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  return (
    <>
      <View style={[styles.container, style]}>
        <View style={styles.avatarLabelContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('@assets/img/bank/avatar.png')}
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.label}>Morning Jude</Text>
            <Text style={styles.accountType}>Free account</Text>
          </View>
        </View>
        <View style={styles.bellContainer}>
          <Octicons name="bell-fill" size={20} color={'white'} />
        </View>
      </View>
      <Cards
        sharedElementTag={isIOS ? 'cards' : undefined}
        style={index => ({
          ...shadows.lowShadow,
          top: paddingTop + 76,
          transform: [
            {translateX: (WIDTH - CARD_WIDTH) / 2},
            {translateY: index * 26},
            {scale: 0.85 + index * 0.1},
          ],
        })}
      />
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 16,
    paddingBottom: (CARD_FOOTER_HEIGHT || 0) + (CARD_BODY_HEIGHT || 0) + 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#141111',
  },
  avatarLabelContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    padding: 16,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#505050',
    backgroundColor: '#19181b',
  },
  avatar: {
    width: 24,
    height: 24,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontFamily: typography.semiBold,
  },
  accountType: {
    color: '#a1a1a1',
    fontSize: 12,
    fontFamily: typography.medium,
  },
  bellContainer: {
    padding: 18,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#505050',
    backgroundColor: '#282626',
  },
});
