import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

import NumberItem from '@components/pinCode/NumberItem';
import Placeholder from '@components/pinCode/Placeholder';
import StatusBarManager from '@components/StatusBarManager';
import {DATA, PLACEHOLDERS} from '@components/pinCode/data';
import {PlaceholderFunction} from '@components/pinCode/types';

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
    if (index === 9) return <View style={styles.empty} />;

    return (
      <NumberItem
        inputsRef={inputsRef}
        value={index === 10 ? 0 : index === 11 ? 'icon' : item}
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
          <View style={{position: 'absolute', top: '12%'}}>
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
    backgroundColor: '#141416',
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
  empty: {
    margin: 8,
    width: 90,
    height: 90,
  },
});

export default PinCode;
