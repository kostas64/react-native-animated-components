import {
  View,
  StyleSheet,
  ImageBackground,
  LayoutChangeEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';

import Footer from '@components/uncommonBottomSheet/Footer';
import StatusBarManager from '@components/StatusBarManager';
import BottomSheet, {BottomSheetRef} from '@components/BottomSheet';
import Header from '@components/uncommonBottomSheet/sheetContent/Header';
import People from '@components/uncommonBottomSheet/sheetContent/People';
import {shadow} from '@components/uncommonBottomSheet/sheetContent/styles';
import Location from '@components/uncommonBottomSheet/sheetContent/Location';

const SHEET_LINE_HEIGHT = 28;
const background = require('@assets/img/camp.png');

const UncommonBottomSheetScreen = () => {
  const navigation = useNavigation();
  const [scrollToPosition, setScrollToPosition] = React.useState(0);
  const [sheetContentHeight, setSheetContentHeight] = React.useState(0);

  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const modalHeight =
    sheetContentHeight + -scrollToPosition - SHEET_LINE_HEIGHT;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setScrollToPosition(-(e.nativeEvent.layout.height + SHEET_LINE_HEIGHT));
  }, []);

  const onSheetContentLayout = useCallback((e: LayoutChangeEvent) => {
    setSheetContentHeight(e.nativeEvent.layout.height + 20 + SHEET_LINE_HEIGHT);
  }, []);

  useEffect(() => {
    if (!!scrollToPosition && !!sheetContentHeight) {
      bottomSheetRef.current?.scrollTo(-modalHeight);
    }
  }, [scrollToPosition, sheetContentHeight]);

  return (
    <>
      <StatusBarManager barStyle="dark" />
      <ImageBackground style={styles.flex} source={background} />
      <BottomSheet
        ref={bottomSheetRef}
        modalHeight={modalHeight}
        backdropOpacity={1}
        scrollToPosition={scrollToPosition}
        onBackPress={() => navigation.goBack()}
        lineStyle={styles.sheetLineStyle}
        lineStyleContainer={styles.sheetLineContainer}>
        <View style={styles.sheetContainer}>
          <View onLayout={onSheetContentLayout}>
            <Header />
            <Location containerStyle={[styles.locationContainer, shadow]} />
            <People />
          </View>
        </View>
      </BottomSheet>
      <Footer onLayout={onLayout} containerStyle={styles.footerContainer} />
    </>
  );
};

export default UncommonBottomSheetScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  sheetContainer: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#f3efec',
  },
  sheetLineStyle: {
    backgroundColor: '#d2d2d2',
    width: 36,
  },
  sheetLineContainer: {
    backgroundColor: '#f3efec',
  },

  locationContainer: {
    marginVertical: 20,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
  },
});
