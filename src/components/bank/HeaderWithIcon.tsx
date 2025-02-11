import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import SectionHeader from './SectionHeader';
import {HeaderWithIconProps} from './types';

const HeaderWithIcon = ({icon, style, label}: HeaderWithIconProps) => {
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
