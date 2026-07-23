import React, { useState, memo, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { ChevronLeft, Search, Filter, Flame, ChevronDown, ShieldCheck, TrendingUp, Star, Diamond, Database } from 'lucide-react-native';
import { ToggleSwitch } from '../TradePage/components/ToggleSwitch';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ImageAssets } from '../../../components/common/ImageAssets';
import FastImage from 'react-native-fast-image';

const STAKING_PRODUCTS = [
  {
    id: '1',
    symbol: 'KCS',
    name: 'Coincode Token',
    apr: '100.00%',
    iconColor: '#26A17B',
    shortName: 'K',
    tags: [{ label: 'Exclusive Reward', color: 'rgba(98, 126, 234, 0.2)', textColor: '#8b9af0' }],
    fire: true,
  },
  {
    id: '2',
    symbol: 'USDT',
    name: 'Tether USD',
    apr: '7.37%',
    iconColor: '#26A17B',
    shortName: '₮',
    tags: [
      { label: 'DeFi', color: 'rgba(38, 161, 123, 0.2)', textColor: '#26A17B' },
      { label: 'VIP', color: 'rgba(247, 147, 26, 0.2)', textColor: '#F7931A' },
      { label: 'Bonus', color: 'rgba(38, 161, 123, 0.2)', textColor: '#26A17B' }
    ],
    fire: false,
  },
  {
    id: '3',
    symbol: 'BTC',
    name: 'Bitcoin',
    apr: '2.67%',
    iconColor: '#F7931A',
    shortName: '₿',
    tags: [{ label: 'Bonus', color: 'rgba(38, 161, 123, 0.2)', textColor: '#26A17B' }],
    fire: true,
  },
  {
    id: '4',
    symbol: 'ETH',
    name: 'Ethereum',
    apr: '4.23%',
    iconColor: '#627EEA',
    shortName: 'Ξ',
    tags: [
      { label: 'DeFi', color: 'rgba(38, 161, 123, 0.2)', textColor: '#26A17B' },
      { label: 'VIP', color: 'rgba(247, 147, 26, 0.2)', textColor: '#F7931A' },
      { label: 'Bonus', color: 'rgba(38, 161, 123, 0.2)', textColor: '#26A17B' }
    ],
    fire: true,
  },
  {
    id: '5',
    symbol: 'SOL',
    name: 'Solana',
    apr: '7.97%',
    iconColor: '#9945FF',
    shortName: 'S',
    tags: [{ label: 'Bonus', color: 'rgba(38, 161, 123, 0.2)', textColor: '#26A17B' }],
    fire: false,
  },
  {
    id: '6',
    symbol: 'GT',
    name: 'GT',
    apr: '0.80%',
    iconColor: '#3498DB',
    shortName: 'G',
    tags: [{ label: 'VIP', color: 'rgba(247, 147, 26, 0.2)', textColor: '#F7931A' }],
    fire: true,
  },
  {
    id: '7',
    symbol: 'USD1',
    name: 'USD1',
    apr: '1.76% - 4.44%',
    iconColor: '#26A17B',
    shortName: '$',
    tags: [{ label: 'New', color: 'rgba(52, 152, 219, 0.2)', textColor: '#3498DB' }],
    fire: false,
  },
];

const WHY_STAKE = [
  {
    icon: ShieldCheck,
    title: 'High Security',
    desc: 'Assets secured with top-grade encryption',
  },
  {
    icon: TrendingUp,
    title: 'High Yields',
    desc: 'Competitive APY rates updated daily',
  },
  {
    icon: Star,
    title: 'Auto Rewards',
    desc: 'Rewards calculated and credited automatically',
  },
  {
    icon: Diamond,
    title: 'Exclusive Perks',
    desc: 'Discounts and VIP benefits for stakers',
  },
];

const StakingProductItem = memo(({ product, colors }: { product: any, colors: any }) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('StakingDetails', { product })}>
      <View style={styles.productLeft}>
        <View style={[styles.coinIcon, { backgroundColor: product.iconColor }]}>
          <Typography size={15} style={{ fontFamily: fonts.semiBold, color: colors.white }}>
            {product.shortName}
          </Typography>
        </View>
        <View>
          <View style={styles.symbolRow}>
            <Typography size={14} style={{ fontFamily: fonts.semiBold, marginRight: 6 }}>
              {product.symbol}
            </Typography>
            {product.tags.map((tag: any, idx: number) => (
              <View key={idx} style={[styles.tagBadge, { backgroundColor: tag.color }]}>
                <Typography size={9} style={{ fontFamily: fonts.medium, color: tag.textColor }}>
                  {tag.label}
                </Typography>
              </View>
            ))}
            {product.fire && (
              <Flame color="#F7931A" size={13} fill="#F7931A" style={{ marginLeft: 4 }} />
            )}
          </View>
          <Typography size={11} style={{ color: colors.grey, marginTop: 2 }}>
            {product.name}
          </Typography>
        </View>
      </View>
      <View style={styles.productRight}>
        <Typography size={14} style={{ fontFamily: fonts.bold, color: colors.white }}>
          {product.apr}
        </Typography>
      </View>
    </TouchableOpacity>
  );
});

