import {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {Colors} from '@utils/colors';

const MenuIcon = memo(() => {
  return (
    <View style={styles.container}>
      <Feather name="menu" size={24} color="white" />
      <Image
        source={{uri: 'https://randomuser.me/api/portraits/men/44.jpg'}}
        style={styles.img}
      />
    </View>
  );
});

MenuIcon.displayName = 'MenuIcon';

export default MenuIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
});
