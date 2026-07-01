import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { AppProvider } from './src/app/providers/AppProvider';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { SplashScreen } from './src/screens/public/SplashScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AppContent = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return <RootNavigator />;
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default App;