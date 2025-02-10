import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import Timer from './Timer';
import {shadows} from './styles';
import {CardDetailProps} from './types';
import {validateBiometrics} from './utils';
import SectionHeader from './SectionHeader';
import CardDetailRow from './CardDetailRow';

const MINUTES = 10;
const SECONDS_IN_MINUTE = 60;
const SESSION = MINUTES * SECONDS_IN_MINUTE;

const CardDetail = ({
  cardNumber,
  cardholderName,
  expirationDate,
  style,
}: CardDetailProps) => {
  let timer: number | null = null;
  const [sessionLeft, setSessionLeft] = useState(SESSION);
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

  const refreshSession = useCallback(() => {
    setSessionLeft(SESSION);
  }, []);

  useEffect(() => {
    if (sessionLeft <= 0) {
      !!timer && clearInterval(timer);
      setSessionLeft(SESSION);
      setShowData(false);
    }
  }, [sessionLeft]);

  useEffect(() => {
    if (showData) {
      timer = setInterval(() => {
        setSessionLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => {
        !!timer && clearInterval(timer);
      };
    }
  }, [showData]);

  return (
    <>
      <View style={style}>
        <SectionHeader
          label="Card Detail"
          rightLabel="Show All"
          onPress={onPressShowData}
        />

        <View style={[styles.boxContainer, shadows.veryJustShadow]}>
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
      {showData && (
        <Timer
          onPress={refreshSession}
          time={sessionLeft}
          style={styles.timerContainer}
        />
      )}
    </>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  boxContainer: {
    marginRight: 24,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  pressedFirst: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pressedLast: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  timerContainer: {
    position: 'absolute',
    bottom: 156,
  },
});
