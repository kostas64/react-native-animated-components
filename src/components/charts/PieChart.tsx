import Animated, {
  Easing,
  runOnJS,
  withTiming,
  interpolate,
  SharedValue,
  processColor,
  Extrapolation,
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  useAnimatedStyle,
  interpolateColor,
  createAnimatedPropAdapter,
} from 'react-native-reanimated';
import {Path, Svg} from 'react-native-svg';
import React, {useImperativeHandle} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {isIOS} from '@utils/device';
import ChartHeader from './ChartHeader';
import ReText from '@components/ReText';
import {typography} from '@utils/typography';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const width = 300;
const height = 180;
const centerX = width / 2;
const centerY = height / 2;
const borderRadius = 36;
const gapSize = 1;

const data = [
  {value: 25, color: '#5a723d', label: 'React Native'},
  {value: 15, color: '#a1ac8d', label: 'Flutter'},
  {value: 10, color: '#ccd1bc', label: 'Xamarin'},
];
const total = data.reduce((sum, item) => sum + item.value, 0);

type Slice = {
  index: number;
  data: {value: number; color: string}[];
  item: {color: string; value: number};
  innerRadius: number;
  outerRadius: number;
  progress: SharedValue<number>;
  progressValue: SharedValue<number>;
  selectedValue: SharedValue<number>;
};

type TotalLabel = {
  animatedText: SharedValue<number>;
  progress: SharedValue<number>;
};

type Legend = {
  progress: SharedValue<number>;
  selectedValue: SharedValue<number>;
};

// Function to calculate path for each rounded slice
const createRoundedPieSlicePath = (
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
) => {
  'worklet';

  if (endAngle - startAngle >= 2 * Math.PI) {
    return `M ${centerX} ${centerY} m ${-outerRadius}, 0 a ${outerRadius} ${outerRadius} 0 1 1 ${
      2 * outerRadius
    } 0 a ${outerRadius} ${outerRadius} 0 1 1 ${
      -2 * outerRadius
    } 0 Z M ${centerX} ${centerY} m ${-innerRadius}, 0 a ${innerRadius} ${innerRadius} 0 1 0 ${
      2 * innerRadius
    } 0 a ${innerRadius} ${innerRadius} 0 1 0 ${-2 * innerRadius} 0 Z`;
  }

  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

  // Calculate outer arc points
  const x1 = centerX + outerRadius * Math.cos(startAngle);
  const y1 = centerY + outerRadius * Math.sin(startAngle);
  const x2 = centerX + outerRadius * Math.cos(endAngle);
  const y2 = centerY + outerRadius * Math.sin(endAngle);

  // Calculate inner arc points (reverse direction)
  const x3 = centerX + innerRadius * Math.cos(endAngle);
  const y3 = centerY + innerRadius * Math.sin(endAngle);
  const x4 = centerX + innerRadius * Math.cos(startAngle);
  const y4 = centerY + innerRadius * Math.sin(startAngle);

  const pathData = [
    `M ${x1} ${y1}`, // Move to start of outer arc
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
    `L ${x3} ${y3}`, // Line to start of inner arc
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Inner arc (reversed direction)
    'Z', // Close path
  ].join(' ');

  return pathData;
};

const Slice = ({
  item,
  index,
  data,
  progress,
  innerRadius,
  outerRadius,
  selectedValue,
  progressValue,
}: Slice) => {
  const startAngleLocal: number[] = [0];
  const gapAngle = gapSize / outerRadius;
  const sliceAngle = (item.value / total) * 2 * Math.PI;

  data.map((item, ind) => {
    if (ind < index) {
      startAngleLocal.push((item.value / total) * 2 * Math.PI);
    }
  });

  const endAngle =
    startAngleLocal.reduce((a, b) => a + b, 0) + sliceAngle - gapAngle;

  const animatedProps = useAnimatedProps(
    () => {
      const endShared = interpolate(
        progress.value,
        [0, 1],
        [
          data.length === 1 ? 0 : startAngleLocal.reduce((a, b) => a + b, 0),
          data.length === 1 ? 2 * Math.PI : endAngle,
        ],
      );

      const path = createRoundedPieSlicePath(
        data.length === 1 ? 0 : startAngleLocal.reduce((a, b) => a + b, 0),
        endShared,
        innerRadius,
        outerRadius,
      );

      const isSelected =
        !!selectedValue.value && selectedValue.value === item.value;

      return {
        d: path,
        stroke: isSelected
          ? interpolateColor(
              progressValue.value,
              [0, 1],
              ['transparent', 'black'],
            )
          : interpolateColor(
              progressValue.value,
              [0, 1],
              ['black', 'transparent'],
            ),
        strokeWidth: isSelected
          ? interpolate(progressValue.value, [0, 1], [0, 2])
          : 0,
      };
    },
    [],
    //Fix for Android
    createAnimatedPropAdapter(
      props => {
        if (Object.keys(props).includes('stroke')) {
          props.stroke = {type: 0, payload: processColor(props.stroke)};
        }
      },
      ['stroke'],
    ),
  );

  return (
    <AnimatedPath
      fill={item.color}
      onResponderStart={() => {}}
      animatedProps={animatedProps}
    />
  );
};

