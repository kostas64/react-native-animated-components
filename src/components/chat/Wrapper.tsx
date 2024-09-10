import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {TWrapperProps} from './types';
import {HEIGHT_SCR, isAndroid} from '@utils/device';

const Wrapper = ({children}: TWrapperProps) => {
  const insets = useSafeAreaInsets();

  if (isAndroid) {
    return children;
  }

  const marginTop = insets.top > 0 ? insets.top : 24;

  return (
    <View style={{height: HEIGHT_SCR - 112 - marginTop - insets.bottom}}>
      {children}
    </View>
  );
};

export default Wrapper;
