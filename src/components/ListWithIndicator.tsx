import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import images from '@assets/indiList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('screen');

type TData = {
  image: any;
  key: string;
  ref: any;
  title: string;
};

type TMeasure = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type TIndicator = {
  measures: TMeasure[];
  scrollX: any;
};

type TTab = {
  item: TData;
  onItemPress: (event: GestureResponderEvent) => void;
};

type TTabs = {
  data: TData[];
  scrollX: Animated.AnimatedValue;
  onItemPress: Function;
};

console.log('Object.keys(images) ', images['man']);

const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i as keyof typeof images],
  ref: React.createRef(),
}));

const Indicator = ({measures, scrollX}: TIndicator) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure: TMeasure) => measure.width),
  });
  const indicatorLeft = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure: TMeasure) => measure.x),
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

const Tab = React.forwardRef(({item, onItemPress}: TTab, ref: any) => {
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

const Tabs = ({data, scrollX, onItemPress}: TTabs) => {
  const [measures, setMeasures] = React.useState<TMeasure[]>([]);
  const containerRef = React.useRef<any>();

  React.useEffect(() => {
    const m: TMeasure[] = [];
    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
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
  const flatRef = React.useRef<any>();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const onItemPress = React.useCallback((itemIndex: number) => {
    !!flatRef.current &&
      flatRef.current.scrollToOffset({
        offset: itemIndex * width,
      });
  }, []);

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
