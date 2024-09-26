import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Easing, useSharedValue, withTiming} from 'react-native-reanimated';

import GroupChart from '@components/charts/groupChart/GroupChart';
import StackChart from '@components/charts/stackChart/StackChart';

const GroupStackCharts = () => {
  const navigation = useNavigation();

  const animate = useSharedValue(0);

  useEffect(() => {
    //@ts-ignore
    const listener = navigation.addListener('transitionEnd', () => {
      animate.value = withTiming(1, {duration: 1500, easing: Easing.ease});
    });

    return () => !!listener && listener();
  });

  return (
    <View style={styles.container}>
      <GroupChart animate={animate} />
      <StackChart animate={animate} />
    </View>
  );
};

export default GroupStackCharts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eeeee2',
    justifyContent: 'center',
  },
});
