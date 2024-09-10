import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';

import {typography} from '@utils/typography';
import DrawerContentItem from './DrawerContentItem';

const DrawerContent = ({navigation}: {navigation: DrawerNavigationHelpers}) => {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={styles.flex}>
      <View style={styles.drawerScroll}>
        <TouchableOpacity
          style={styles.marginBottom}
          onPress={() => navigation.closeDrawer()}>
          <AntDesign name="close" size={24} color={'white'} />
        </TouchableOpacity>

        <DrawerContentItem label="Home" icon="home" />
        <DrawerContentItem label="My wallet" icon="wallet" />
        <DrawerContentItem label="Notifications" icon="bells" />
        <DrawerContentItem label="Favourite" icon="hearto" />
        <View style={styles.hr} />
        <Text style={styles.implementedWith}>
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
    backgroundColor: 'white',
    left: 8,
  },
  implementedWith: {
    paddingLeft: 8,
    paddingVertical: 16,
    color: 'white',
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
