import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from '@components/Text';
import {typography} from '@utils/typography';
import {HEIGHT_SCR, WIDTH} from '@utils/device';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

const colors = {
  yellow: '#FFE8A3',
  dark: '#2D2D2D',
};

const ConnectWithText = React.memo(() => {
  return (
    <View style={styles.connectWithTextContainer}>
      <Text style={styles.connectWithText} allowFontScaling={false}>
        Connect with...
      </Text>
    </View>
  );
});

ConnectWithText.displayName = 'ConnectWithText';

export default ConnectWithText;

const styles = StyleSheet.create({
  connectWithTextContainer: {
    position: 'absolute',
    top: HEIGHT_SCR / 2 - ITEM_HEIGHT * 2,
    width: WIDTH * 0.7,
    paddingHorizontal: 14,
  },
  connectWithText: {
    fontSize: 52,
    lineHeight: 52,
    color: colors.yellow,
    fontFamily: typography.semiBold,
  },
});
