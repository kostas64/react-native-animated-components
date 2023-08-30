import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DrawerInterpolateScreen from '../screens/DrawerInterpolateScreen';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';

type TDrawerList = {
  DrawerInterpolateNested: undefined;
};

export type THomeNavigationProps = DrawerNavigationProp<
  TDrawerList,
  'DrawerInterpolateNested'
>;
export type THomeScreenProps = DrawerScreenProps<
  TDrawerList,
  'DrawerInterpolateNested'
>;

const Drawer = createDrawerNavigator<TDrawerList>();

const CustomDrawerItem = ({label, icon}: {label: string; icon: string}) => {
  return (
    <TouchableOpacity style={styles.drawerItemContainer}>
      <AntDesign name={icon} color={'white'} size={22} />
      <Text style={styles.drawerItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}) => {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={styles.flex}>
      <View style={styles.drawerScroll}>
        <TouchableOpacity
          style={styles.marginBottom}
          onPress={() => navigation.closeDrawer()}>
          <AntDesign name="close" size={24} color={'white'} />
        </TouchableOpacity>

        <CustomDrawerItem label="Home" icon="home" />
        <CustomDrawerItem label="My wallet" icon="wallet" />
        <CustomDrawerItem label="Notifications" icon="bells" />
        <CustomDrawerItem label="Favourite" icon="hearto" />
        <View style={styles.hr} />
        <Text style={styles.implementedWith}>Implemented with:</Text>
        <Text style={[styles.implementedWith, {paddingTop: 0}]}>
          Reanimated
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerInterpolate = () => {
  return (
    <View style={styles.navigatorContainer}>
      <Drawer.Navigator
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          sceneContainerStyle: styles.sceneContainerStyle,
          drawerStyle: styles.drawerStyle,
        }}>
        <Drawer.Screen name="DrawerInterpolateNested">
          {(props: any) => <DrawerInterpolateScreen {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  navigatorContainer: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  drawerStyle: {
    flex: 1,
    width: '65%',
    paddingRight: 20,
    backgroundColor: 'transparent',
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
    fontWeight: '500',
  },
  marginBottom: {
    marginBottom: 32,
  },
  drawerScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  drawerItemContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 16,
  },
  drawerItemLabel: {
    color: 'white',
    marginLeft: 15,
    fontSize: 16,
  },
});

export default DrawerInterpolate;
