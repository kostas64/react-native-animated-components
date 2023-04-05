import {
  View,
  Text,
  Animated,
  StatusBar,
  TextStyle,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
} from 'react-native';
import React from 'react';
import Svg, {Polygon} from 'react-native-svg';
import StatusBarManager from '@components/StatusBarManager';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {routes, colors, links} from '@assets/customDrawer';
import MaskedView from '@react-native-masked-view/masked-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const {width, height} = Dimensions.get('window');
const fromCoords = {x: 0, y: height};
const toCoords = {x: width, y: 0};

type ButtonProps = {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  style: StyleProp<TextStyle>;
};

type DrawerProps = {
  animatedValue: Animated.AnimatedValueXY;
  onPress: () => void;
};

type ImplementedWith = {
  opacity: Animated.AnimatedInterpolation<number>;
};

const Button = ({title, onPress, style}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

const Drawer = ({animatedValue, onPress}: DrawerProps) => {
  const polygonRef = React.useRef<Polygon>();
  const insets = useSafeAreaInsets();
  const [selectedRoute, setSelectedRoute] = React.useState(routes[0]);

  React.useEffect(() => {
    const listener = animatedValue.addListener(v => {
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x}, ${v.y} ${width}, ${height} 0, ${height}`,
        });
      }
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, []);

  const opacity = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  });

  const translateX = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [-50, 0],
  });

  return (
    <MaskedView
      androidRenderingMode="software"
      style={[styles.maskedContainer]}
      maskElement={
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{backgroundColor: 'transparent'}}>
          <AnimatedPolygon
            ref={polygonRef}
            points={`0,0 ${fromCoords.x},${fromCoords.y} ${width}, ${height}  0, ${height}`}
          />
        </Svg>
      }>
      <View style={styles.menuContainer}>
        <AntDesign
          onPress={onPress}
          name="close"
          size={32}
          color="white"
          style={{
            position: 'absolute',
            top: insets.top + 16,
            right: 30,
            zIndex: 100,
          }}
        />
        <Animated.View
          style={[styles.menu, {opacity, transform: [{translateX}]}]}>
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  key={route}
                  title={route}
                  style={[
                    styles.button,
                    {
                      textDecorationLine:
                        route === selectedRoute ? 'line-through' : 'none',
                      color: colors[index],
                    },
                  ]}
                  onPress={() => {
                    setSelectedRoute(route);
                    onPress();
                  }}
                />
              );
            })}
          </View>

          <View>
            {links.map((link, index) => {
              return (
                <Button
                  key={link}
                  title={link}
                  style={[
                    styles.buttonSmall,
                    {color: colors[index + routes.length + 1]},
                  ]}
                  onPress={onPress}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>
    </MaskedView>
  );
};

const ImplementedWith = ({opacity}: ImplementedWith) => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={{position: 'absolute', top: insets.top + 16, left: 20, opacity}}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>react-native-svg</Text>
      <Text style={styles.label}>@react-native-masked-view</Text>
    </Animated.View>
  );
};

const CustomDrawer = () => {
  const insets = useSafeAreaInsets();
  const animatedValue = React.useRef(new Animated.ValueXY(fromCoords)).current;

  const translateX = animatedValue.y.interpolate({
    inputRange: [0, height * 0.25],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  });

  const opacity = animatedValue.x.interpolate({
    inputRange: [0, width],
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
      <AnimatedAntDesign
        onPress={onOpenDrawer}
        name="menufold"
        size={32}
        color="#222"
        style={{
          position: 'absolute',
          right: 30,
          opacity,
          top: insets.top + 16,
          transform: [{translateX}],
        }}
      />
    </View>
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
  implemented: {
    fontSize: 22,
    fontWeight: '900',
    color: 'black',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  menu: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 32,
    color: '#fdfdfd',
    lineHeight: 32 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fdfdfd',
  },
});

export default CustomDrawer;
