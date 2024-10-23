import {
  Text,
  View,
  Image,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from './Button';
import {typography} from '@utils/typography';
import FadeInTransition from './FadeInTransition';

const LessonAdditional = ({
  index,
  containerStyle,
}: {
  index: number;
  containerStyle: StyleProp<ViewStyle>;
}) => {
  const isFocused = useIsFocused();
  return (
    <View style={[containerStyle, {gap: 42}]}>
      <View style={{gap: 14}}>
        <FadeInTransition
          direction="top-scale"
          animate={isFocused}
          index={index}>
          <Text style={styles.title}>Lessons theme</Text>
        </FadeInTransition>
        <FadeInTransition
          direction="top"
          animate={isFocused}
          index={index + 0.5}>
          <Text style={styles.description}>
            Review and extend your knowledge of the present simple, present
            perfect and present continuous tenses.
          </Text>
        </FadeInTransition>
      </View>
      <View style={{gap: 14}}>
        <FadeInTransition
          direction="top-scale"
          animate={isFocused}
          index={index + 1}>
          <Text style={styles.title}>Additional materials</Text>
        </FadeInTransition>
        <FadeInTransition
          direction="top-scale"
          animate={isFocused}
          index={index + 1.5}>
          <View style={styles.booksContainer}>
            <Image
              style={styles.book}
              source={require('@assets/img/screenTransition/grammar1.png')}
            />
            <Image
              style={styles.book}
              source={require('@assets/img/screenTransition/grammar2.png')}
            />
          </View>
        </FadeInTransition>
      </View>
      <FadeInTransition
        direction="top-scale"
        animate={isFocused}
        index={index + 2}>
        <View style={styles.homeworkButtonContainer}>
          <Text style={styles.title}>Homework</Text>
          <View style={styles.homeworkContainer}>
            <Text style={styles.homeworkLabel}>Attached</Text>
            <Ionicons name="checkmark-circle-sharp" size={24} />
          </View>
        </View>
        <Button label="Join class" onPress={() => {}} />
      </FadeInTransition>
    </View>
  );
};

export default LessonAdditional;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: typography.bold,
  },
  description: {
    fontSize: 16,
    color: '#a0a0a0',
    fontFamily: typography.semiBold,
  },
  booksContainer: {
    gap: 4,
    flexDirection: 'row',
  },
  book: {
    width: 116,
    height: 152,
    borderRadius: 8,
  },
  homeworkContainer: {
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: '#edf0fd',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  homeworkLabel: {
    fontSize: 14,
    fontFamily: typography.semiBold,
  },
  homeworkButtonContainer: {
    gap: 12,
    marginBottom: 16,
  },
});
