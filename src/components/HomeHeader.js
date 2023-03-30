import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{paddingTop: insets.top + 24, paddingLeft: 16}}>
      <Text style={styles.name}>{`Konstantinos Efkarpidis`}</Text>
      <Text style={styles.profession}>{`Mobile engineer`}</Text>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/img/software-engineer.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: '700',
    fontSize: 20,
    color: '#3f546a',
  },
  profession: {
    fontWeight: '500',
    fontSize: 18,
    color: '#819cb8',
  },
  imgContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
  },
});

export default HomeHeader;
