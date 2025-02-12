import {WIDTH} from '@utils/device';
import {StyleSheet, View} from 'react-native';

import Text from '@components/common/Text';
import {Colors} from '@utils/colors';

const TicketPart = ({
  isFirstCard = false,
  isLastCard = false,
  hasTopDash = true,
  hasBottomDash = true,
  children,
}: {
  isFirstCard?: boolean;
  isLastCard?: boolean;
  hasTopDash?: boolean;
  hasBottomDash?: boolean;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <View style={styles.overflow}>
      {hasTopDash && (
        <View style={styles.overflow}>
          <View style={styles.dashedLine} />
        </View>
      )}
      <View
        style={[
          styles.cardContainer,
          isFirstCard && styles.topBorder,
          isLastCard && styles.bottomBorder,
        ]}>
        {children}
      </View>
      {hasBottomDash && (
        <View style={styles.overflow}>
          <View style={styles.dashedLine} />
        </View>
      )}
      {!isFirstCard && <View style={[styles.corner, styles.topLeft]} />}
      {!isFirstCard && <View style={[styles.corner, styles.topRight]} />}
      {!isLastCard && <View style={[styles.corner, styles.bottomLeft]} />}
      {!isLastCard && <View style={[styles.corner, styles.bottomRight]} />}
    </View>
  );
};

const TicketScreen = () => {
  return (
    <View style={styles.container}>
      <TicketPart isFirstCard hasTopDash={false}>
        <Text>Ryanain 757</Text>
      </TicketPart>
      <TicketPart hasBottomDash={false} hasTopDash={false}>
        <Text>Ryanain 717</Text>
      </TicketPart>
      <TicketPart isLastCard hasBottomDash={false}>
        <Text>Ryanain 737</Text>
        <Text>Ryanain 737</Text>
        <Text>Ryanain 737</Text>
        <Text>Ryanain 737</Text>
        <Text>Ryanain 737</Text>
      </TicketPart>
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  cardContainer: {
    width: WIDTH - 48,
    padding: 24,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.CHINESE_WHITE,
  },
  topBorder: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: Colors.CHINESE_WHITE,
  },
  bottomBorder: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomWidth: 1,
    borderColor: Colors.CHINESE_WHITE,
  },
  overflow: {
    overflow: 'hidden',
  },
  dashedLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.CHINESE_WHITE,
    margin: -1,
    height: 0,
    marginBottom: 0,
  },
  corner: {
    height: 24,
    width: 24,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.CHINESE_WHITE,
  },
  topLeft: {
    top: -12,
    left: -12,
  },
  topRight: {
    top: -12,
    right: -12,
  },
  bottomLeft: {
    bottom: -12,
    left: -12,
  },
  bottomRight: {
    bottom: -12,
    right: -12,
  },
});
