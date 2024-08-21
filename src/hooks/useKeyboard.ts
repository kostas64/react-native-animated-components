import React from 'react';
import {isAndroid} from '@utils/device';
import {Keyboard, KeyboardEvent} from 'react-native';

export const useKeyboard = (considerAndroid = false) => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (!considerAndroid && isAndroid) {
      return () => {};
    }

    function onKeyboardHide() {
      setKeyboardHeight(0);
    }

    function onKeyboardShow(e: KeyboardEvent) {
      setKeyboardHeight(e.endCoordinates.height);
    }

    const showSubscription = Keyboard.addListener(
      isAndroid ? 'keyboardDidShow' : 'keyboardWillShow',
      onKeyboardShow,
    );

    const hideSubscription = Keyboard.addListener(
      isAndroid ? 'keyboardDidHide' : 'keyboardWillHide',
      onKeyboardHide,
    );

    return () => {
      !!hideSubscription && hideSubscription.remove();
      !!showSubscription && showSubscription.remove();
    };
  }, [considerAndroid]);

  return keyboardHeight;
};
