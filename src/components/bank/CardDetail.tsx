import {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {shadows} from './styles';
import {Colors} from '@utils/colors';
import {CardDetailProps} from './types';
import {isAndroid} from '@utils/device';
import {validateBiometrics} from './utils';
import SectionHeader from './SectionHeader';
import CardDetailRow from './CardDetailRow';

const CardDetail = ({
  cardNumber,
  cardholderName,
  expirationDate,
  style,
}: CardDetailProps) => {
  const [showData, setShowData] = useState(false);

  const onPressShowData = async () => {
    if (showData) {
      return;
    }

    validateBiometrics()
      .then(resultObject => {
        if (resultObject?.success) {
          setShowData(true);
        }
      })
      .catch(e => console.log('No biometrics ', e));
  };

  return (
    <>
      <View style={style}>
        <SectionHeader
          label="Card Detail"
          rightLabel="Show All"
          onPress={onPressShowData}
        />

        <View
          style={[
            styles.boxContainer,
            isAndroid ? styles.border : shadows.veryJustShadow,
          ]}>
          <CardDetailRow
            hidden={!showData}
            label={'Holder Name'}
            value={cardholderName}
            pressedStyle={styles.pressedFirst}
          />
          <CardDetailRow
            hidden={!showData}
            label={'Card Number'}
            value={cardNumber}
          />
          <CardDetailRow
            hidden={!showData}
            label={'Exp. Date'}
            value={expirationDate}
            pressedStyle={styles.pressedLast}
          />
        </View>
      </View>
    </>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  boxContainer: {
    marginRight: 24,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  pressedFirst: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pressedLast: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.PLATINUM,
  },
});
