import {
  Defs,
  Svg,
  Stop,
  Rect,
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
import {StyleSheet, View} from 'react-native';
import React, {useImperativeHandle} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {
  isIOS,
  isAndroid,
  SM_FONT_UPSCALE_FACTOR,
  XSM_FONT_UPSCALE_FACTOR,
} from '@utils/device';
import {days} from './data';
import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import ReText from '@components/common/ReText';
import {ChartRef, TProps} from './types';
import {typography} from '@utils/typography';
import {AnimatedPath} from '@components/common/AnimatedComponents';

const AnimatedLineChart = React.forwardRef<ChartRef, TProps>((props, ref) => {
  const {
    data,
    width,
    height,
    noGrid,
    strokeColor,
    strokeBackground,
    shouldCancelWhenOutsideGesture = true,
  } = props;
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
  const formattedText = useDerivedValue(() => {
    return ` ${animatedText.value ? animatedText.value : ''}`;
  });

  const retextStyle = [
    styles.chartHeaderLabel,
    strokeColor ? {color: strokeColor} : {},
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
    .shouldCancelWhenOutside(shouldCancelWhenOutsideGesture)
    .onBegin(e => {
      if (e.x >= 0 && e.x <= width && e.y >= 0 && e.y <= height) {
        indicatorPos.value = e.x - 1;
        animatedText.value = `${data[Math.floor(e.x / step)]}`;
      }
    })
    .onStart(e => {
      if (e.x >= 0 && e.x <= width && e.y >= 0 && e.y <= height) {
        indicatorPos.value = e.x - 1;
        animatedText.value = `${data[Math.floor(e.x / step)]}`;
      }
    })
    .onChange(e => {
      if (e.x >= 0 && e.x <= width && e.y >= 0 && e.y <= height) {
        indicatorPos.value = e.x - 1;
        animatedText.value = `${data[Math.floor(e.x / step)]}`;

        if (Math.floor(e.x / step) === data.length) {
          animatedText.value = `${data?.[data?.length - 1]}`;
        }
      }
    })
    .onFinalize(() => {
      indicatorPos.value = -1;
      animatedText.value = '';
    });

  return (
    <View>
      <View
        style={[
          styles.chartBaseContainer,
          noGrid && styles.noBorder,
          {height, width},
        ]}>
        {/* Y Axis Values */}
        {!noGrid && (
          <View style={[styles.stepValueContainer, {height}]}>
            {stepValues.map((value, index) => (
              <Text
                key={index}
                style={styles.stepValueLabel}
                maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}>
                {value}
              </Text>
            ))}
          </View>
        )}
        {!noGrid &&
          iterateV.map((_, index) => (
            <View
              key={`vertival-${index}`}
              style={[
                styles.verticalL,
                {width: width - 2, top: (height / 5 - 1) * (index + 1)},
              ]}
            />
          ))}
        {!noGrid &&
          iterateH.map((_, index) => (
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
            <Stop
              offset="0%"
              stopOpacity="0.5"
              stopColor={strokeColor || '#3e5a1d'}
            />
            <Stop
              offset="100%"
              stopColor={strokeColor || '#3e5a1d'}
              stopOpacity="0"
            />
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
          stroke={strokeColor || '#3e5a1d'}
          strokeWidth={3}
          animatedProps={animatedProps}
        />
      </Svg>

      {/* X Axis Values */}
      {!noGrid && (
        <View style={styles.yAxisContainer}>
          {days.map((day, index) => (
            <View key={`x-axis-${index}`}>
              <Text
                style={[styles.day, {width: width / 8}]}
                maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
                {day}
              </Text>
              <Text
                style={[styles.dayNumber, {width: width / 8}]}
                maxFontSizeMultiplier={SM_FONT_UPSCALE_FACTOR}>
                {index + 5}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Indicator */}
      <Animated.View style={[indicatorStyle, styles.indicator, {height}]} />
      {/* ReText */}
      <Animated.View
        style={[
          styles.retextContainer,
          strokeBackground ? {backgroundColor: strokeBackground} : {},
          retextPosStyle,
        ]}>
        <ReText
          text={formattedText}
          style={retextStyle}
          maxFontSizeMultiplier={XSM_FONT_UPSCALE_FACTOR}
        />
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <View style={[styles.lineChartGestureArea, {width, height}]} />
      </GestureDetector>
    </View>
  );
});

AnimatedLineChart.displayName = 'AnimatedLineChart';

export default AnimatedLineChart;

const styles = StyleSheet.create({
  chartHeaderLabel: {
    lineHeight: 20,
    color: Colors.DARK_OLIVE_GREEN,
    fontFamily: typography.bold,
  },
  lineH19: {
    lineHeight: 17,
  },
  androidReText: {
    height: 32,
    lineHeight: 10,
    top: 4,
  },
  yAxisContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  day: {
    color: Colors.DARK_CHARCOAL,
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
    backgroundColor: Colors.CHINESE_BLACK,
    borderRadius: 10,
  },
  retextContainer: {
    top: -36,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: Colors.WHITE_COFFEE,
    paddingHorizontal: 8,
    paddingLeft: isIOS ? 6 : 0,
    paddingRight: isIOS ? 8 : 2,
    minWidth: 46,
    paddingVertical: isIOS ? 6 : 0,
    borderRadius: 8,
  },
  lineChartGestureArea: {
    position: 'absolute',
    backgroundColor: Colors.TRANSPARENT,
  },
  verticalL: {
    height: 1,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  horizontalL: {
    width: 1,
    position: 'absolute',
    backgroundColor: Colors.LIGHT_GRAY,
  },
  chartBaseContainer: {
    backgroundColor: Colors.TRANSPARENT,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
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
    color: Colors.DARK_CHARCOAL,
    fontFamily: typography.light,
  },
  noBorder: {
    borderWidth: 0,
  },
});