const Legend = ({progress, selectedValue}: Legend) => {
  return (
    <Animated.View style={styles.legendContainer}>
      {data.map((item, index) => {
        const dataLength = data.length;
        const step = 1 / dataLength;

        const animatedStyle = useAnimatedStyle(() => ({
          opacity: !selectedValue.value
            ? interpolate(
                progress.value,
                [index * step, (index + 1) * step],
                [0, 1],
                Extrapolation.CLAMP,
              )
            : selectedValue.value === item.value
            ? 1
            : 0.25,
          transform: [
            {
              translateX: interpolate(
                progress.value,
                [index * step, (index + 1) * step],
                [16, 0],
                Extrapolation.CLAMP,
              ),
            },
          ],
        }));

        return (
          <Animated.View
            key={index}
            style={[animatedStyle, styles.innerLegendContainer]}>
            <View
              style={[styles.legendBullet, {backgroundColor: item.color}]}
            />
            <Text style={styles.legendLabel}>{`${item.label} (${
              (item.value / total) * 100
            }%)`}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

const TotalLabel = ({animatedText, progress}: TotalLabel) => {
  const formattedText = useDerivedValue(
    () => ` ${animatedText.value ? animatedText.value : ''}`,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{translateX: interpolate(progress.value, [0, 1], [8, 0])}],
  }));

  return <ReText text={formattedText} style={[styles.retext, animatedStyle]} />;
};

const PieChart = React.forwardRef((_, ref) => {
  const progress = useSharedValue(0);
  const progressValue = useSharedValue(0);
  const animatedText = useSharedValue(0);

  const outerRadius = Math.min(width, height - 4) / 2;
  const innerRadius = outerRadius - borderRadius;

  const animate = (forward = true) => {
    if (animatedText.value !== 0) {
      progressValue.value = withTiming(0, {duration: 75}, () => {
        animatedText.value = 0;
      });
    }

    progress.value = withTiming(forward ? 1 : 0, {
      duration: 1250,
      easing: Easing.out(Easing.ease),
    });
  };

  useImperativeHandle(ref, () => ({
    animate,
  }));

  const onTap = (angle: number) => {
    let cumulativeAngle = 0;
    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i].value / total) * 2 * Math.PI;
      if (angle >= cumulativeAngle && angle < cumulativeAngle + sliceAngle) {
        if (animatedText.value === data[i].value) {
          progressValue.value = withTiming(0, {duration: 150});
          animatedText.value = 0;
          return;
        }

        if (animatedText.value !== 0) {
          progressValue.value = withTiming(0, {duration: 150}, finished => {
            if (finished) {
              animatedText.value = data[i].value;
              progressValue.value = withTiming(1);
            }
          });
        } else {
          animatedText.value = data[i].value;
          progressValue.value = withTiming(1);
        }

        return;
      }

      cumulativeAngle += sliceAngle;
    }
  };

  const gesture = Gesture.Tap().onStart(event => {
    const touchX = event.x - centerX;
    const touchY = event.y - centerY;
    const distance = Math.sqrt(touchX * touchX + touchY * touchY);

    // Check if the tap is within the pie's radius and not in donut hole
    if (distance < height / 2 && distance > height / 2 - borderRadius) {
      const angle = Math.atan2(touchY, touchX);
      const normalizedAngle = angle >= 0 ? angle : angle + 2 * Math.PI;

      //Disable tap if animation is in progress
      if (
        (progress.value !== 0 && progress.value !== 1) ||
        (progressValue.value !== 0 && progressValue.value !== 1)
      ) {
        return;
      }

      runOnJS(onTap)(normalizedAngle);
    } else {
      if (animatedText.value !== 0) {
        progressValue.value = withTiming(0, {duration: 50}, () => {
          animatedText.value = 0;
        });

        return;
      }
    }
  });

  return (
    <View style={[styles.spaceBottom, styles.spaceTop]}>
      <View style={styles.spaceBottom4}>
        <ChartHeader iconName="piechart" label={'Pie Chart'} />
      </View>

      <GestureDetector gesture={gesture}>
        <Svg width={width} height={height} style={styles.spaceBottom24}>
          {data.map((item, index) => (
            <Slice
              index={index}
              key={index}
              item={item}
              data={data}
              progress={progress}
              progressValue={progressValue}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              selectedValue={animatedText}
            />
          ))}
          <TotalLabel animatedText={animatedText} progress={progressValue} />
        </Svg>
      </GestureDetector>

      <Legend progress={progress} selectedValue={animatedText} />
    </View>
  );
});

const styles = StyleSheet.create({
  legendContainer: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerLegendContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBullet: {
    width: 12,
    height: 12,
    marginRight: 4,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 10,
    fontFamily: typography.regular,
  },
  spaceTop: {
    marginTop: 24,
  },
  spaceBottom24: {
    marginBottom: 24,
  },
  spaceBottom: {
    marginBottom: 8,
  },
  spaceBottom4: {
    marginBottom: 4,
  },
  retext: {
    right: 2,
    fontSize: 24,
    color: '#556d36',
    alignSelf: 'center',
    alignItems: 'center',
    fontFamily: typography.bold,
    top: height / 2 - (isIOS ? 14 : 24),
  },
});

export default PieChart;
