import React from 'react';
import DotLoader from '../components/DotLoader';
import StatusBarManager from '../components/StatusBarManager';

const DotLoaderScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />
      <DotLoader />
    </>
  );
};

export default DotLoaderScreen;
