import React from 'react';
import {StyleSheet, View} from 'react-native';
import HomeBody from '../components/HomeBody';
import HomeHeader from '../components/HomeHeader';
import StatusBarManager from '../components/StatusBarManager';

const HomeScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />
      <View style={styles.container}>
        <HomeHeader />
        <HomeBody />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2cfec',
  },
});

export default HomeScreen;
