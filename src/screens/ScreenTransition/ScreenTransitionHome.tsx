import {useIsFocused} from '@react-navigation/native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {isIOS} from '@utils/device';
import {Colors} from '@utils/colors';
import {EVENTS} from '@components/screenTransition/data';
import SearchBar from '@components/screenTransition/SearchBar';
import HomeClass from '@components/screenTransition/HomeClass';
import HomeEvent from '@components/screenTransition/HomeEvent';
import HomeHeader from '@components/screenTransition/HomeHeader';
import TextBetween from '@components/screenTransition/TextBetween';
import FadeInTransition from '@components/screenTransition/FadeInTransition';

const ScreenTransitionHome = () => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const paddingTop =
    insets.top > 24 ? (isIOS ? insets.top : insets.top + 12) : 32;
  const bottom = insets.top <= 52 ? 30 : insets.bottom + 8;
  const paddingBottom = 96 + bottom;

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.container, {marginTop: paddingTop}]}
        contentContainerStyle={{paddingBottom}}>
        <FadeInTransition
          index={0}
          animate={isFocused}
          direction="left"
          containerStyle={styles.spaceHor}>
          <HomeHeader />
        </FadeInTransition>
        <FadeInTransition
          index={1}
          animate={isFocused}
          direction="top"
          containerStyle={[styles.spaceTop, styles.spaceHor]}>
          <SearchBar />
        </FadeInTransition>
        <TextBetween
          index={2}
          title="Next class"
          label="See all"
          animate={isFocused}
          containerStyle={[styles.spaceTop, styles.spaceHor]}
        />
        <FadeInTransition
          index={3}
          animate={isFocused}
          direction="top"
          containerStyle={[styles.smSpaceHor, styles.smSpaceTop]}>
          <HomeClass />
        </FadeInTransition>
        <TextBetween
          index={4}
          title="Events"
          label="See all"
          animate={isFocused}
          containerStyle={[styles.spaceTop, styles.spaceHor]}
        />
        {EVENTS.map((event, index) => (
          <FadeInTransition
            key={`event-${index}`}
            direction="top"
            animate={isFocused}
            index={5 + index * 0.25}
            containerStyle={[
              styles.smSpaceHor,
              index === 0 ? styles.smSpaceTop : styles.xxsmSpaceTop,
            ]}>
            <HomeEvent
              source={event.source}
              eventTitle={event.eventTitle}
              eventDate={event.eventDate}
              containerStyle={{backgroundColor: event.backgroundColor}}
            />
          </FadeInTransition>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScreenTransitionHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  spaceHor: {
    paddingHorizontal: 24,
  },
  smSpaceHor: {
    paddingHorizontal: 8,
  },
  spaceTop: {
    marginTop: 24,
  },
  smSpaceTop: {
    marginTop: 16,
  },
  xxsmSpaceTop: {
    marginTop: 4,
  },
});
