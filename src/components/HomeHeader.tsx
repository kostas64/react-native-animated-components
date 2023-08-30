import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const URL = 'https://www.linkedin.com/in/konstantinos-efkarpidis/';

const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{paddingTop: insets.top + 24, paddingHorizontal: 16}}>
      <View style={styles.nameProfRow}>
        <View>
          <Text style={styles.name}>{`Konstantinos Efkarpidis`}</Text>
          <Text style={styles.profession}>{`Mobile engineer`}</Text>
        </View>
        <TouchableOpacity
          hitSlop={styles.hitSlop}
          onPress={() => Linking.openURL(URL)}>
          <AntDesign name="linkedin-square" size={24} color={'#0966c2'} />
        </TouchableOpacity>
      </View>
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
  nameProfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  hitSlop: {
    top: 24,
    left: 24,
    right: 24,
    bottom: 24,
  },
});

export default HomeHeader;
