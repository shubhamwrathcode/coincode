import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Bell, User } from 'lucide-react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';

export type TabName = 'Overview' | 'Spot' | 'Futures' | 'Margin' | 'Earn' | 'Bot' | 'Copy Trading';
const TABS: TabName[] = ['Overview', 'Spot', 'Futures', 'Margin', 'Earn', 'Bot', 'Copy Trading'];

interface AssetsHeaderProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

export const AssetsHeader = ({ activeTab, onTabChange }: AssetsHeaderProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.tabsWrapper}>
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
                  size={16}
                  style={{
                    fontFamily: isActive ? fonts.bold : fonts.medium,
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

      <View style={styles.iconsWrapper}>
        <TouchableOpacity style={styles.iconButton}>
          <Bell color={colors.white} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <User color={colors.white} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
  },
  tabsWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  tabItem: {
    marginRight: 20,
    height: 50,
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 6,
    width: 25,
    alignSelf: 'center',
    height: 3,
    borderRadius: 2,
  },
  iconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  iconButton: {
    marginLeft: 15,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
});
