import React from 'react';
import {View, Animated, StatusBar, StyleSheet} from 'react-native';

import {HEIGHT_SCR, WIDTH} from '@utils/device';
import Drawer from '@components/customDrawer/Drawer';
import StatusBarManager from '@components/StatusBarManager';
import AnimatedIcon from '@components/customDrawer/AnimatedIcon';
import {fromCoords, toCoords} from '@components/customDrawer/data';
import ImplementedWith from '@components/customDrawer/ImplementWith';

const CustomDrawerScreen = () => {
  const animatedValue = React.useRef(new Animated.ValueXY(fromCoords)).current;

  const translateX = animatedValue.y.interpolate({
    inputRange: [0, HEIGHT_SCR * 0.25],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  });

  const opacity = animatedValue.x.interpolate({
    inputRange: [0, WIDTH],
    outputRange: [1, 0],
  });

  const animate = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue: toValue === 1 ? toCoords : fromCoords,
      duration: 400,
      useNativeDriver: true,
    });
  };

  const onCloseDrawer = React.useCallback(() => {
    StatusBar.setBarStyle('dark-content');
    animate(0).start();
  }, []);
  const onOpenDrawer = React.useCallback(() => {
    StatusBar.setBarStyle('light-content');
    animate(1).start();
  }, []);

  return (
    <View style={styles.maskedContainer}>
      <StatusBarManager barStyle="dark" />
      <Drawer onPress={onCloseDrawer} animatedValue={animatedValue} />
      <ImplementedWith opacity={opacity} />
      <AnimatedIcon
        opacity={opacity}
        translateX={translateX}
        onOpenDrawer={onOpenDrawer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maskedContainer: {
    flex: 1,
  },
});

export default CustomDrawerScreen;
