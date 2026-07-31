import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './src/app/providers/AppProvider';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { SplashScreen } from './src/screens/public/SplashScreen';
import { Toast } from './src/components/common/Toast';
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider>
          <AppContent />
          <Toast />
        </AppProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;