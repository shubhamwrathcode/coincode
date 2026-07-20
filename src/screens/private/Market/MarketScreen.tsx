import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { MarketHeader } from './components/MarketHeader';
import { TopTabs, TabName } from './components/TopTabs';
import { FavoritesTab } from './components/FavoritesTab';
import { SpotTab } from './components/SpotTab';
import { Typography } from '../../../components/common/Typography';

export const MarketScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabName>('Favorites');

  const renderContent = () => {
    switch (activeTab) {
      case 'Favorites':
        return <FavoritesTab />;
      case 'Spot':
        return <SpotTab />;
      case 'USD(S)-M Futures':
      case 'COIN-M Futures':
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
      <MarketHeader />
      <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
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
