import {
  interpolate,
  interpolateColor,
  useAnimatedProps,
} from "react-native-reanimated";

import { TSlice } from "./types";
import { gapSize, total } from "./data";
import { createRoundedPieSlicePath } from "./utils";
import { AnimatedPath } from "@components/common/AnimatedComponents";

const Slice = ({
  item,
  index,
  data,
  progress,
  innerRadius,
  outerRadius,
  selectedValue,
  progressValue,
}: TSlice) => {
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

  const animatedProps = useAnimatedProps(() => {
    const endShared = interpolate(
      progress.value,
      [0, 1],
      [
        data.length === 1 ? 0 : startAngleLocal.reduce((a, b) => a + b, 0),
        data.length === 1 ? 2 * Math.PI : endAngle,
      ]
    );

    const path = createRoundedPieSlicePath(
      data.length === 1 ? 0 : startAngleLocal.reduce((a, b) => a + b, 0),
      endShared,
      innerRadius,
      outerRadius
    );

    const isSelected =
      !!selectedValue.value && selectedValue.value === item.value;

    return {
      d: path,
      stroke: isSelected
        ? interpolateColor(
            progressValue.value,
            [0, 1],
            ["transparent", "black"]
          )
        : interpolateColor(
            progressValue.value,
            [0, 1],
            ["black", "transparent"]
          ),
      strokeWidth: isSelected
        ? interpolate(progressValue.value, [0, 1], [0, 2])
        : 0,
    };
  }, []);

  return (
    <AnimatedPath
      fill={item.color}
      pointerEvents={"none"}
      onResponderStart={() => {}}
      animatedProps={animatedProps}
    />
  );
};

export default Slice;
