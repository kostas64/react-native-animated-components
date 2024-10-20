import Animated, {
  withDelay,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {ICONS, shadow} from './data';

const Tabbar = ({
  state,
  insets,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(75, withTiming(1));
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{scale: interpolate(progress.value, [0, 1], [1.15, 1])}],
  }));

  const bottom =
    insets.bottom >= 32
      ? insets.bottom + 4
      : insets.bottom > 24
      ? insets.bottom
      : 32;

  return (
    <Animated.View style={[styles.container, style, {bottom}]}>
      <View style={[styles.firstInnerContainer, shadow]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;
          const isLast = index === state.routes.length - 1;
          const icon = isFocused ? ICONS[index].active : ICONS[index].inactive;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={`tabbar-${index}`}
              activeOpacity={0.5}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                borderRadius: 20,
                padding: 14,
                marginRight: isLast ? 0 : 4,
                backgroundColor: isFocused ? 'black' : 'white',
              }}
              onLongPress={onLongPress}>
              <Image
                source={icon}
                style={styles.icon}
                tintColor={isFocused ? 'white' : 'black'}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.secondInnerContainer, shadow]}>
        <Image
          source={ICONS[3].inactive}
          style={[styles.icon, styles.rotate]}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
  },
  firstInnerContainer: {
    flexDirection: 'row',
    padding: 8,
    gap: 10,
    borderRadius: 28,
    backgroundColor: 'white',
  },
  secondInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingHorizontal: 22,
    backgroundColor: 'white',
    borderRadius: 28,
  },
  icon: {
    width: 26,
    height: 26,
  },
  rotate: {
    transform: [{rotateY: '180deg'}],
  },
});
