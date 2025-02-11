import AntDesign from 'react-native-vector-icons/AntDesign';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';

import Text from '@components/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import DrawerContentItem from './DrawerContentItem';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';

const DrawerContent = ({navigation}: {navigation: DrawerNavigationHelpers}) => {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={styles.flex}>
      <View style={styles.drawerScroll}>
        <TouchableOpacity
          style={styles.marginBottom}
          onPress={() => {
            StatusBar.setBarStyle('dark-content');
            navigation.closeDrawer();
          }}>
          <AntDesign name="close" size={24} color={'white'} />
        </TouchableOpacity>

        <DrawerContentItem label="Home" icon="home" />
        <DrawerContentItem label="My wallet" icon="wallet" />
        <DrawerContentItem label="Notifications" icon="bells" />
        <DrawerContentItem label="Favourite" icon="hearto" />
        <View style={styles.hr} />
        <Text
          style={styles.implementedWith}
          maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
          {'Implemented with:\nReanimated'}
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  hr: {
    height: 1,
    backgroundColor: Colors.WHITE,
    left: 8,
  },
  implementedWith: {
    paddingLeft: 8,
    paddingVertical: 16,
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: typography.medium,
  },
  marginBottom: {
    marginBottom: 32,
  },
  drawerScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
