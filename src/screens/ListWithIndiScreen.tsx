import React from 'react';
import StatusBarManager from '../components/StatusBarManager';
import ListWithIndicator from '../components/ListWithIndicator';

const ListWithIndiScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="light" />
      <ListWithIndicator />
    </>
  );
};

export default ListWithIndiScreen;
