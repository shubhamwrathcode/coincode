import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { History, FileX2 } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

const TABS = ['Positions (0)', 'Orders (0)', 'Assets'];

export const TradeBottomTabs = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabsRow}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabItem}>
                <Typography size={14} style={{ fontFamily: isActive ? fonts.bold : fonts.regular, color: isActive ? colors.white : colors.grey }}>
                  {tab}
                </Typography>
                {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity>
          <FastImage source={ImageAssets.historyIcon} style={{ width: 18, height: 18 }} resizeMode='contain' />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FastImage source={ImageAssets.noData} style={{ width: 80, height: 80 }} resizeMode='contain' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#161719',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    marginRight: 20,
    paddingVertical: 10,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    height: 3,
    width: 20,
    alignSelf: 'center',
    borderRadius: 2,
  },
  content: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
