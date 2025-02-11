import {StyleSheet, View} from 'react-native';

import {TWhoComing} from './types';
import Text from '@components/Text';
import {Colors} from '@utils/colors';
import ItemCounter from './ItemCounter';
import {typography} from '@utils/typography';
import {HEIGHT, MED_FONT_UPSCALE_FACTOR, WIDTH} from '@utils/device';

const WhoComing = ({
  pets,
  adults,
  inflants,
  childs,
  setPets,
  setAdults,
  setChilds,
  setInflants,
}: TWhoComing) => {
  return (
    <>
      <Text
        style={[
          styles.boldWhere,
          HEIGHT > 685 && HEIGHT < 750
            ? styles.marBot24
            : HEIGHT > 750
            ? styles.marBot36
            : styles.marBot16,
          styles.padLeft24,
        ]}
        maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
        {"Who's coming?"}
      </Text>
      <ItemCounter
        disabledLeft={adults === 1 && (pets > 0 || inflants > 0 || childs > 0)}
        label={'Adults'}
        subLabel={'Ages 13 or above'}
        value={adults}
        setValue={setAdults}
      />
      <View style={styles.divider} />
      <ItemCounter
        value={childs}
        setValue={setChilds}
        label={'Children'}
        subLabel={'Ages 2-12'}
        extraOnPress={(child: number) => {
          if (child === 1 && adults === 0) {
            setAdults(1);
          }
        }}
      />
      <View style={styles.divider} />
      <ItemCounter
        value={inflants}
        setValue={setInflants}
        label={'Inflants'}
        subLabel={'Under 2'}
        extraOnPress={(infl: number) => {
          if (infl === 1 && adults === 0) {
            setAdults(1);
          }
        }}
      />
      <View style={styles.divider} />
      <ItemCounter
        value={pets}
        setValue={setPets}
        extraOnPress={(petsValue: number) => {
          if (petsValue === 1 && adults === 0) {
            setAdults(1);
          }
        }}
        label={'Pets'}
        subLabel={'Bringing a service animal?'}
        subLabelStyle={[styles.fontW600, styles.underline]}
      />
    </>
  );
};

export default WhoComing;

const styles = StyleSheet.create({
  boldWhere: {
    fontSize: 28,
    fontFamily: typography.bold,
  },
  padLeft24: {
    paddingLeft: 24,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    marginVertical: 16,
    width: WIDTH - 80,
    alignSelf: 'center',
    backgroundColor: Colors.CHINESE_SILVER,
  },
  fontW600: {
    fontWeight: '600',
  },
  marBot16: {
    marginBottom: 16,
  },
  marBot24: {
    marginBottom: 24,
  },
  marBot36: {
    marginBottom: 36,
  },
});
