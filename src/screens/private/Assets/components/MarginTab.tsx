import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft, HandCoins, Square, Search, ListFilter, ArrowDownUp, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { TotalAssetsCard } from './TotalAssetsCard';
import FastImage from 'react-native-fast-image';

const MARGIN_ASSETS_LIST = [
  {
    id: '1',
    symbol: 'BTC/USDT',
    name: 'Bitcoin / TetherUS',
    tag: 'SE',
    netAssets: '0.00',
    netAssetsFiat: '+$0.00',
    borrowed: '0.00',
    borrowedFiat: '+$0.00',
  },
  {
    id: '2',
    symbol: 'BTC/USDT',
    name: 'Bitcoin / TetherUS',
    tag: 'SE',
    netAssets: '0.00',
    netAssetsFiat: '+$0.00',
    borrowed: '0.00',
    borrowedFiat: '+$0.00',
  },
  {
    id: '3',
    symbol: 'BTC/USDT',
    name: 'Bitcoin / TetherUS',
    tag: 'SE',
    netAssets: '0.00',
    netAssetsFiat: '+$0.00',
    borrowed: '0.00',
    borrowedFiat: '+$0.00',
  },
];

const MARGIN_BORROWED_LIST = [
  {
    id: '1',
    symbol: 'USDT',
    name: 'Tether US',
    borrowedAmount: '0.00',
    apr: '0.00% APR',
    borrowedFiat: '+$0.00',
  },
  {
    id: '2',
    symbol: 'BTC',
    name: 'Bitcoin',
    borrowedAmount: '0.00',
    apr: '0.00% APR',
    borrowedFiat: '+$0.00',
  },
  {
    id: '3',
    symbol: 'ETH',
    name: 'Ethereum',
    borrowedAmount: '0.00',
    apr: '0.00% APR',
    borrowedFiat: '+$0.00',
  },
  {
    id: '4',
    symbol: 'BNB',
    name: 'BNB',
    borrowedAmount: '0.00',
    apr: '0.00% APR',
    borrowedFiat: '+$0.00',
  },
];

