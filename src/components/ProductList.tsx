import {
  View,
  Text,
  Animated,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {
  State,
  Directions,
  FlingGestureHandler,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('screen');

type ListItem = {
  name: string;
  image: any;
  backgroundColor: string;
  fontColor: string;
  halfFontColor: string;
  formFactor: string;
  connection: string;
  power: string;
};

const ProductList = () => {
  const items: ListItem[] = [
    {
      name: 'Matt Black',
      image: require('../assets/img/black.png'),
      backgroundColor: '#495057',
      fontColor: 'rgba(255, 209, 81, 1)',
      halfFontColor: 'rgba(255, 209, 81, 0.75)',
      formFactor: 'Over ear',
      connection: 'Wireless',
      power: 'Power source',
    },
    {
      name: 'White',
      image: require('../assets/img/skin.png'),
      backgroundColor: '#e9ecef',
      fontColor: 'rgba(201, 173, 167, 1)',
      halfFontColor: 'rgba(201, 173, 167, 0.75)',
      formFactor: 'Headphones',
      connection: 'Cable',
      power: 'Power source',
    },
    {
      name: 'Blue',
      image: require('../assets/img/blue.png'),
      backgroundColor: '#0077b6',
      fontColor: 'rgba(255, 200, 221, 1)',
      halfFontColor: 'rgba(255, 200, 221, 0.75)',
      formFactor: 'Over ear',
      connection: 'Wireless',
      power: 'Power source',
    },
  ];

  const [index, setIndex] = React.useState(0);
  const insets = useSafeAreaInsets();
  const listRef = React.useRef<FlatList>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const animateIndex = React.useRef(new Animated.Value(0)).current;

  const backgroundColor = scrollX.interpolate({
    inputRange: items?.map((_, i) => i * width),
    outputRange: items?.map(item => item.backgroundColor),
  });

  React.useEffect(() => {
    Animated.timing(animateIndex, {
      toValue: index,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const renderItem = ({
    item,
    index: localIndex,
  }: {
    item: ListItem;
    index: number;
  }) => {
    const opacity = animateIndex.interpolate({
      inputRange: [localIndex - 1, localIndex, localIndex + 1],
      outputRange: [0, 1, 0],
    });
    return (
      <>
        <View
          style={{
            width,
            height,
            paddingTop: insets.top + 48,
            paddingLeft: 24,
          }}>
          <Text
            style={{
              color: item.fontColor,
              fontSize: 24,
              fontWeight: '500',
            }}>
            {item.name}
          </Text>
          <Animated.Image
            resizeMode={'contain'}
            source={item.image}
            style={{
              position: 'absolute',
              top: insets.top,
              left: 86,
              height: height * 0.5,
              opacity,
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: insets.top + 76,
            left: 24,
          }}>
          <Text
            style={{
              color: item.fontColor,
              fontSize: 64,
              fontWeight: '900',
            }}>
            BEATS
          </Text>
        </View>
      </>
    );
  };

  const onFlingLeft = e => {
    if (e.nativeEvent.state === State.END) {
      if (index === items.length - 1) return;

      listRef.current?.scrollToIndex({animated: true, index: index + 1});
      setIndex(oldInd => oldInd + 1);
    }
  };

  const onFlingRight = ev => {
    if (ev.nativeEvent.state === State.END) {
      if (index === 0) {
        return;
      }
      listRef.current?.scrollToIndex({animated: true, index: index - 1});
      setIndex(index - 1);
    }
  };

  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, {backgroundColor}]}
      />
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={onFlingLeft}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={onFlingRight}>
          <View>
            <Animated.FlatList
              ref={listRef}
              bounces={false}
              horizontal
              data={items}
              pagingEnabled
              scrollEnabled={false}
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
                {
                  useNativeDriver: false,
                },
              )}
              renderItem={renderItem}
            />
            <View style={{position: 'absolute', top: '50%', left: 24}}>
              <View style={{paddingBottom: '10%'}}>
                <Text
                  style={{
                    fontSize: width / 20,
                    color: items[index]?.halfFontColor,
                  }}>
                  Form Factor
                </Text>
                <Animated.Text
                  style={{
                    fontSize: width / 15,
                    color: items[index]?.fontColor,
                    fontWeight: '700',
                  }}>
                  {items[index]?.formFactor}
                </Animated.Text>
              </View>
              <View style={{paddingBottom: '10%'}}>
                <Text
                  style={{
                    fontSize: width / 20,
                    color: items[index]?.halfFontColor,
                  }}>
                  Connection
                </Text>
                <Text
                  style={{
                    fontSize: width / 15,
                    color: items[index]?.fontColor,
                    fontWeight: '700',
                  }}>
                  {items[index]?.connection}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: width / 20,
                    color: items[index]?.halfFontColor,
                  }}>
                  Power source
                </Text>
                <Text
                  style={{
                    fontSize: width / 15,
                    color: items[index]?.fontColor,
                    fontWeight: '700',
                  }}>
                  {items[index]?.power}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                position: 'absolute',
                left: 24,
                bottom: insets.bottom + 92,
                color: items[index].halfFontColor,
              }}>
              {`Implemented with:\nAnimated API + RN Gesture Handler`}
            </Text>
            <View
              style={{
                position: 'absolute',
                bottom: insets.bottom + 24,
                marginHorizontal: 24,
                backgroundColor: items[index].halfFontColor,
                paddingHorizontal: 8,
                paddingVertical: 12,
                borderRadius: 8,
              }}>
              <View
                style={{
                  width: width - 64,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: 0.75,
                }}>
                <Image
                  source={require('../assets/img/apple.png')}
                  style={{width: 32, height: 32}}
                />
                <Text style={{fontSize: 20, color: 'white'}}>Add to bag</Text>
                <Text style={{fontSize: 20, color: 'white'}}>$299.99</Text>
              </View>
            </View>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </>
  );
};

export default ProductList;
