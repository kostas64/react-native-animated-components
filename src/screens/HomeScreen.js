import React from 'react';
import {View} from 'react-native';
import HomeButton from '../components/HomeButton';

const HomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <HomeButton
        label={'Parallax List'}
        onPress={() => navigation.navigate('Parallax')}
      />
      <HomeButton
        label={'List With Indicator'}
        onPress={() => navigation.navigate('ListWithIndi')}
      />
      <HomeButton
        label={'Double List'}
        onPress={() => navigation.navigate('DoubleList')}
      />
    </View>
  );
};

export default HomeScreen;
