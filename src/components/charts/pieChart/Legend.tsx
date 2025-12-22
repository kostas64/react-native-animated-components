import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";

import { TLegend } from "./types";
import Text from "@components/common/Text";
import { data, total, width } from "./data";
import { typography } from "@utils/typography";

type TLegendItem = {
  label: string;
  color: string;
  value: number;
};

type TLegendItemProps = {
  item: TLegendItem;
  index: number;
  step: number;
  progress: SharedValue<number>;
  selectedValue: SharedValue<number>;
};

const LegendItem = ({
  item,
  index,
  step,
  progress,
  selectedValue,
}: TLegendItemProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: !selectedValue.value
      ? interpolate(
          progress.value,
          [index * step, (index + 1) * step],
          [0, 1],
          Extrapolation.CLAMP
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
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View
      key={index}
      style={[animatedStyle, styles.innerLegendContainer]}
    >
      <View style={[styles.legendBullet, { backgroundColor: item.color }]} />
      <Text style={styles.legendLabel}>{`${item.label} (${
        (item.value / total) * 100
      }%)`}</Text>
    </Animated.View>
  );
};

const Legend = ({ progress, selectedValue }: TLegend) => {
  return (
    <Animated.View style={styles.legendContainer}>
      {data.map((item, index) => {
        const dataLength = data.length;
        const step = 1 / dataLength;

        return (
          <LegendItem
            step={step}
            key={index}
            item={item}
            index={index}
            progress={progress}
            selectedValue={selectedValue}
          />
        );
      })}
    </Animated.View>
  );
};

export default Legend;

const styles = StyleSheet.create({
  legendContainer: {
    width,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerLegendContainer: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
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
});
