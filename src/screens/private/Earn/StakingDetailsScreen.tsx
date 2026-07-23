import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { ChevronLeft, ChevronRight, ListOrdered } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ToggleSwitch } from '../TradePage/components/ToggleSwitch';

const FAQS = [
  'What is Coincode Staking?',
  'How are earnings calculated?',
  'When will I receive my staking rewards?',
  'Can I unstake my assets anytime?'
];

export const StakingDetailsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const product = route.params?.product || { symbol: 'BTC' };
  const [payFees, setPayFees] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft color={colors.white} size={24} />
          </TouchableOpacity>
        </View>

        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerLeft}>
            <Typography size={20} style={{ fontFamily: fonts.semiBold, color: colors.white }}>
              Mint {product.symbol},
            </Typography>
            <Typography size={20} style={{ fontFamily: fonts.semiBold, color: colors.cyan, marginBottom: 5 }}>
              Earn Daily
            </Typography>
            <Typography size={12} style={{ color: colors.grey, marginBottom: 5, lineHeight: 18 }}>
              Stake {product.symbol} and earn high yield with secure & stable rewards.
            </Typography>

            <View style={styles.tagsContainer}>
              {['Secure & Transparent', 'High Returns', 'Stable', 'Daily Rewards'].map((tag, idx) => (
                <View key={idx} style={[styles.bannerTag, { backgroundColor: 'rgba(0, 255, 255, 0.1)' }]}>
                  <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                    {tag}
                  </Typography>
                </View>
              ))}
            </View>
          </View>
          <FastImage
            source={ImageAssets.coinBanner}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>

        {/* My Staking Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Typography size={16} style={{ fontFamily: fonts.semiBold }}>
              My Staking
            </Typography>
            <TouchableOpacity style={[styles.ordersBtn, { backgroundColor: 'rgba(0, 255, 255, 0.1)' }]}>
              <FastImage
                source={ImageAssets.historyIcon}
                style={{ width: 14, height: 14, marginRight: 6 }}
                tintColor={colors.cyan}
                resizeMode="contain"
              />
              <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                Orders
              </Typography>
            </TouchableOpacity>
          </View>

          <View style={styles.stakingStatsRow}>
            <View style={styles.statBox}>
              <Typography size={12} style={{ color: colors.grey, marginBottom: 6 }}>
                True Staked
              </Typography>
              <Typography size={20} style={{ fontFamily: fonts.bold, color: colors.white }}>
                0 <Typography size={12} style={{ color: colors.grey }}>{product.symbol}</Typography>
              </Typography>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Typography size={12} style={{ color: colors.grey, marginBottom: 6 }}>
                Yesterday's P/L
              </Typography>
              <Typography size={16} style={{ fontFamily: fonts.bold, color: '#00C853' }}>
                +0.000 <Typography size={12} style={{ color: '#00C853' }}>{product.symbol}</Typography>
              </Typography>
            </View>
          </View>

          <View style={styles.payFeesRow}>
            <Typography size={13} style={{ color: colors.grey }}>
              Pay fees with staked amount
            </Typography>
            <ToggleSwitch value={payFees} onValueChange={setPayFees} />
          </View>

          <View style={styles.loyaltyRow}>
            <View>
              <Typography size={11} style={{ color: colors.grey, marginBottom: 4 }}>
                My Loyalty Leon
              </Typography>
              <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.white }}>
                To be unlocked
              </Typography>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Typography size={11} style={{ color: colors.grey, marginBottom: 4 }}>
                Percentage of Total Assets
              </Typography>
              <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.white }}>
                0%
              </Typography>
            </View>
          </View>
        </View>

        {/* Staking Products */}
        <View style={styles.sectionHeader}>
          <Typography size={16} style={{ fontFamily: fonts.semiBold }}>
            Staking Products
          </Typography>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography size={13} style={{ color: colors.cyan, marginRight: 4, fontFamily: fonts.medium }}>
              View All
            </Typography>
            <ChevronRight color={colors.cyan} size={16} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsScroll}>
          {[
            { tag: 'Flexible', title: 'Flexible Staking', apy: '0.00%' },
            { tag: '30 Days', title: '30 Days Staking', apy: '0.04%' },
            { tag: '60 Days', title: '60 Days Staking', apy: '0.06%' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.productOptionCard}>
              <View style={[styles.productTag, { backgroundColor: 'rgba(0, 255, 255, 0.1)' }]}>
                <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                  {item.tag}
                </Typography>
              </View>
              <Typography size={11} style={{ color: colors.grey, marginBottom: 4 }}>
                {item.title}
              </Typography>
              <Typography size={10} style={{ color: colors.grey, marginBottom: 8 }}>
                Reference APY
              </Typography>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography size={16} style={{ fontFamily: fonts.bold, color: colors.white }}>
                  {item.apy}
                </Typography>
                <ChevronRight color={colors.grey} size={16} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Staking Summary */}
        <View style={styles.card}>
          <View style={[styles.cardHeader, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 20 }]}>
            <Typography size={16} style={{ fontFamily: fonts.semiBold }}>
              Staking Summary
            </Typography>
            <Typography size={12} style={{ color: colors.grey }}>
              Last 30 Days
            </Typography>
          </View>

          <View style={styles.summaryStatsRow}>
            <View style={styles.summaryStatItem}>
              <Typography size={10} style={{ color: colors.grey, marginBottom: 6 }}>Total Staked</Typography>
              <Typography size={14} style={{ fontFamily: fonts.bold, color: colors.white }}>0</Typography>
            </View>
            <View style={styles.summaryStatItem}>
              <Typography size={10} style={{ color: colors.grey, marginBottom: 6 }}>Est. Earnings</Typography>
              <Typography size={14} style={{ fontFamily: fonts.bold, color: colors.white }}>0</Typography>
            </View>
            <View style={styles.summaryStatItem}>
              <Typography size={10} style={{ color: colors.grey, marginBottom: 6 }}>Rewards Earned</Typography>
              <Typography size={14} style={{ fontFamily: fonts.bold, color: colors.white }}>0</Typography>
            </View>
            <View style={styles.summaryStatItem}>
              <Typography size={10} style={{ color: colors.grey, marginBottom: 6 }}>APR</Typography>
              <Typography size={14} style={{ fontFamily: fonts.bold, color: colors.white }}>0.00%</Typography>
            </View>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={[styles.card, { paddingHorizontal: 0, paddingVertical: 10 }]}>
          <View style={[styles.cardHeader, { borderBottomWidth: 0, paddingHorizontal: 16, marginBottom: 10 }]}>
            <Typography size={16} style={{ fontFamily: fonts.semiBold }}>
              FAQ
            </Typography>
          </View>
          {FAQS.map((faq, index) => (
            <TouchableOpacity key={index} style={styles.faqItem}>
              <Typography size={13} style={{ color: colors.grey }}>
                {index + 1}. {faq}
              </Typography>
              <ChevronRight color={colors.grey} size={16} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  bannerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  bannerTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  bannerImage: {
    width: 180,
    height: 190,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 15,
  },
  ordersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  stakingStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
  },
  payFeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 15,
  },
  loyaltyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  productsScroll: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  productOptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
    width: 140,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  productTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  summaryStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
});
