import React, {ReactNode} from 'react';
import Animated from 'react-native-reanimated';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import SectionHeader from './SectionHeader';

const HeaderWithIcon = ({
  icon,
  style,
  label,
}: {
  icon: ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Animated.View
      style={[styles.spacePadHorizontal, styles.headerContainer, style]}>
      {icon && icon}
      <SectionHeader label={label} />
    </Animated.View>
  );
};

export default HeaderWithIcon;

const styles = StyleSheet.create({
  spacePadHorizontal: {
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
