import { Svg } from "react-native-svg";
import { StyleSheet, View } from "react-native";
import React, { useImperativeHandle } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Easing, withTiming, useSharedValue } from "react-native-reanimated";

import {
  data,
  total,
  width,
  height,
  centerX,
  centerY,
  borderRadius,
} from "./data";
import Slice from "./Slice";
import Legend from "./Legend";
import TotalLabel from "./TotalLabel";
import ChartHeader from "../ChartHeader";

const PieChart = React.forwardRef((_, ref) => {
  const progress = useSharedValue(0);
  const progressValue = useSharedValue(0);
  const animatedText = useSharedValue(0);

  const outerRadius = Math.min(width, height - 4) / 2;
  const innerRadius = outerRadius - borderRadius;

  const animate = (forward = true) => {
    if (animatedText.value !== 0) {
      progressValue.value = withTiming(0, { duration: 75 }, () => {
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
          progressValue.value = withTiming(0, { duration: 150 });
          animatedText.value = 0;
          return;
        }

        if (animatedText.value !== 0) {
          progressValue.value = withTiming(0, { duration: 150 }, (finished) => {
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

  const gesture = Gesture.Tap().onStart((event) => {
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

      scheduleOnRN(onTap, normalizedAngle);
    } else {
      if (animatedText.value !== 0) {
        progressValue.value = withTiming(0, { duration: 50 }, () => {
          animatedText.value = 0;
        });

        return;
      }
    }
  });

  return (
    <View style={[styles.spaceBottom, styles.spaceTop]}>
      <View style={styles.spaceBottom4}>
        <ChartHeader iconName="pie-chart" label={"Pie Chart"} />
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

PieChart.displayName = "PieChart";

const styles = StyleSheet.create({
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
});

export default PieChart;
