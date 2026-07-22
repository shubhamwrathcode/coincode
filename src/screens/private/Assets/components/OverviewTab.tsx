import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Eye, ChevronRight, Download, ShoppingCart, Users, Building } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { TotalAssetsCard } from './TotalAssetsCard';

export const OverviewTab = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TotalAssetsCard imageSource={ImageAssets.overviewWalletImg} />

      <Typography size={15} style={{ fontFamily: fonts.semiBold, marginTop: 20, marginBottom: 12 }}>
        I Have Existing Crypto Assets
      </Typography>

      <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.inputBgColor }]}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 255, 255, 0.05)' }]}>
          <Download color={colors.cyan} size={18} />
        </View>
        <View style={styles.actionTextContainer}>
          <Typography size={14} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
            Deposit Crypto
          </Typography>
          <Typography size={12} style={{ color: colors.grey }}>
            Use your deposit address to quickly add funds via the blockchain.
          </Typography>
        </View>
        <ChevronRight color={colors.grey} size={18} />
      </TouchableOpacity>

      <Typography size={15} style={{ fontFamily: fonts.semiBold, marginTop: 20, marginBottom: 12 }}>
        No Assets Yet?
      </Typography>

      <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.inputBgColor }]}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 255, 255, 0.05)' }]}>
          <ShoppingCart color={colors.cyan} size={18} />
        </View>
        <View style={styles.actionTextContainer}>
          <Typography size={14} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
            Buy Crypto Directly
          </Typography>
          <Typography size={12} style={{ color: colors.grey }}>
            Over 70 payment methods to choose from.
          </Typography>
        </View>
        <ChevronRight color={colors.grey} size={18} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.inputBgColor }]}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 255, 255, 0.05)' }]}>
          <Users color={colors.cyan} size={18} />
        </View>
        <View style={styles.actionTextContainer}>
          <Typography size={14} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
            P2P
          </Typography>
          <Typography size={12} style={{ color: colors.grey }}>
            Trusted merchants and your preferred payment methods, with zero fees.
          </Typography>
        </View>
        <ChevronRight color={colors.grey} size={18} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.inputBgColor, marginBottom: 20 }]}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 255, 255, 0.05)' }]}>
          <Building color={colors.cyan} size={18} />
        </View>
        <View style={styles.actionTextContainer}>
          <Typography size={14} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
            Deposit Fiat to Buy Crypto
          </Typography>
          <Typography size={12} style={{ color: colors.grey }}>
            Add to your wallet's fiat balance via bank transfer first.
          </Typography>
        </View>
        <ChevronRight color={colors.grey} size={18} />
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100, // Extra padding for bottom tabs
  },
  card: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardContent: {
    zIndex: 2,
    width: '70%',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pnlRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletImage: {
    position: 'absolute',
    right: -15,
    bottom: -25,
    width: 180,
    height: 180,
    zIndex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  actionTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
});
