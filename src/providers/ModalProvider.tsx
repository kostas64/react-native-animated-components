import React from 'react';
import {ViewStyle} from 'react-native';

import {BottomSheetRef} from '@components/common/types';
import BottomSheet from '@components/common/BottomSheet';

const initialState: TInitialState = {
  content: <></>,
  modalHeight: 0,
  onBackPress: () => {},
  panEnabled: true,
  withoutLine: false,
  lineStyle: {},
  lineStyleContainer: {},
  contentContainerStyle: {},
};

type TInitialState = {
  content: React.ReactNode;
  modalHeight: number;
  onBackPress?: () => void;
  panEnabled?: boolean;
  withoutLine?: boolean;
  lineStyle?: ViewStyle;
  lineStyleContainer?: ViewStyle;
  contentContainerStyle?: any;
};

interface ModalContextType {
  modalInfo: TInitialState;
  setModalInfo: React.Dispatch<React.SetStateAction<TInitialState>>;
  resetModal: () => void;
  closeModal: () => void;
}

const ModalContext = React.createContext<ModalContextType>({
  modalInfo: initialState,
  setModalInfo: () => {},
  resetModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const bottomSheetRef = React.useRef<BottomSheetRef>(null);

  const [modalInfo, setModalInfo] = React.useState(initialState);

  //** ----- FUNCTIONS -----
  const closeModal = React.useCallback(() => {
    bottomSheetRef?.current?.scrollTo(0);
  }, []);

  const resetModal = React.useCallback(() => {
    setModalInfo(initialState);
  }, []);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (modalInfo.content && modalInfo.modalHeight) {
      bottomSheetRef?.current?.scrollTo(-modalInfo.modalHeight);
    }
  }, [modalInfo]);

  return (
    <ModalContext.Provider
      value={{modalInfo, setModalInfo, resetModal, closeModal}}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        withoutLine={modalInfo.withoutLine}
        panEnabled={modalInfo.panEnabled}
        onBackPress={modalInfo.onBackPress}
        modalHeight={modalInfo.modalHeight || 0}
        lineStyle={modalInfo.lineStyle}
        lineStyleContainer={modalInfo.lineStyleContainer}
        contentContainerStyle={modalInfo.contentContainerStyle}>
        {modalInfo.content}
      </BottomSheet>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return React.useContext(ModalContext);
};
