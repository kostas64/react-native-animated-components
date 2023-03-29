import React from 'react';
import images from '../assets/parallaxList';
import {Animated, Image, View, Dimensions, StyleSheet} from 'react-native';

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const ParallaxList = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        horizontal
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
          {useNativeDriver: true},
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = [0.7 * -width, 0, 0.7 * width];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange,
          });
          return (
            <View
              style={{width, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  elevation: 50,
                  padding: 12,
                  backgroundColor: 'white',
                  borderRadius: 14,
                }}>
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    borderRadius: 12,
                  }}>
                  <Animated.Image
                    source={{uri: item.photo}}
                    style={{
                      width: ITEM_WIDTH * 1.4,
                      height: ITEM_HEIGHT,
                      resizeMode: 'cover',
                      alignSelf: 'center',
                      transform: [
                        {
                          translateX,
                        },
                      ],
                    }}
                  />
                </View>
                <Image
                  source={{uri: item.avatar_url}}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    resizeMode: 'cover',
                    borderWidth: 6,
                    borderColor: 'white',
                    position: 'absolute',
                    bottom: -30,
                    right: 45,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ParallaxList;
