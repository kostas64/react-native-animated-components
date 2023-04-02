import {
  View,
  Text,
  Image,
  Animated,
  Platform,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {faker} from '@faker-js/faker';
import images from '../assets/carousel3d';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const SPACING = 20;

faker.seed(10);

const DATA = [...Array(images.length).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: images[i],
    title: faker.commerce.productName(),
    subtitle: faker.company.bs(),
    price: faker.finance.amount(80, 200, 0),
  };
});

const Content = ({item}) => {
  return (
    <>
      <Text style={styles.itemTitle} numberOfLines={1} adjustsFontSizeToFit>
        {item.title}
      </Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.currency}>USD</Text>
      </View>
    </>
  );
};

const renderListItem = (item, index, scrollX) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [50, 0, 20],
  });

  return (
    <Animated.View
      style={{
        width,
        paddingVertical: SPACING,
        opacity,
        transform: [
          {
            translateY,
          },
        ],
      }}>
      <Image source={{uri: item.image}} style={styles.image} />
    </Animated.View>
  );
};

const ImplementedWith = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{position: 'absolute', top: insets.top + 16, left: 20}}>
      <Text style={styles.implemented}>Implemented with:</Text>
      <Text style={styles.label}>Animated API</Text>
    </View>
  );
};

const Carousel3D = () => {
  const [index, setIndex] = React.useState(0);
  const listRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const onScroll = Animated.event(
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
      useNativeDriver: true,
    },
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ImplementedWith />
        <View style={styles.listContainer}>
          <Animated.FlatList
            ref={listRef}
            data={DATA}
            keyExtractor={item => item.key}
            horizontal
            pagingEnabled
            bounces={false}
            onScroll={onScroll}
            style={{flexGrow: 0, zIndex: 1000}}
            contentContainerStyle={styles.listContentContainer}
            onMomentumScrollEnd={e =>
              setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
            }
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => renderListItem(item, index, scrollX)}
          />
          <View style={styles.contentContainer}>
            {DATA.map((item, index) => {
              const inputRange = [
                (index - 0.2) * width,
                index * width,
                (index + 0.2) * width,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });
              const rotateY = scrollX.interpolate({
                inputRange,
                outputRange: ['45deg', '0deg', '45deg'],
              });
              return (
                <Animated.View
                  key={item.key}
                  style={{
                    position: 'absolute',
                    opacity,
                    backfaceVisibility: 'visible',
                    transform: [{perspective: IMAGE_WIDTH * 4}, {rotateY}],
                  }}>
                  <Content item={item} />
                </Animated.View>
              );
            })}
          </View>
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  {
                    perspective: IMAGE_WIDTH * 4,
                  },
                  {
                    rotateY: progress.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: ['0deg', '90deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        <View style={styles.arrowsContainer}>
          <TouchableOpacity
            disabled={index === 0}
            style={{opacity: index === 0 ? 0.25 : 1}}
            onPress={() => {
              listRef?.current?.scrollToOffset({
                offset: (index - 1) * width,
                animated: true,
              });
              Platform.OS === 'android' && setIndex(curIndex => curIndex - 1);
            }}>
            <View style={styles.arrowContainer}>
              <AntDesign name="swapleft" size={42} color="black" />
              <Text style={styles.arrowText}>PREV</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={index === DATA.length - 1}
            style={{opacity: index === DATA.length - 1 ? 0.25 : 1}}
            onPress={() => {
              listRef?.current?.scrollToOffset({
                offset: (index + 1) * width,
                animated: true,
              });
              Platform.OS === 'android' && setIndex(curIndex => curIndex + 1);
            }}>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrowText}>NEXT</Text>
              <AntDesign name="swapright" size={42} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5F1FA',
  },
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  listContainer: {
    height: IMAGE_HEIGHT * 2.1,
    alignItems: 'center',
  },
  listContentContainer: {
    height: IMAGE_HEIGHT + SPACING * 2,
    paddingHorizontal: (width - IMAGE_WIDTH) / 2,
  },
  contentContainer: {
    width: IMAGE_WIDTH,
    alignItems: 'center',
    paddingHorizontal: SPACING * 2,
    marginLeft: SPACING * 2,
    zIndex: 100,
  },
  card: {
    width: IMAGE_WIDTH + SPACING * 2,
    position: 'absolute',
    backgroundColor: 'white',
    backfaceVisibility: true,
    zIndex: -1,
    top: SPACING * 2,
    left: (width - (IMAGE_WIDTH + SPACING * 2)) / 2,
    bottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backfaceVisibility: 'visible',
  },
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: IMAGE_WIDTH + SPACING * 4,
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 12,
    fontWeight: '800',
    color: 'black',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
  itemTitle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.4,
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: SPACING,
  },
  price: {
    color: 'black',
    fontSize: 42,
    letterSpacing: 3,
    fontWeight: '900',
    marginRight: 8,
  },
  currency: {
    color: 'black',
    fontSize: 16,
    lineHeight: 36,
    fontWeight: '800',
    alignSelf: 'flex-end',
  },
});

export default Carousel3D;
