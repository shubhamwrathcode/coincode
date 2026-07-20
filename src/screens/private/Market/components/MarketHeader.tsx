import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Search, Bell, MoreHorizontal } from 'lucide-react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';

export const MarketHeader = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Typography size={25} style={{ fontFamily: fonts.semiBold }}>
          Market
        </Typography>

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Search color={colors.white} size={22} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Bell color={colors.white} size={22} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={[styles.searchBar, {
          backgroundColor: '#0F1012',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.05)',
        }]}>
          <Search color={colors.grey} size={18} style={styles.searchIcon} />
          <TextInput
            placeholder="Search for market"
            placeholderTextColor={colors.grey}
            style={[styles.searchInput, { color: colors.white }]}
          />
        </View>
        <TouchableOpacity style={[styles.moreButton, {
          backgroundColor: '#0F1012',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.05)',
        }]}>
          <MoreHorizontal color={colors.grey} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 15,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular', // Need to make sure this is available or use fonts.regular
  },
  moreButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
