import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {TLoading} from './types';
import Text from '@components/Text';
import {typography} from '@utils/typography';

const Loading = ({loading, stopLoading}: TLoading) => {
  if (!loading) {
    return null;
  }

  let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

  useEffect(() => {
    timeout = setTimeout(() => {
      !!stopLoading && stopLoading();
    }, 600);

    return () => {
      !!timeout && clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={{...styles.container, zIndex: 1}}>
      <ActivityIndicator size={'small'} color={'white'} />

      <Text style={styles.label}>Retrieving tasks</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontFamily: typography.medium,
    color: 'white',
  },
});