export const MarginTab = () => {
  const { colors } = useTheme();
  const [activeSubTab, setActiveSubTab] = useState<'Assets' | 'Borrowed'>('Assets');

  const accountDetailsBadge = (
    <TouchableOpacity style={[styles.badge, { backgroundColor: colors.cyan }]}>
      <Typography size={10} style={{ fontFamily: fonts.semiBold, color: colors.white }}>
        Account Details
      </Typography>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TotalAssetsCard
        imageSource={ImageAssets.marginWalletImg}
        topRightBadge={accountDetailsBadge}
      />

      {/* Action Buttons Row */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity style={styles.actionItem}>
          <FastImage
            source={ImageAssets.depositWallet}
            style={styles.actionImage}
            resizeMode="contain"
          />
          <Typography size={12} style={{ fontFamily: fonts.medium }}>
            Deposit
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <FastImage
            source={ImageAssets.earnWallet}
            style={styles.actionImage}
            resizeMode="contain"
          />
          <Typography size={12} style={{ fontFamily: fonts.medium }}>
            Earn
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <FastImage
            source={ImageAssets.transferWallet}
            style={styles.actionImage}
            resizeMode="contain"
          />
          <Typography size={12} style={{ fontFamily: fonts.medium }}>
            Transfer
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <FastImage
            source={ImageAssets.withdrawWallet}
            style={styles.actionImage}
            resizeMode="contain"
          />
          <Typography size={12} style={{ fontFamily: fonts.medium }}>
            Withdraw
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Sub Tabs */}
      <View style={styles.subTabsContainer}>
        <TouchableOpacity
          style={styles.subTabItem}
          onPress={() => setActiveSubTab('Assets')}
        >
          <Typography size={16} style={{ fontFamily: fonts.semiBold, color: activeSubTab === 'Assets' ? colors.white : colors.grey }}>
            Assets
          </Typography>
          {activeSubTab === 'Assets' && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subTabItem}
          onPress={() => setActiveSubTab('Borrowed')}
        >
          <Typography size={16} style={{ fontFamily: fonts.semiBold, color: activeSubTab === 'Borrowed' ? colors.white : colors.grey }}>
            Borrowed
          </Typography>
          {activeSubTab === 'Borrowed' && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.toolsRow}>
        <View style={[styles.searchContainer, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
          <Search color={colors.grey} size={16} style={styles.searchIcon} />
          <TextInput
            placeholder="Search coin..."
            placeholderTextColor={colors.grey}
            style={[styles.searchInput, { color: colors.white }]}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.checkboxWrapper}>
            <Square color={colors.grey} size={16} />
            <Typography size={12} style={{ color: colors.grey, marginLeft: 6, marginRight: 10 }}>
              Hide small balances
            </Typography>
          </TouchableOpacity>
          <ListFilter color={colors.grey} size={18} />
        </View>
      </View>

      {/* Dynamic List Header */}
      {activeSubTab === 'Assets' ? (
        <View style={styles.listHeaderRow}>
          <View style={styles.listHeaderCol1}>
            <Typography size={11} style={{ color: colors.grey }}>
              Pair / Coin
            </Typography>
            <ArrowDownUp color={colors.grey} size={10} style={{ marginLeft: 4 }} />
          </View>
          <Typography size={11} style={{ color: colors.grey, flex: 1, textAlign: 'center' }}>
            Net Assets
          </Typography>
          <Typography size={11} style={{ color: colors.grey, flex: 1, textAlign: 'center' }}>
            Borrowed
          </Typography>
          <Typography size={11} style={{ color: colors.grey, flex: 0.8, textAlign: 'right' }}>
            Action
          </Typography>
        </View>
      ) : (
        <View style={styles.listHeaderRow}>
          <Typography size={11} style={{ color: colors.grey, flex: 1 }}>
            Coin
          </Typography>
          <Typography size={11} style={{ color: colors.grey, flex: 1, textAlign: 'center' }}>
            Borrowed
          </Typography>
          <Typography size={11} style={{ color: colors.grey, flex: 0.8, textAlign: 'right' }}>
            Action
          </Typography>
        </View>
      )}

      {/* Dynamic List Content */}
      <View style={styles.listContainer}>
        {activeSubTab === 'Assets' ? (
          MARGIN_ASSETS_LIST.map((asset, index) => (
            <View key={index} style={[styles.assetListItem, { borderBottomColor: 'rgba(255,255,255,0.1)', borderBottomWidth: index === MARGIN_ASSETS_LIST.length - 1 ? 0 : 1 }]}>
              <View style={styles.listCol1}>
                <View style={styles.symbolRow}>
                  <Typography size={14} style={{ fontFamily: fonts.semiBold, marginRight: 6 }}>
                    {asset.symbol}
                  </Typography>
                  <View style={[styles.tag, { backgroundColor: 'rgba(0, 255, 255, 0.1)' }]}>
                    <Typography size={10} style={{ fontFamily: fonts.bold, color: colors.cyan }}>
                      {asset.tag}
                    </Typography>
                  </View>
                </View>
                <Typography size={11} style={{ color: colors.grey, marginTop: 4 }}>
                  {asset.name}
                </Typography>
              </View>

              <View style={styles.listCol2}>
                <Typography size={13} style={{ fontFamily: fonts.semiBold }}>
                  {asset.netAssets}
                </Typography>
                <Typography size={11} style={{ color: colors.grey, marginTop: 4 }}>
                  {asset.netAssetsFiat}
                </Typography>
              </View>

              <View style={styles.listCol3}>
                <Typography size={13} style={{ fontFamily: fonts.semiBold }}>
                  {asset.borrowed}
                </Typography>
                <Typography size={11} style={{ color: colors.grey, marginTop: 4 }}>
                  {asset.borrowedFiat}
                </Typography>
              </View>

              <View style={styles.listCol4}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.cyan, marginRight: 4 }}>
                    Transfer
                  </Typography>
                  <ChevronRight color={colors.cyan} size={14} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          MARGIN_BORROWED_LIST.map((asset, index) => (
            <View key={index} style={[styles.assetListItem, { borderBottomColor: 'rgba(255,255,255,0.1)', borderBottomWidth: index === MARGIN_BORROWED_LIST.length - 1 ? 0 : 1 }]}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Typography size={14} style={{ fontFamily: fonts.semiBold }}>
                  {asset.symbol}
                </Typography>
                <Typography size={11} style={{ color: colors.grey, marginTop: 4 }}>
                  {asset.name}
                </Typography>
              </View>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <Typography size={13} style={{ fontFamily: fonts.semiBold }}>
                  {asset.borrowedAmount}
                </Typography>
                <Typography size={11} style={{ color: colors.grey, marginTop: 2 }}>
                  {asset.apr}
                </Typography>
                <Typography size={11} style={{ color: colors.grey, marginTop: 2 }}>
                  {asset.borrowedFiat}
                </Typography>
              </View>

              <View style={{ flex: 0.8, alignItems: 'flex-end', justifyContent: 'center' }}>
                <TouchableOpacity style={[styles.repayButton, { borderColor: '#0AA8C51F' }]}>
                  <Typography size={12} style={{ fontFamily: fonts.semiBold, color: colors.cyan }}>
                    Repay
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 25,
    marginBottom: 25,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionImage: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  subTabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  subTabItem: {
    marginRight: 25,
    position: 'relative',
    paddingBottom: 8,
    alignItems: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 20,
    height: 3,
    borderRadius: 2,
  },
  toolsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 12,
    marginRight: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 13,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: fonts.regular,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  listHeaderCol1: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.2,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  assetListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  listCol1: {
    flex: 1.2,
    alignItems: 'flex-start',
  },
  symbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  listCol2: {
    flex: 1,
    alignItems: 'center',
  },
  listCol3: {
    flex: 1,
    alignItems: 'center',
  },
  listCol4: {
    flex: 0.8,
    alignItems: 'flex-end',
  },
  repayButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: "#0AA8C54D"
  },
});
