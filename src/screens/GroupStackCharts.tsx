import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSharedValue, withTiming} from 'react-native-reanimated';

import GroupChart from '@components/charts/groupChart/GroupChart';

const GroupStackCharts = () => {
  const navigation = useNavigation();

  const animate = useSharedValue(0);

  useEffect(() => {
    //@ts-ignore
    const listener = navigation.addListener('transitionEnd', () => {
      animate.value = withTiming(1, {duration: 500});
    });

    return () => !!listener && listener();
  });

  return (
    <View style={styles.container}>
      <GroupChart animate={animate} />
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
