import React from 'react';
import {Polygon, Svg} from 'react-native-svg';
import {Animated, StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Link from './Link';
import Route from './Route';
import {DrawerProps} from './types';
import {HEIGHT_SCR, WIDTH} from '@utils/device';
import {fromCoords, links, routes} from './data';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const Drawer = ({animatedValue, onPress}: DrawerProps) => {
  const polygonRef = React.useRef<Polygon>(null);
  const insets = useSafeAreaInsets();
  const [selectedRoute, setSelectedRoute] = React.useState(routes[0]);

  React.useEffect(() => {
    const listener = animatedValue.addListener(v => {
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x}, ${v.y} ${WIDTH}, ${HEIGHT_SCR} 0, ${HEIGHT_SCR}`,
        });
      }
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, []);

  const opacity = animatedValue.x.interpolate({
    inputRange: [0, WIDTH],
    outputRange: [0, 1],
  });

  const translateX = animatedValue.x.interpolate({
    inputRange: [0, WIDTH],
    outputRange: [-50, 0],
  });

  return (
    <MaskedView
      androidRenderingMode="software"
      style={[styles.maskedContainer]}
      maskElement={
        <Svg
          width={WIDTH}
          height={HEIGHT_SCR}
          viewBox={`0 0 ${WIDTH} ${HEIGHT_SCR}`}
          style={{backgroundColor: 'transparent'}}>
          <AnimatedPolygon
            ref={polygonRef}
            points={`0,0 ${fromCoords.x},${fromCoords.y} ${WIDTH}, ${HEIGHT_SCR}  0, ${HEIGHT_SCR}`}
          />
        </Svg>
      }>
      <View style={styles.menuContainer}>
        <AntDesign
          size={32}
          name="close"
          color="white"
          onPress={onPress}
          style={[styles.closeIcon, {top: insets.top + 16}]}
        />
        <Animated.View
          style={[styles.menu, {opacity, transform: [{translateX}]}]}>
          <View>
            {routes.map((route, index) => (
              <Route
                key={route}
                index={index}
                onPress={() => {
                  setSelectedRoute(route);
                  onPress();
                }}
                route={route}
                selectedRoute={selectedRoute}
              />
            ))}
          </View>

          <View>
            {links.map((link, index) => (
              <Link
                key={link}
                index={index}
                link={link}
                onPress={onPress}
                routes={routes}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  maskedContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#222',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menu: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  closeIcon: {
    position: 'absolute',
    right: 30,
    zIndex: 100,
  },
});

export default Drawer;
