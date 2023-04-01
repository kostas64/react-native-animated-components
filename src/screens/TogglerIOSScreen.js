import React from 'react';
import TogglerIOS from '../components/TogglerIOS';
import StatusBarManager from '../components/StatusBarManager';

const TogglerIOSScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />
      <TogglerIOS />
    </>
  );
};

export default TogglerIOSScreen;
