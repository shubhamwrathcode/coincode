import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';

export type TabName = 'Favorites' | 'Spot' | 'USD(S)-M Futures' | 'COIN-M Futures';
const TABS: TabName[] = ['Favorites', 'Spot', 'USD(S)-M Futures', 'COIN-M Futures'];

interface TopTabsProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

export const TopTabs = ({ activeTab, onTabChange }: TopTabsProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tabItem}
              onPress={() => onTabChange(tab)}
            >
              <Typography
                size={14}
                style={{
                  fontFamily: fonts.bold,
                  color: isActive ? colors.cyan : colors.grey
                }}
              >
                {tab}
              </Typography>
              {isActive && (
                <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  tabItem: {
    marginRight: 15,
    height: 50, // Fixed height to match container
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 6, // Raised slightly to prevent clipping
    width: 25,
    alignSelf: 'center',
    height: 4, // Slightly thicker
    borderRadius: 2, // Fully rounded
  },
});
