import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckSquare, Square, ArrowDownUp, ListFilter } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { TotalAssetsCard } from './TotalAssetsCard';

const ASSETS_LIST = [
  {
    id: '1',
    symbol: 'USDT',
    name: 'TetherUS',
    amount: '0.00',
    fiatAmount: '+$0.00',
    available: '0.00',
    inOrders: '0.00',
    iconColor: '#26A17B',
  },
  {
    id: '2',
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: '0.00',
    fiatAmount: '+$0.00',
    available: '0.00',
    inOrders: '0.00',
    iconColor: '#F7931A',
  },
];

export const FuturesTab = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TotalAssetsCard imageSource={ImageAssets.futureWalletImg} />

      {/* Action Buttons Row */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.cyan }]}>
          <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.black }}>
            Deposit
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.inputBgColor }]}>
          <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.grey }}>
            Withdraw
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.inputBgColor }]}>
          <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.grey }}>
            Transfer
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Summary Card */}
      <View style={[styles.summaryCard, { backgroundColor: colors.inputBgColor, borderColor: 'rgba(255,255,255,0.05)', borderWidth: 1 }]}>
        <View style={styles.summaryItem}>
          <Typography size={12} style={{ color: colors.grey, marginBottom: 5 }}>
            Available
          </Typography>
          <Typography size={14} style={{ fontFamily: fonts.semiBold }}>
            0.00 USD
          </Typography>
        </View>
        <View style={styles.summaryItem}>
          <Typography size={12} style={{ color: colors.grey, marginBottom: 5 }}>
            In Orders
          </Typography>
          <Typography size={14} style={{ fontFamily: fonts.semiBold }}>
            0.00 USD
          </Typography>
        </View>
        <View style={styles.summaryItem}>
          <Typography size={12} style={{ color: colors.grey, marginBottom: 5 }}>
            Total
          </Typography>
          <Typography size={14} style={{ fontFamily: fonts.semiBold }}>
            0.00 USD
          </Typography>
        </View>
      </View>

      {/* Filters Row */}
      <View style={styles.filtersRow}>
        <TouchableOpacity style={styles.checkboxWrapper}>
          <Square color={colors.grey} size={18} />
          <Typography size={13} style={{ color: colors.grey, marginLeft: 8 }}>
            Hide 0 Balances
          </Typography>
        </TouchableOpacity>

        <View style={styles.sortWrapper}>
          <Typography size={13} style={{ color: colors.grey, marginRight: 5 }}>
            A-Z
          </Typography>
          <ArrowDownUp color={colors.grey} size={14} style={{ marginRight: 10 }} />
          <ListFilter color={colors.grey} size={16} />
        </View>
      </View>

      {/* Assets List */}
      {ASSETS_LIST.map((asset) => (
        <View key={asset.id} style={[styles.assetCard, { backgroundColor: colors.inputBgColor, borderColor: 'rgba(255,255,255,0.05)', borderWidth: 1 }]}>
          <View style={styles.assetHeaderRow}>
            <View style={styles.assetInfo}>
              <View style={[styles.assetIcon, { backgroundColor: asset.iconColor }]}>
                {/* Fallback text icon if no image is available */}
                <Typography size={16} style={{ fontFamily: fonts.bold, color: '#fff' }}>
                  {asset.symbol[0]}
                </Typography>
              </View>
              <View>
                <Typography size={16} style={{ fontFamily: fonts.bold }}>
                  {asset.symbol}
                </Typography>
                <Typography size={12} style={{ color: colors.grey, marginTop: 2 }}>
                  {asset.name}
                </Typography>
              </View>
            </View>
            <View style={styles.assetValues}>
              <Typography size={16} style={{ fontFamily: fonts.bold, textAlign: 'right' }}>
                {asset.amount}
              </Typography>
              <Typography size={12} style={{ color: colors.grey, marginTop: 2, textAlign: 'right' }}>
                {asset.fiatAmount}
              </Typography>
            </View>
          </View>

          <View style={styles.assetDetailsRow}>
            <View>
              <Typography size={11} style={{ color: colors.grey, marginBottom: 2 }}>
                Available
              </Typography>
              <Typography size={13} style={{ fontFamily: fonts.semiBold }}>
                {asset.available}
              </Typography>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Typography size={11} style={{ color: colors.grey, marginBottom: 2 }}>
                In Orders
              </Typography>
              <Typography size={13} style={{ fontFamily: fonts.semiBold }}>
                {asset.inOrders}
              </Typography>
            </View>
          </View>

          <View style={styles.assetActionsRow}>
            <TouchableOpacity style={[styles.assetActionBtn, { backgroundColor: 'rgba(0, 255, 255, 0.05)' }]}>
              <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.cyan }}>
                Trade
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.assetActionBtn, { backgroundColor: '#2B2C30' }]}>
              <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.white }}>
                Transfer
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      ))}

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
  actionButtonsRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'flex-start',
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetCard: {
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },
  assetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  assetValues: {
    alignItems: 'flex-end',
  },
  assetDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  assetActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  assetActionBtn: {
    flex: 1,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
});
