import React from 'react';
import { AppProvider } from './src/app/providers/AppProvider';
import { RootNavigator } from './src/app/navigation/RootNavigator';

const App = () => {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
};

export default App;