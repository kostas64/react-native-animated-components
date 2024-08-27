import Svg, {
  Defs,
  Path,
  Rect,
  Stop,
  ClipPath,
  LinearGradient,
} from 'react-native-svg';
import Animated, {
  Easing,
  withTiming,
  interpolate,
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useImperativeHandle, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import ReText from '@components/ReText';
import {typography} from '@utils/typography';
import {isAndroid, isIOS} from '@utils/device';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = {
  data: number[];
  width: number;
  height: number;
};

type ChartRef = {
  animate: (forward?: boolean) => void;
};

const chartWidth = 300;
const chartHeight = 150;
const data = [
  140, 70, 110, 180, 120, 15, 230, 210, 190, 260, 210, 280, 320, 330, 300, 520,
  480, 440, 670, 825, 750, 732, 760, 700, 620, 650, 550, 430,
];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];

const MyButton = ({title, onPress}: {title: string; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.btnLabel}>{title}</Text>
    </Pressable>
  );
};

const ChartHeader = ({iconName, label}: {iconName: string; label: string}) => (
  <View style={styles.chartHeaderContainer}>
    <View style={styles.chartHeaderInnerContainer}>
      <View style={styles.chartHeaderIconContainer}>
        <AntDesign name={iconName} size={20} color={'#556d36'} />
      </View>
      <Text style={styles.chartHeaderLabel}>{label}</Text>
    </View>
  </View>
);

const AnimatedLineChart = React.forwardRef<ChartRef, Props>((props, ref) => {
  const {data, width, height} = props;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  const progress = useSharedValue(0);
  const indicatorPos = useSharedValue(-1);
  const animatedText = useSharedValue('');

  const stepValue = (maxValue - minValue) / 5;
  const stepValues = Array.from({length: 6}, (_, i) =>
    Math.round(minValue + i * stepValue),
  ).reverse();

  const iterateV = new Array(4).fill(0);
  const iterateH = new Array(7).fill(0);

  const step = width / data.length;
  const formattedText = useDerivedValue(
    () => ` ${animatedText.value ? animatedText.value : ''}`,
  );

  const retextStyle = [
    styles.chartHeaderLabel,
    isIOS ? styles.lineH19 : styles.androidReText,
  ];

  const animate = (forward = true) => {
    progress.value = withTiming(forward ? 1 : 0, {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    });
  };

  useImperativeHandle(ref, () => ({
    animate,
  }));

  const animatedProps = useAnimatedProps(() => {
    const dataLength = data.length;

    const xStep = width / (dataLength - 1);
    let path = '';

    const pointsToInclude = Math.floor(progress.value * (dataLength - 1));

    // Draw the path up to the current progress point
    data.forEach((value, index) => {
      if (index > pointsToInclude) return;

      const x = xStep * index;
      const y = height - ((value - minValue) / (maxValue - minValue)) * height;

      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });

    // Handle the partial segment for smoothness
    if (pointsToInclude < dataLength - 1) {
      const nextX = xStep * (pointsToInclude + 1);
      const nextY =
        height -
        ((data[pointsToInclude + 1] - minValue) / (maxValue - minValue)) *
          height;

      const partialProgress = (progress.value * (dataLength - 1)) % 1;

      const interpolatedX = interpolate(
        partialProgress,
        [0, 1],
        [xStep * pointsToInclude, nextX],
      );
      const interpolatedY = interpolate(
        partialProgress,
        [0, 1],
        [
          height -
            ((data[pointsToInclude] - minValue) / (maxValue - minValue)) *
              height,
          nextY,
        ],
      );

      path += ` L ${interpolatedX} ${interpolatedY}`;
    }

    return {
      d: path,
    };
  });

  const animatedFillProps = useAnimatedProps(() => {
    const dataLength = data.length;
    const xStep = width / (dataLength - 1);
    let path = '';

    const pointsToInclude = Math.floor(progress.value * (dataLength - 1));

    // Create the path for the fill under the line
    data.forEach((value, index) => {
      if (index > pointsToInclude) return;

      const x = xStep * index;
      const y = height - ((value - minValue) / (maxValue - minValue)) * height;

      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });

    // Handle the partial segment for smoothness
    if (pointsToInclude < dataLength - 1) {
      const nextX = xStep * (pointsToInclude + 1);
      const nextY =
        height -
        ((data[pointsToInclude + 1] - minValue) / (maxValue - minValue)) *
          height;

      const partialProgress = (progress.value * (dataLength - 1)) % 1;

      const interpolatedX = interpolate(
        partialProgress,
        [0, 1],
        [xStep * pointsToInclude, nextX],
      );
      const interpolatedY = interpolate(
        partialProgress,
        [0, 1],
        [
          height -
            ((data[pointsToInclude] - minValue) / (maxValue - minValue)) *
              height,
          nextY,
        ],
      );

      path += ` L ${interpolatedX} ${interpolatedY}`;
    }

    // Close the path vertically down to the bottom of the SVG to create a filled area under the line
    path += ` V ${height} H 0 Z`;

    return {
      d: path,
    };
  });

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: indicatorPos.value === -1 || progress.value !== 1 ? 0 : 1,
    left: indicatorPos.value,
  }));

  const retextPosStyle = useAnimatedStyle(() => ({
    left: indicatorPos.value - 22,
    opacity: indicatorPos.value === -1 || progress.value !== 1 ? 0 : 1,
  }));

  const panGesture = Gesture.Pan()
    .shouldCancelWhenOutside(true)
    .onBegin(e => {
      if (e.x >= 0 && e.x <= width && e.y >= 0 && e.y <= height) {
        indicatorPos.value = e.x - 1;
        animatedText.value = `${data[Math.floor(e.x / step)]}`;
      }
    })
    .onChange(e => {
      if (e.x >= 0 && e.x <= width && e.y >= 0 && e.y <= height) {
        indicatorPos.value = e.x - 1;
        animatedText.value = `${data[Math.floor(e.x / step)]}`;
      }
    })
    .onFinalize(() => {
      indicatorPos.value = -1;
      animatedText.value = '';
    });

  return (
    <View>
      <View style={[styles.chartBaseContainer, {height, width}]}>
        {/* Y Axis Values */}
        <View style={[styles.stepValueContainer, {height}]}>
          {stepValues.map((value, index) => (
            <Text key={index} style={styles.stepValueLabel}>
              {value}
            </Text>
          ))}
        </View>
        {iterateV.map((_, index) => (
          <View
            key={`vertival-${index}`}
            style={[
              styles.verticalL,
              {width: width - 2, top: (height / 5 - 1) * (index + 1)},
            ]}
          />
        ))}
        {iterateH.map((_, index) => (
          <View
            key={`horizontal-${index}`}
            style={[
              styles.horizontalL,
              {height: height - 2, left: (width / 8) * (index + 1)},
            ]}
          />
        ))}
      </View>

      <Svg width={width} height={height}>
        {/* Define the gradient */}
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#3e5a1d" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#3e5a1d" stopOpacity="0" />
          </LinearGradient>
          <ClipPath id="clip">
            <AnimatedPath animatedProps={animatedFillProps} />
          </ClipPath>
        </Defs>

        {/* Gradient fill below the line */}
        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#gradient)"
          clipPath="url(#clip)"
          clipRule={isAndroid ? 'nonzero' : 'evenodd'}
        />
        <AnimatedPath
          fill="none"
          stroke="#3e5a1d"
          strokeWidth={3}
          animatedProps={animatedProps}
        />
      </Svg>

      {/* X Axis Values */}
      <View style={styles.yAxisContainer}>
        {days.map((day, index) => (
          <View key={`x-axis-${index}`}>
            <Text style={[styles.day, {width: width / 8}]}>{day}</Text>
            <Text style={[styles.dayNumber, {width: width / 8}]}>
              {index + 5}
            </Text>
          </View>
        ))}
      </View>

      {/* Indicator */}
      <Animated.View style={[indicatorStyle, styles.indicator, {height}]} />
      {/* ReText */}
      <Animated.View style={[styles.retextContainer, retextPosStyle]}>
        <ReText text={formattedText} style={retextStyle} />
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <View style={[styles.lineChartGestureArea, {width, height}]} />
      </GestureDetector>
    </View>
  );
});

