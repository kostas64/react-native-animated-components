import React from 'react';
import ProgressLoader from '../components/ProgressLoader';
import StatusBarManager from '../components/StatusBarManager';

const ProgressLoaderScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />
      <ProgressLoader />
    </>
  );
};

export default ProgressLoaderScreen;
