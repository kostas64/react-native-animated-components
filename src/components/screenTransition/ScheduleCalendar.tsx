import { StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { DAYS } from "./data";
import { Colors } from "@utils/colors";
import Text from "@components/common/Text";
import { typography } from "@utils/typography";
import { ScheduleCalendarProps } from "./types";
import FadeInTransition from "./FadeInTransition";

const ScheduleCalendar = ({ index }: ScheduleCalendarProps) => {
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <View style={[styles.rowCenter, styles.between]}>
        <Text style={styles.thisWeek}>This week</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      <FadeInTransition animate={isFocused} index={index} direction="top-scale">
        <View style={[styles.rowCenter, styles.between]}>
          {DAYS.map((day, index) => (
            <View key={`calendar-day-${index}`} style={styles.daysContainer}>
              <Text style={styles.day}>{day}</Text>
              <View
                style={[
                  styles.dayNumberContainer,
                  index === 5 && styles.selectedDayContainer,
                ]}
              >
                <Text
                  style={[styles.dayNumber, index === 5 && styles.white]}
                >{`${(index + 4) % 10 > 1 ? "0" : ""}${index + 4}`}</Text>
              </View>
            </View>
          ))}
        </View>
      </FadeInTransition>
    </View>
  );
};

export default ScheduleCalendar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 24,
    borderRadius: 20,
    backgroundColor: Colors.CULTURED,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  between: {
    justifyContent: "space-between",
  },
  thisWeek: {
    fontSize: 20,
    fontFamily: typography.bold,
  },
  seeAll: {
    fontSize: 16,
    fontFamily: typography.bold,
  },
  daysContainer: {
    gap: 10,
    alignItems: "center",
  },
  selectedDayContainer: {
    borderRadius: 12,
    backgroundColor: Colors.BLACK,
  },
  day: {
    fontSize: 12,
    fontFamily: typography.semiBold,
    color: Colors.PHILIPPINE_SILVER,
  },
  dayNumberContainer: {
    padding: 8,
  },
  dayNumber: {
    fontSize: 16,
    fontFamily: typography.medium,
  },
  white: {
    color: Colors.WHITE,
  },
});
