import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

import {Colors} from '@utils/colors';
import NumberItem from '@components/pinCode/NumberItem';
import Placeholder from '@components/pinCode/Placeholder';
import {DATA, PLACEHOLDERS} from '@components/pinCode/data';
import {PlaceholderFunction} from '@components/pinCode/types';
import StatusBarManager from '@components/common/StatusBarManager';

const PinCode = () => {
  const translateX = useSharedValue(0);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const inputsRef = [
    React.useRef<PlaceholderFunction>(),
    React.useRef<PlaceholderFunction>(),
    React.useRef<PlaceholderFunction>(),
    React.useRef<PlaceholderFunction>(),
  ];

  const renderItem = ({item, index}: {item: number; index: number}) => {
    return (
      <NumberItem
        inputsRef={inputsRef}
        value={
          index === 9
            ? 'finger-print-outline'
            : index === 10
            ? 0
            : index === 11
            ? 'backspace-outline'
            : item
        }
        input={input}
        setInput={setInput}
        disabled={loading}
        setLoading={setLoading}
        translateX={translateX}
      />
    );
  };

  const animStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <>
      <StatusBarManager barStyle="light" />
      <View style={styles.container}>
        {/* Placeholder  */}
        <Animated.View style={[animStyle, styles.placeholderContainer]}>
          <View style={styles.rowBetween}>
            {PLACEHOLDERS.map((_, index) => (
              <Placeholder ref={inputsRef[index]} key={index} />
            ))}
          </View>
        </Animated.View>

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size={'small'} color={'white'} />
          </View>
        )}

        {/* Numbers */}
        <FlatList
          bounces={false}
          data={DATA}
          renderItem={renderItem}
          numColumns={3}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CHINESE_BLACK,
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholderContainer: {
    width: 200,
    height: '25%',
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loading: {
    position: 'absolute',
    top: '12%',
  },
});

export default PinCode;
