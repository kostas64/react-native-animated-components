import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  withTiming,
  SharedValue,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import React, {Dispatch, MutableRefObject, SetStateAction} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimPress = Animated.createAnimatedComponent(Pressable);

const PLACEHOLDERS = new Array(4).fill(0);
const DATA = new Array(12).fill(0).map((_: null, i: number) => i + 1);

const NumberItem = ({
  value,
  input,
  disabled,
  setInput,
  inputsRef,
  setLoading,
  translateX,
}: {
  translateX: SharedValue<number>;
  value: number | React.ReactNode;
  input: string;
  disabled: boolean;
  setInput: Dispatch<SetStateAction<string>>;
  inputsRef: MutableRefObject<PlaceholderFunction | undefined>[];
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const progress = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#141416', '#fee3d6'],
    ),
  }));

  const onPressIn = () => {
    const indexToAnimate = input.length;

    if (typeof value === 'number') {
      setInput(old => `${old}${value}`);

      inputsRef?.[indexToAnimate]?.current?.animatePlaceholder();

      if (indexToAnimate === 3) {
        setTimeout(() => {
          setLoading(true);
          setInput('');
        }, 300);

        setTimeout(() => {
          setLoading(false);
          translateX.value = withTiming(-8, {duration: 100}, () => {
            translateX.value = withTiming(8, {duration: 50}, () => {
              translateX.value = withTiming(-4, {duration: 50}, () => {
                translateX.value = withTiming(0, {duration: 100});
              });
            });
          });

          setTimeout(() => {
            inputsRef?.[0]?.current?.animateRemove();
            inputsRef?.[1]?.current?.animateRemove();
            inputsRef?.[2]?.current?.animateRemove();
            inputsRef?.[3]?.current?.animateRemove();
          }, 300);
        }, 2000);
      }
    } else if (typeof value === 'string') {
      setInput(old => old.slice(0, -1));
      inputsRef?.[indexToAnimate - 1]?.current?.animateRemove();
    }
    progress.value = withTiming(1 - progress.value);
  };

  const onPressOut = () => {
    progress.value = withTiming(0);
  };

  const getValue = () => {
    if (typeof value === 'number') {
      return <Text style={styles.number}>{value}</Text>;
    } else {
      return <Ionicons name="backspace-outline" size={36} color={'white'} />;
    }
  };

  return (
    <AnimPress
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[animStyle, styles.numberContainer]}>
      {getValue()}
    </AnimPress>
  );
};

type PlaceholderFunction = {
  animatePlaceholder: () => void;
  animateRemove: () => void;
};

const Placeholder = React.forwardRef<PlaceholderFunction | undefined>(
  ({}, ref) => {
    const progress = useSharedValue(0);

    const animStyle = useAnimatedStyle(() => ({
      transform: [
        {translateY: interpolate(progress.value, [0, 0.45, 1], [0, 0, -16])},
      ],
      height: interpolate(progress.value, [0, 0.45, 1], [1, 1, 16]),
      width: interpolate(progress.value, [0, 0.45, 1], [16, 1, 16]),
      borderRadius: interpolate(progress.value, [0, 0.45, 1], [0, 0, 8]),
      backgroundColor: interpolateColor(
        progress.value,
        [0, 0.45, 0.85, 1],
        ['#ffecdb', '#ffecdb', '#ffecdb', '#e3a68f'],
      ),
    }));

    React.useImperativeHandle(ref, () => ({
      animatePlaceholder,
      animateRemove,
    }));

    const animatePlaceholder = () => {
      progress.value = withTiming(1, {duration: 400});
    };

    const animateRemove = () => {
      progress.value = withTiming(0, {duration: 400});
    };

    return (
      <View style={styles.innerContainer}>
        <Animated.View style={[animStyle, styles.placeholder]} />
      </View>
    );
  },
);

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
            <ActivityIndicator size={'small'} />
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
  innerContainer: {
    height: 40,
    width: 48,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: '#ffecdb',
  },
  numberContainer: {
    margin: 8,
    width: 90,
    height: 90,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: 'white',
    fontSize: 36,
    fontWeight: '100',
  },
  empty: {
    width: 100,
    height: 100,
  },
});

export default PinCode;