export const EarnScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [matchAssets, setMatchAssets] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem: ListRenderItem<any> = useCallback(({ item }) => (
    <StakingProductItem product={item} colors={colors} />
  ), [colors]);

  const ListHeader = useCallback(() => (
    <>
      {/* Banner Section */}
      <View style={[styles.bannerContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Typography size={15} style={{ fontFamily: fonts.semiBold, color: colors.cyan, marginBottom: 8 }}>
            Coincode Staking
          </Typography>
          <Typography size={20} style={{ fontFamily: fonts.semiBold, color: colors.white, lineHeight: 32 }}>
            Stake Today,{'\n'}Earn Tomorrow
          </Typography>
          <Typography size={12} style={{ color: colors.grey, marginBottom: 20, lineHeight: 18 }}>
            Stake your crypto assets and earn high rewards with top security and transparency.
          </Typography>
          <TouchableOpacity style={[styles.stakeNowBtn, { backgroundColor: colors.cyan }]}>
            <Database color={colors.white} size={16} style={{ marginRight: 6 }} />
            <Typography size={14} style={{ fontFamily: fonts.medium, color: colors.white }}>
              Stake Now
            </Typography>
          </TouchableOpacity>
        </View>
        <FastImage
          source={ImageAssets.stakingPromo}
          style={{ width: 180, height: 250 }}
          resizeMode="contain"
        />
      </View>

      {/* Search and Filter */}
      <View style={styles.searchRow}>
        <View style={[styles.searchContainer, { backgroundColor: colors.inputBgColor, borderColor: colors.inputBorderColor, borderWidth: 1 }]}>
          <Search color={colors.grey} size={18} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.white, fontFamily: fonts.medium }]}
            placeholder="Search coins"
            placeholderTextColor={colors.grey}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.inputBgColor, borderColor: colors.inputBorderColor, borderWidth: 1 }]}>
          <Filter color={colors.grey} size={18} />
        </TouchableOpacity>
      </View>

      {/* All Staking Products Header */}
      <View style={styles.productsHeader}>
        <Typography size={16} style={{ fontFamily: fonts.semiBold }}>
          All Staking Products
        </Typography>
        <View style={styles.switchContainer}>
          <Typography size={12} style={{ color: colors.grey, marginRight: 8 }}>
            Match my assets
          </Typography>
          <ToggleSwitch value={matchAssets} onValueChange={setMatchAssets} />
        </View>
      </View>

      {/* List Columns Header */}
      <View style={styles.listHeaderRow}>
        <Typography size={12} style={{ color: colors.grey }}>
          Coin
        </Typography>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Typography size={12} style={{ color: colors.grey, marginRight: 4 }}>
            Est. APR
          </Typography>
          <View style={{ flexDirection: 'column' }}>
            <ChevronDown color={colors.grey} size={10} style={{ transform: [{ rotate: '180deg' }], marginBottom: -4 }} />
            <ChevronDown color={colors.grey} size={10} />
          </View>
        </View>
      </View>
    </>
  ), [colors, searchQuery, matchAssets]);

  const ListFooter = useCallback(() => (
    <>
      {/* View More */}
      <TouchableOpacity style={styles.viewMoreBtn}>
        <ChevronDown color={colors.grey} size={16} style={{ marginRight: 4 }} />
        <Typography size={13} style={{ color: colors.grey }}>
          View More
        </Typography>
      </TouchableOpacity>

      {/* Why Stake Section */}
      <Typography size={18} style={{ fontFamily: fonts.semiBold, marginBottom: 15, }}>
        Why Stake on Coincode?
      </Typography>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.whyStakeRow}>
        {WHY_STAKE.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <View key={idx} style={[styles.whyStakeCard, { borderColor: 'rgba(255, 255, 255, 0.05)' }]}>
              <View style={styles.whyStakeIconWrapper}>
                <IconComponent color={colors.cyan} size={24} />
              </View>
              <Typography size={12} style={{ fontFamily: fonts.bold, textAlign: 'center', marginBottom: 6, lineHeight: 16 }}>
                {item.title}
              </Typography>
              <Typography size={10} style={{ color: colors.grey, textAlign: 'center', lineHeight: 14 }}>
                {item.desc}
              </Typography>
            </View>
          );
        })}
      </ScrollView>
      <View style={{ height: 50 }}></View>
    </>
  ), [colors]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <FlatList
        data={STAKING_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  bannerContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 10,
  },
  stakeNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'column',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  productLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coinIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  symbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  productRight: {
    alignItems: 'flex-end',
  },
  viewMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 10,
  },
  whyStakeRow: {
    paddingBottom: 20,
  },
  whyStakeCard: {
    width: 120,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
    minHeight: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  whyStakeIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
});
