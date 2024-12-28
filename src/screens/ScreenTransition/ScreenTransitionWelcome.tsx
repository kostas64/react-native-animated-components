import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WIDTH} from '@utils/device';
import {typography} from '@utils/typography';
import Button from '@components/screenTransition/Button';
import StatusBarManager from '@components/StatusBarManager';
import {TWelcomeNavigationProps} from './ScreenTransitionStack';

const title = "The only study app you'll ever need";
const description =
  'Upload class study materials, create electronic flashcards to study.';

const ScreenTransitionWelcome = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<TWelcomeNavigationProps>();

  const marginTop = insets.top > 0 ? insets.top + 48 : 86;
  const marginBottom = insets.bottom > 0 ? insets.bottom + 12 : 32;

  const onPress = () => {
    navigation.navigate('BottomStack');
  };

  return (
    <>
      <StatusBarManager />
      <View style={styles.container}>
        <View style={styles.center}>
          <Image
            style={[styles.img, {marginTop}]}
            source={require('@assets/img/screenTransition/welcome.png')}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Button label="Let's start" style={{marginBottom}} onPress={onPress} />
      </View>
    </>
  );
};

export default ScreenTransitionWelcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
  },
  img: {
    width: WIDTH - 48,
    height: WIDTH - 16,
  },
  title: {
    marginTop: 48,
    width: WIDTH - 48,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: typography.bold,
  },
  description: {
    fontSize: 16,
    color: '#b4b4b8',
    textAlign: 'center',
    width: WIDTH - 48,
    marginTop: 24,
    fontFamily: typography.semiBold,
  },
});
