import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Animated, StatusBar, StyleSheet} from 'react-native';

import {typography} from '@utils/typography';
import {HEIGHT_SCR, WIDTH} from '@utils/device';
import Drawer from '@components/customDrawer/Drawer';
import AnimatedIcon from '@components/customDrawer/AnimatedIcon';
import StatusBarManager from '@components/common/StatusBarManager';
import {fromCoords, routes, toCoords} from '@components/customDrawer/data';

const CustomDrawerScreen = () => {
  const insets = useSafeAreaInsets();

  const animatedValue = React.useRef(new Animated.ValueXY(fromCoords)).current;
  const [selectedRoute, setSelectedRoute] = React.useState(routes[0]);

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
      <Drawer
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        onPress={onCloseDrawer}
        animatedValue={animatedValue}
      />

      <Animated.Text
        style={{...styles.screenName, top: insets.top + 16, opacity}}>
        {selectedRoute}
      </Animated.Text>

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
  screenName: {
    left: 24,
    fontSize: 26,
    lineHeight: 32,
    fontFamily: typography.semiBold,
    position: 'absolute',
  },
});

export default CustomDrawerScreen;
