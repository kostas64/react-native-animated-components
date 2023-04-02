import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import images from '../assets/indiList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('screen');

const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Indicator = ({measures, scrollX}) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.width),
  });
  const indicatorLeft = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: indicatorWidth,
        left: indicatorLeft,
        height: 4,
        backgroundColor: 'white',
        bottom: -10,
      }}
    />
  );
};

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={{
            color: 'white',
            fontSize: 84 / data.length,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Tabs = ({data, scrollX, onItemPress}) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    const m = [];
    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });

          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, [measures]);

  return (
    <View style={{position: 'absolute', top: 100, width}}>
      <View
        ref={containerRef}
        style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
        {data.map((item, index) => {
          return (
            <Tab
              ref={item.ref}
              key={item.key}
              item={item}
              onItemPress={() => {
                onItemPress(index);
              }}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const ImplementedWith = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: insets.bottom + 16,
        left: 20,
        zIndex: 100,
      }}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>Animated API</Text>
    </View>
  );
};

const ListWithIndicator = () => {
  const flatRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const onItemPress = React.useCallback(itemIndex => {
    flatRef.current.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  return (
    <View style={styles.container}>
      <ImplementedWith />
      <Animated.FlatList
        ref={flatRef}
        data={data}
        horizontal
        bounces={false}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.image}}
                style={{flex: 1, resizeMode: 'cover'}}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {backgroundColor: 'rgba(0,0,0,0.3)'},
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  implemented: {
    fontSize: 22,
    fontWeight: '900',
    color: 'white',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});

export default ListWithIndicator;
