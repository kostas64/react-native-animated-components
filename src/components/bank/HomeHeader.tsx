import {
  Text,
  View,
  Image,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Cards from './Cards';
import {shadows} from './styles';
import {typography} from '@utils/typography';
import {isIOS, MAX_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';
import {CARD_BODY_HEIGHT, CARD_FOOTER_HEIGHT, CARD_WIDTH} from './constants';

const HomeHeader = ({style}: {style?: StyleProp<ViewStyle>}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 4 : 24;

  return (
    <>
      <View style={[styles.container, isIOS && styles.ios, style]}>
        <View style={styles.avatarLabelContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('@assets/img/bank/avatar.png')}
              style={styles.avatar}
            />
          </View>
          <View>
            <Text
              style={styles.label}
              maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
              Morning Jude
            </Text>
            <Text
              style={styles.accountType}
              maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
              Free account
            </Text>
          </View>
        </View>
        <View style={styles.bellContainer}>
          <Octicons name="bell-fill" size={20} color={'white'} />
        </View>
      </View>
      <Cards
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
  ios: {
    marginTop: 4,
    borderTopLeftRadius: 52,
    borderTopRightRadius: 52,
  },
});
