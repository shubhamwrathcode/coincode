import React, { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../../theme/ThemeProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
