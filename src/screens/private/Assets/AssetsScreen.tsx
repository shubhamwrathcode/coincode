import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { AssetsHeader, TabName } from './components/AssetsHeader';
import { Typography } from '../../../components/common/Typography';
import { OverviewTab } from './components/OverviewTab';
import { SpotTab } from './components/SpotTab';
import { FuturesTab } from './components/FuturesTab';
import { MarginTab } from './components/MarginTab';
export const AssetsScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabName>('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab />;
      case 'Spot':
        return <SpotTab />;
      case 'Futures':
        return <FuturesTab />;
      case 'Margin':
        return <MarginTab />;
      default:
        return (
          <View style={styles.placeholderContainer}>
            <Typography size={16} style={{ color: colors.grey }}>
              {activeTab} Content Coming Soon
            </Typography>
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.black, paddingTop: insets.top }]}>
      <AssetsHeader activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
