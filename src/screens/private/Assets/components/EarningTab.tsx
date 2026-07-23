import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PiggyBank, Coins, CloudSnow, Rocket, TrendingUp, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { TotalAssetsCard } from './TotalAssetsCard';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const EARNING_GAINERS_LIST = [
  {
    id: '1',
    symbol: 'USDT',
    type: 'Savings',
    apy: 'Up to 8%',
    iconColor: '#26A17B',
    shortName: 'T'
  },
  {
    id: '2',
    symbol: 'BTC',
    type: 'Staking',
    apy: 'Up to 12%',
    iconColor: '#F7931A',
    shortName: '₿'
  },
  {
    id: '3',
    symbol: 'ETH',
    type: 'Staking',
    apy: 'Up to 10%',
    iconColor: '#627EEA',
    shortName: '⬨'
  },
];

export const EarningTab = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TotalAssetsCard
        imageSource={ImageAssets.earningWalletImg}
      />

      {/* Action Cards Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionCardsRow}
      >
        <TouchableOpacity style={styles.actionCard}>
          <FastImage
            source={ImageAssets.savings}
            style={styles.actionImage}
            resizeMode="contain"
          />
          <Typography size={12} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
            Savings
          </Typography>
          <Typography size={10} style={{ color: colors.grey, textAlign: 'center', lineHeight: 14 }}>
            Earn secure savings
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <FastImage
            source={ImageAssets.staking}
            style={styles.actionImage}
            resizeMode="contain"
          />
          <Typography size={12} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
            Staking
          </Typography>
          <Typography size={10} style={{ color: colors.grey, textAlign: 'center', lineHeight: 14 }}>
            Stake to earn rewards
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <FastImage
            source={ImageAssets.flexibleEarn}
            style={styles.actionImage}
            resizeMode="contain"
          />
          <Typography size={12} style={{ fontFamily: fonts.semiBold, marginBottom: 4, textAlign: 'center' }}>
            Flexible Earn
          </Typography>
          <Typography size={10} style={{ color: colors.grey, textAlign: 'center', lineHeight: 14 }}>
            Earn anytime, withdraw anytime
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <FastImage
            source={ImageAssets.launchpool}
            style={styles.actionImage}
            resizeMode="contain"
          />
          <Typography size={12} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
            Launchpool
          </Typography>
          <Typography size={10} style={{ color: colors.grey, textAlign: 'center', lineHeight: 14 }}>
            Earn new tokens for free
          </Typography>
        </TouchableOpacity>
      </ScrollView>

      {/* Banner */}
      <FastImage
        source={ImageAssets.startEarningBanner}
        style={styles.bannerImage}
        resizeMode="contain"
      />

      {/* Top Gainers Section */}
      <View style={styles.sectionHeader}>
        <Typography size={16} style={{ fontFamily: fonts.semiBold }}>
          Top Gainers
        </Typography>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Typography size={13} style={{ color: colors.cyan, marginRight: 2 }}>
            View All
          </Typography>
          <ChevronRight color={colors.cyan} size={14} />
        </TouchableOpacity>
      </View>

      <View style={styles.gainersList}>
        {EARNING_GAINERS_LIST.map((coin, index) => (
          <View key={index} style={[styles.gainerItem, { borderColor: 'rgba(255, 255, 255, 0.05)' }]}>
            <View style={styles.gainerLeft}>
              <View style={[styles.coinIcon, { backgroundColor: coin.iconColor }]}>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>
                  {coin.shortName}
                </Typography>
              </View>
              <View>
                <Typography size={15} style={{ fontFamily: fonts.bold, marginBottom: 4 }}>
                  {coin.symbol}
                </Typography>
                <Typography size={12} style={{ color: colors.grey }}>
                  {coin.type}
                </Typography>
              </View>
            </View>

            <View style={styles.gainerMiddle}>
              <Typography size={12} style={{ color: colors.grey, marginBottom: 2 }}>
                {coin.apy}
              </Typography>
              <Typography size={12} style={{ color: colors.grey }}>
                APY
              </Typography>
            </View>

            <View style={styles.gainerRight}>
              <TouchableOpacity style={[styles.earnNowBtn, { backgroundColor: colors.cyan }]}>
                <Typography size={13} style={{ fontFamily: fonts.medium, color: colors.white }}>
                  Earn Now
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

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
    paddingBottom: 100,
  },
  actionCardsRow: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 2,
  },
  actionCard: {
    width: 110,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginRight: 12,
    minHeight: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  actionImage: {
    width: 44,
    height: 44,
    marginBottom: 8,
  },
  bannerImage: {
    width: '100%',
    height: 95,
    marginBottom: 15,
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gainersList: {
    flexDirection: 'column',
  },
  gainerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  gainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.2,
  },
  coinIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  gainerMiddle: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  gainerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  earnNowBtn: {
    minWidth: 85,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
});
