import DotLoader from '@components/common/DotLoader';
import StatusBarManager from '@components/common/StatusBarManager';

const DotLoaderScreen = () => {
  return (
    <>
      <StatusBarManager barStyle="dark" />
      <DotLoader />
    </>
  );
};

export default DotLoaderScreen;