const LineChartScreen = () => {
  const chartRef = useRef<ChartRef>(null);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#eeeee2',
        gap: 36,
      }}>
      <View>
        <View style={{top: -26}}>
          <ChartHeader iconName="linechart" label={'Line Chart'} />
        </View>
        <AnimatedLineChart
          ref={chartRef}
          data={data}
          width={chartWidth}
          height={chartHeight}
        />
      </View>

      <View style={styles.btnsContainer}>
        <MyButton title="Animate" onPress={() => chartRef.current?.animate()} />
        <MyButton
          title="Animate Back"
          onPress={() => chartRef.current?.animate(false)}
        />
      </View>
    </View>
  );
};

export default LineChartScreen;

const styles = StyleSheet.create({
  btnsContainer: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
  },
  btnContainer: {
    backgroundColor: '#556d36',
    height: 52,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    minWidth: 140,
  },
  btnLabel: {
    color: 'white',
    lineHeight: 22,
    fontFamily: typography.semiBold,
  },
  chartBaseContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    position: 'absolute',
  },
  stepValueContainer: {
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
  },
  stepValueLabel: {
    left: -24,
    fontSize: 12,
    lineHeight: 14,
    color: '#333333',
    fontFamily: typography.light,
  },
  verticalL: {
    height: 1,
    backgroundColor: '#d3d3d3',
  },
  horizontalL: {
    width: 1,
    position: 'absolute',
    backgroundColor: '#d3d3d3',
  },
  yAxisContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  day: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14,
    fontFamily: typography.light,
  },
  dayNumber: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14,
    fontFamily: typography.semiBold,
  },
  indicator: {
    position: 'absolute',
    width: 2,
    backgroundColor: '#151515',
    borderRadius: 10,
  },
  chartHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartHeaderInnerContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3e5d7',
    padding: 10,
    borderRadius: 16,
  },
  chartHeaderIconContainer: {
    backgroundColor: '#eeeee2',
    marginRight: 10,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  chartHeaderLabel: {
    lineHeight: 20,
    color: '#556d36',
    fontFamily: typography.bold,
  },
  lineChartGestureArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  retextContainer: {
    top: -36,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#e3e5d7',
    paddingHorizontal: 8,
    paddingLeft: isIOS ? 6 : 0,
    paddingRight: isIOS ? 8 : 2,
    minWidth: 46,
    paddingVertical: isIOS ? 6 : 0,
    borderRadius: 8,
  },
  lineH19: {
    lineHeight: 17,
  },
  androidReText: {
    height: 32,
    lineHeight: 10,
    top: 4,
  },
});
