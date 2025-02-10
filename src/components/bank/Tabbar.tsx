import Animated, {
  withDelay,
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useCallback} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {LinearGradient, Rect, Stop, Svg} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {tabs} from './data';
import {WIDTH} from '@utils/device';
import CommonGradient from './CommonGradient';
import {AnimatedSvg} from '@components/AnimatedComponents';

const TABS = [
  {
    ImageSource: require('../../assets/img/bank/home.png'),
    screen: 'BankHome',
  },
  {
    ImageSource: require('../../assets/img/bank/stocks.png'),
    screen: 'BankStocks',
  },
  {
    ImageSource: require('../../assets/img/bank/wallet.png'),
    screen: 'BankWallet',
  },
  {
    ImageSource: require('../../assets/img/bank/app.png'),
    screen: 'BankSettings',
  },
];

const TABBAR_HEIGHT = 68;
const TABBAR_WIDTH = 250;
const ICON_CONTAINER_SIZE = 56;

const Tabbar = ({navigation}: BottomTabBarProps) => {
  const activeTab = useSharedValue(0);
  const initialPosition = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const spacing = insets.bottom > 0 ? insets.bottom + 8 : 24;
  const tabbarContainerHeight = TABBAR_HEIGHT + 2.25 * spacing;

  const onItemPress = useCallback((index: number) => {
    navigation.navigate(tabs?.[index]?.name);
    activeTab.value = index;
  }, []);

  const onLayout = useCallback(() => {
    requestAnimationFrame(() => {
      initialPosition.value = withDelay(
        500,
        withSpring(1, {damping: 80, stiffness: 200}),
      );
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          initialPosition.value,
          [0, 1],
          [tabbarContainerHeight, 0],
        ),
      },
    ],
  }));

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.container,
        animatedStyle,
        {height: tabbarContainerHeight},
      ]}>
      <Svg
        width={WIDTH}
        height={tabbarContainerHeight}
        style={styles.fadeContainer}>
        <LinearGradient
          id={'tabbarBackground'}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%">
          <Stop offset="0%" stopOpacity="0" stopColor={'#f7f7f7'} />
          <Stop offset="35%" stopOpacity="1" stopColor={'#f7f7f7'} />
        </LinearGradient>
        <Rect
          width={WIDTH}
          height={tabbarContainerHeight}
          fill={'url(#tabbarBackground)'}
        />
      </Svg>
      <View style={[styles.tabbarContainer, {top: 1.5 * spacing}]}>
        <Svg
          width={TABBAR_WIDTH}
          height={TABBAR_HEIGHT}
          style={styles.absolute}>
          <LinearGradient id={'tabbar'} x1="0%" y1="100%" x2="0%" y2="0%">
            <Stop offset="50%" stopOpacity="1" stopColor={'#060606'} />
            <Stop offset="100%" stopOpacity="1" stopColor={'#404040'} />
          </LinearGradient>
          <Rect
            rx={36}
            width={TABBAR_WIDTH}
            height={TABBAR_HEIGHT}
            fill={'url(#tabbar)'}
          />
        </Svg>
        <View style={styles.tabbarInnerContainer}>
          {TABS.map((tab, index) => {
            const opacity = useAnimatedProps(() => ({
              opacity:
                activeTab.value === index
                  ? withTiming(1)
                  : withTiming(0, {duration: 100}),
            }));

            return (
              <Pressable
                key={tab.screen}
                onPressOut={() => onItemPress(index)}
                style={({pressed}) => [
                  styles.buttonContainer,
                  pressed && styles.halfOpacity,
                ]}>
                <AnimatedSvg
                  width={ICON_CONTAINER_SIZE}
                  height={ICON_CONTAINER_SIZE}
                  animatedProps={opacity}
                  style={styles.buttonSvg}>
                  <CommonGradient id={'tabbarBtn'} />
                  <Rect
                    width={ICON_CONTAINER_SIZE}
                    height={ICON_CONTAINER_SIZE}
                    rx={ICON_CONTAINER_SIZE / 2}
                    fill={'url(#tabbarBtn)'}
                  />
                </AnimatedSvg>

                <Image source={tab.ImageSource} style={styles.icon} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: 'absolute',
    width: WIDTH,
    backgroundColor: 'transparent',
  },
  absolute: {
    position: 'absolute',
  },
  fadeContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  tabbarContainer: {
    width: TABBAR_WIDTH,
    height: TABBAR_HEIGHT,
    alignSelf: 'center',
  },
  tabbarInnerContainer: {
    gap: 4,
    padding: 6,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 18,
    borderRadius: 32,
    backgroundColor: '#303030',
  },
  halfOpacity: {
    opacity: 0.5,
  },
  buttonSvg: {
    overflow: 'hidden',
    borderRadius: ICON_CONTAINER_SIZE / 2,
    position: 'absolute',
    backgroundColor: 'white',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
