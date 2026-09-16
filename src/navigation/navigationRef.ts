import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const resetToGuest = () => {
  const go = () => {
    if (!navigationRef.isReady()) return false;

    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LandingPage' }],
      }),
    );
    return true;
  };

  if (go()) return;

  // Navigator remounting after auth flip — retry shortly
  setTimeout(() => {
    go();
  }, 50);
};
