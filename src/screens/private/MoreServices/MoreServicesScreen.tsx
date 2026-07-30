import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronLeft, Search, Edit3, Shield, Clock, BookOpen, MessageSquare, ShieldCheck, Globe, Star, Zap, DollarSign, Activity, Settings, UserPlus, Gift, TrendingUp, HelpCircle, Users } from 'lucide-react-native';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import { ImageAssets } from '../../../components/common/ImageAssets';

export const MoreServicesScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Recommended');

  const filters = ['Recommended', 'Buy Crypto', 'Trade', 'Futures', 'Earn'];

  const renderServiceItem = (item: any, isFavourite = false) => (
    <TouchableOpacity
      key={item.title}
      style={styles.serviceItem}
      onPress={() => {
        if (item.route) {
          if (item.params) {
            (navigation.navigate as any)(item.route, item.params);
          } else {
            (navigation.navigate as any)(item.route);
          }
        } else {
          navigation.navigate('ComingSoonScreen' as any);
        }
      }}
    >
      <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
        {item.image ? (
          <FastImage source={item.image} style={{ width: 22, height: 22 }} resizeMode="contain" />
        ) : (
          item.icon
        )}
      </View>
      {!isFavourite && (
        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium, marginTop: 10, textAlign: 'center' }}>
          {item.title}
        </Typography>
      )}
    </TouchableOpacity>
  );

  const renderSection = (title: string, data: any[], hasEdit = false) => (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{title}</Typography>
        {hasEdit && (
          <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.cyan }]} >
            <Edit3 color={colors.white} size={10} style={{ marginRight: 4 }} />
            <Typography size={10} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Edit</Typography>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.gridContainer}>
        {data.map((item) => renderServiceItem(item, title === 'My Favourites'))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <FastImage source={ImageAssets.backButtonImg} style={{ width: 35, height: 35 }} resizeMode="contain" />
        </TouchableOpacity>
        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
          Services
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
          <Search color={colors.grey} size={16} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search Coins"
            placeholderTextColor={colors.grey}
            style={[styles.searchInput, { color: colors.white, fontFamily: fonts.medium }]}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* My Favourites */}
        {renderSection('My Favourites', [
          { title: 'Spot', image: ImageAssets.spotIcon },
          { title: 'Convert', image: ImageAssets.convertIcon, route: 'ConvertScreen' },
          { title: 'Margin', image: ImageAssets.marginIcon },
          { title: 'P2P', image: ImageAssets.p2pIcon },
        ], true)}

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterPill,
                { backgroundColor: activeFilter === f ? colors.cyan : 'rgba(255, 255, 255, 0.05)' }
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Typography size={12} style={{ color: activeFilter === f ? colors.white : colors.grey, fontFamily: fonts.medium }}>
                {f}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banners */}
        <View style={styles.bannersRow}>
          <TouchableOpacity style={[styles.bannerBox, { backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }]}>
            <LinearGradient
              colors={['rgba(0, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.0)']}
              start={{ x: 0, y: 3 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={[styles.bannerIconWrapper, { backgroundColor: 'rgba(0, 255, 255, 0.1)' }]}>
              <Gift color={colors.cyan} size={16} />
            </View>
            <View>
              <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Rewards Hub</Typography>
              <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>Earn More</Typography>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bannerBox, { backgroundColor: 'rgba(255, 255, 255, 0.03)', overflow: 'hidden' }]}>
            <LinearGradient
              colors={['rgba(0, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.0)']}
              start={{ x: 0, y: 3 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={[styles.bannerIconWrapper, { backgroundColor: 'rgba(0, 255, 255, 0.1)' }]}>
              <FastImage source={ImageAssets.inviteFriendsIcon} style={{ width: 16, height: 16 }} resizeMode="contain" />
            </View>
            <View>
              <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Invite Friends</Typography>
              <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>Earn Together</Typography>
            </View>
          </TouchableOpacity>
        </View>

        {/* Buy Crypto Section */}
        {renderSection('Buy Crypto', [
          { title: 'Buy Crypto', image: ImageAssets.buyCryptoIcon },
          { title: 'Deposit', image: ImageAssets.depositIcon, route: 'SelectCoin' },
          { title: 'P2P', image: ImageAssets.p2pIcon },
          { title: 'Withdrawal', image: ImageAssets.withdrawalIcon, route: 'SelectCoin', params: { action: 'withdrawal' } },
        ])}

        {/* Trade Section */}
        {renderSection('Trade', [
          { title: 'Spot', image: ImageAssets.spotIcon },
          { title: 'Margin', image: ImageAssets.marginIcon },
          { title: 'Convert', image: ImageAssets.convertIcon, route: 'ConvertScreen' },
          { title: 'Copy Trading', image: ImageAssets.copyTradeIcon },
          { title: 'OTC Desk', image: ImageAssets.otpDeskIcon },
          { title: 'P2P Trading', image: ImageAssets.p2pIcon },
          { title: 'Bots', image: ImageAssets.botIcon },
        ])}

        {/* Futures Section */}
        {renderSection('Futures', [
          { title: 'USD-M', image: ImageAssets.futureIcon },
          { title: 'Coin-M', image: ImageAssets.coinMIcon },
          { title: 'Options', image: ImageAssets.optionTradeIcon },
        ])}

        {/* Earn Section */}
        {renderSection('Earn', [
          { title: 'Launchpad', image: ImageAssets.launchpadIcon, route: 'LaunchpadScreen' },
          { title: 'Refer & Earn', image: ImageAssets.referIcon, route: 'ReferralScreen' },
          { title: 'VIP', image: ImageAssets.vipIcon },
          { title: 'Simple Earn', image: ImageAssets.simpleEarnIcon },
          { title: 'Soft Staking', image: ImageAssets.softStakingIcon },
        ])}

        {/* More Section */}
        {renderSection('More', [
          { title: 'Announcements', image: ImageAssets.announcementIcon },
          { title: 'Referral', image: ImageAssets.referIcon, route: 'ReferralScreen' },
          { title: 'Affiliate Program', image: ImageAssets.affilateIcon },
          { title: 'Proof of Reserves', image: ImageAssets.proofOfReserveIcon },
          { title: 'VIP Services', image: ImageAssets.vipServicesIcon },
          { title: 'Help Center', image: ImageAssets.helpCenterIcon },
          { title: 'Blogs', image: ImageAssets.blogIcon },
          { title: 'Partners', image: ImageAssets.partnersIcon },
        ])}

        {/* Square Section */}
        {renderSection('Square', [
          { title: 'Square', image: ImageAssets.squareIcon },
          { title: 'Chat', image: ImageAssets.chatIcon },
          { title: 'News', image: ImageAssets.newsIcon1 },
        ])}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionWrapper: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
  serviceItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersScroll: {
    paddingHorizontal: 16,
    marginBottom: 24,
    flexGrow: 0,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  bannersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  bannerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  bannerIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
