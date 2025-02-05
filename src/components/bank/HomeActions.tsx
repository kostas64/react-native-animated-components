import {
  Text,
  View,
  ViewStyle,
  Pressable,
  StyleProp,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {LinearGradient, Rect, Stop, Svg} from 'react-native-svg';

import {ACTIONS} from './data';
import {shadows} from './styles';
import {typography} from '@utils/typography';

const HomeActions = ({style}: {style?: StyleProp<ViewStyle>}) => {
  return (
    <View style={[styles.container, style]}>
      {ACTIONS.map(({label, size, Component, iconName}, index) => (
        <Pressable
          key={index}
          style={({pressed}) => [
            shadows.justShadow,
            styles.itemContainer,
            pressed && styles.halfOpacity,
          ]}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.iconContainer}>
            <Svg width={32} height={32} style={styles.absolute}>
              <LinearGradient
                id={'tabbarBtn'}
                x1="100%"
                y1="0%"
                x2="100%"
                y2="100%">
                <Stop offset="0%" stopOpacity="0.8" stopColor={'#f7736b'} />
                <Stop offset="50%" stopOpacity="1" stopColor={'#e94173'} />
                <Stop offset="100%" stopOpacity="0.8" stopColor={'#e4489b'} />
              </LinearGradient>
              <Rect
                width={32}
                height={32}
                rx={32 / 2}
                fill={'url(#tabbarBtn)'}
              />
            </Svg>
            <Component name={iconName} size={size} color={'white'} />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default HomeActions;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  container: {
    gap: 6,
    padding: 6,
    borderRadius: 100,
    backgroundColor: '#efefef',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    padding: 4,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontFamily: typography.semiBold,
    fontSize: 14,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfOpacity: {
    opacity: 0.5,
  },
});
