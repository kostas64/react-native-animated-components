import {
  View,
  Text,
  Animated,
  StatusBar,
  TextStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import Svg, {Polygon} from 'react-native-svg';
import {HEIGHT_SCR, WIDTH} from '@utils/device';
import {routes, colors, links} from '@assets/customDrawer';
import StatusBarManager from '@components/StatusBarManager';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const fromCoords = {x: 0, y: HEIGHT_SCR};
const toCoords = {x: WIDTH, y: 0};

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
      style={{
        position: 'absolute',
        bottom: insets.bottom + 16,
        left: 20,
        opacity,
      }}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>Animated API</Text>
      <Text style={styles.label}>react-native-svg</Text>
      <Text style={styles.label}>@react-native-masked-view</Text>
    </Animated.View>
  );
};

const CustomDrawer = () => {
  const insets = useSafeAreaInsets();
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
    paddingBottom: 8,
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
