import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {shadows} from './styles';
import {Colors} from '@utils/colors';
import {CardDetailProps} from './types';
import {isAndroid} from '@utils/device';
import {validateBiometrics} from './utils';
import SectionHeader from './SectionHeader';
import CardDetailRow from './CardDetailRow';
import {useToastContext} from '@providers/ToastProvider';

const CardDetail = ({
  cardNumber,
  cardholderName,
  expirationDate,
  style,
}: CardDetailProps) => {
  const {showToast} = useToastContext();

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

  const onPressCopy = ({field, value}: {field: string; value: string}) => {
    Clipboard.setString(value);
    showToast(`✓  ${field} copied to clipboard`);
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
            onPress={onPressCopy}
            pressedStyle={styles.pressedFirst}
          />
          <CardDetailRow
            hidden={!showData}
            label={'Card Number'}
            value={cardNumber}
            onPress={onPressCopy}
          />
          <CardDetailRow
            hidden={!showData}
            label={'Exp. Date'}
            value={expirationDate}
            onPress={onPressCopy}
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
