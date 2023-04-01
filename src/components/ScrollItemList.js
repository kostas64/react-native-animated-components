import {
  Text,
  View,
  Image,
  Animated,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {faker} from '@faker-js/faker';

const {width} = Dimensions.get('window');
const BG_IMG =
  'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

faker.seed(10);

const DATA = [...Array(500).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${
      faker.datatype.number({max: 1}) === 0 ? 'men' : 'women'
    }/${faker.datatype.number(60)}.jpg`,
    name: faker.name.firstName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const ScrollItem = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={50}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            (ITEM_SIZE + 8) * index,
            (ITEM_SIZE + 8) * (index + 2),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
            extrapolate: 'clamp',
          });

          const opacityInputRange = [
            -1,
            0,
            (ITEM_SIZE + 8) * index,
            (ITEM_SIZE + 8) * (index + 1),
          ];
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={[
                styles.parentViewItem,
                {
                  opacity,
                  transform: [
                    {
                      scale,
                    },
                  ],
                },
              ]}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.job}>{item.jobTitle}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatlistContainer: {
    paddingHorizontal: SPACING,
    paddingTop: StatusBar.currentHeight || 42,
  },
  parentViewItem: {
    height: 118,
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 3,
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: SPACING / 2,
  },
  textContainer: {
    width: width - 2 * SPACING - SPACING - AVATAR_SIZE - SPACING,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
  },
  job: {
    fontSize: 18,
    opacity: 0.7,
    color: 'black',
  },
  email: {
    fontSize: 14,
    opacity: 0.8,
    color: '#0099cc',
  },
});

export default ScrollItem;
