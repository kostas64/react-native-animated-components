import React from 'react';
import {View, Image, ViewStyle, StyleProp, StyleSheet} from 'react-native';

import {USERS} from './data';
import Text from '@components/Text';
import SectionHeader from './SectionHeader';
import {typography} from '@utils/typography';
import {MED_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';

const RecentTransactions = ({style}: {style?: StyleProp<ViewStyle>}) => {
  return (
    <View style={style}>
      <SectionHeader label="Recent Transactions" rightLabel="View All" />
      <View style={styles.usersContainer}>
        {USERS.map((user, index) => (
          <View key={index} style={styles.userContainer}>
            <Image source={{uri: user.image}} style={styles.img} />
            <Text
              numberOfLines={1}
              style={styles.name}
              maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
              {user.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainLabel: {
    fontSize: 18,
    fontFamily: typography.semiBold,
  },
  viewAllContainer: {
    paddingLeft: 16,
    paddingVertical: 4,
    paddingRight: 24,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: typography.regular,
  },
  halfOpacity: {
    opacity: 0.5,
  },
  usersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 28,
    marginTop: 8,
  },
  userContainer: {
    gap: 8,
    alignItems: 'center',
  },
  img: {
    width: (WIDTH - 56 - 46) / 5,
    height: (WIDTH - 56 - 46) / 5,
    borderRadius: (WIDTH - 56 - 46) / 10,
  },
  name: {
    color: '#a1a1a1',
    maxWidth: (WIDTH - 56) / 5,
    fontSize: 12,
    fontFamily: typography.medium,
  },
});
