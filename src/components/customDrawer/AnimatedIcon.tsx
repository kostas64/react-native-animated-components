import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {TAnimatedIcon} from './types';

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const AnimatedIcon = ({onOpenDrawer, opacity, translateX}: TAnimatedIcon) => {
  const insets = useSafeAreaInsets();

  return (
    <AnimatedAntDesign
      size={32}
      color="#222"
      name="menufold"
      onPress={onOpenDrawer}
      style={[
        styles.icon,
        {opacity, top: insets.top + 16, transform: [{translateX}]},
      ]}
    />
  );
};

export default AnimatedIcon;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 30,
  },
});
