import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDrawerProgress} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';

const DrawerInterpolateScreen = ({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}) => {
  const insets = useSafeAreaInsets();
  const drawerProgress = useDrawerProgress();

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);

    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 34]);

    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity
        onPress={navigation.openDrawer}
        style={[
          styles.menuContainer,
          {
            paddingTop: insets.top > 0 ? insets.top + 8 : 28,
          },
        ]}>
        <Entypo name="menu" size={26} />
        <Text style={styles.label}>Menu</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 8,
  },
});

export default DrawerInterpolateScreen;
