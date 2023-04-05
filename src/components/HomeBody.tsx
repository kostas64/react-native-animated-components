import React from 'react';
import HomeButton from '@components/HomeButton';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {THomeNavigationProps} from 'src/App';

const HomeBody = () => {
  const navigation = useNavigation<THomeNavigationProps>();
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.sectionContainer}>
        <Ionicons name="ios-list-circle" color={'#3f546a'} size={40} />
        <Text style={styles.listLabel}>Lists</Text>
      </View>
      <View style={{paddingTop: 8}} />
      <HomeButton
        label={'Parallax List'}
        backgroundColor={'#f298bc'}
        onPress={() => navigation.navigate('Parallax')}
      />
      <View style={styles.separator} />
      <HomeButton
        label={'Double List'}
        backgroundColor={'#7bc8d2'}
        onPress={() => navigation.navigate('DoubleList')}
      />
      <View style={styles.separator} />
      <HomeButton
        label={'3D Carousel'}
        backgroundColor={'#a3b8f1'}
        onPress={() => navigation.navigate('Carousel3D')}
      />
      <View style={styles.separator} />
      <HomeButton
        label={'Fade Item Out'}
        backgroundColor={'#ad77df'}
        onPress={() => navigation.navigate('ScrollItem')}
      />
      <View style={[styles.sectionContainer, {paddingTop: 16}]}>
        <Image
          source={require('../assets/img/menu-bar.png')}
          style={styles.icon}
        />
        <Text style={styles.navbarLabel}>Navbar</Text>
      </View>
      <View style={styles.separator} />
      <HomeButton
        label={'Navbar with Indicator'}
        backgroundColor={'#eaa884'}
        onPress={() => navigation.navigate('ListWithIndi')}
      />
      <View style={styles.separator} />
      <HomeButton
        label={'Custom Drawer'}
        backgroundColor={'#c57f5d'}
        onPress={() => navigation.navigate('CustomDrawer')}
      />
      <View style={[styles.sectionContainer, {paddingTop: 16}]}>
        <Image
          source={require('../assets/img/loader.png')}
          style={styles.icon}
        />
        <Text style={styles.navbarLabel}>Loader</Text>
      </View>
      <View style={styles.separator} />
      <HomeButton
        label={'Progress Loader'}
        backgroundColor={'#f298bc'}
        onPress={() => navigation.navigate('Progress')}
      />
      <View style={styles.separator} />
      <HomeButton
        label={'Dot Loader'}
        backgroundColor={'#7bc8d2'}
        onPress={() => navigation.navigate('DotLoader')}
      />
      <View style={styles.separator} />
      <View style={styles.sectionContainer}>
        <FontAwesome name="toggle-on" color={'#3f546a'} size={32} />
        <Text style={[styles.listLabel, {marginLeft: 4}]}>Toggler</Text>
      </View>
      <View style={styles.separator} />
      <HomeButton
        label={'Togglers'}
        backgroundColor={'#a3b8f1'}
        onPress={() => navigation.navigate('Togglers')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f7fd',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLabel: {
    fontSize: 22,
    fontWeight: '500',
    color: '#3f546a',
    paddingLeft: 4,
  },
  navbarLabel: {
    fontSize: 22,
    fontWeight: '500',
    color: '#3f546a',
    paddingLeft: 8,
  },
  separator: {
    paddingVertical: 8,
  },
  icon: {
    width: 34,
    height: 34,
  },
});

export default HomeBody;
