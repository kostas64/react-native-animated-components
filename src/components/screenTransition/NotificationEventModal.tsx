import {StyleSheet, View} from 'react-native';

import Button from './Button';
import Text from '@components/common/Text';
import {Colors} from '@utils/colors';
import {typography} from '@utils/typography';
import {NotificationEventProps} from './types';
import FadeInTransition from './FadeInTransition';
import {MED_FONT_UPSCALE_FACTOR} from '@utils/device';
import {useModalContext} from '@providers/ModalProvider';

const NotificationEventModal = ({event}: {event: NotificationEventProps}) => {
  const {closeModal} = useModalContext();

  return (
    <View style={[styles.container, {backgroundColor: event.backgroundColor}]}>
      <View style={styles.iconContainer}>
        <event.component name={event.iconName} size={32} />
      </View>
      <FadeInTransition direction="top" index={0} animate>
        <View style={styles.gap4}>
          <Text
            style={styles.eventTitle}
            maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
            {event.eventTitle}
          </Text>
          <Text
            style={styles.description}
            maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
            {event.description}
          </Text>
        </View>
      </FadeInTransition>
      <FadeInTransition direction="top" index={1} animate>
        <Button label="Lessons materials" onPress={closeModal} />
      </FadeInTransition>
    </View>
  );
};

export default NotificationEventModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  iconContainer: {
    padding: 24,
    borderRadius: 24,
    alignSelf: 'flex-start',
    backgroundColor: Colors.WHITE,
  },
  eventTitle: {
    fontFamily: typography.bold,
    fontSize: 20,
  },
  description: {
    color: Colors.QUICK_SILVER,
    fontFamily: typography.semiBold,
    fontSize: 18,
  },
  gap4: {
    gap: 4,
  },
});
