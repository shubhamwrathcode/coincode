import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { HelpCircle, History, Share2, RefreshCw, Copy, AlertTriangle, ChevronDown, FileText } from 'lucide-react-native';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { CommonButton } from '../../../components/common/CommonButton';

export const DepositQrCodeScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const coinSymbol = 'BTC';
  const [isMoreDetailsExpanded, setIsMoreDetailsExpanded] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <FastImage source={ImageAssets.backButtonImg} resizeMode='contain' style={{ width: 28, height: 28 }} />
        </TouchableOpacity>
        <Typography size={17} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
          Deposit {coinSymbol}
        </Typography>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <FileText color={colors.white} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <History color={colors.white} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* QR Code Card */}
        <View style={styles.qrCard}>
          <View style={styles.qrCardLeft}>
            <View style={[styles.coinLogo, { backgroundColor: '#F7931A' }]}>
              <Typography size={25} style={{ color: colors.white, fontFamily: fonts.bold }}>B</Typography>
            </View>
            <Typography size={15} style={{ color: colors.white, fontFamily: fonts.bold, marginTop: 12 }}>
              Scan QR Code
            </Typography>
            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4, lineHeight: 16 }}>
              Scan this QR code with any wallet to deposit {coinSymbol} to your address.
            </Typography>
            <TouchableOpacity style={[styles.shareBtn, { borderColor: colors.cyan }]}>
              <Share2 color={colors.cyan} size={12} />
              <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium, marginLeft: 6 }}>
                Share QR
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={styles.qrCardRight}>
            <View style={{ width: 140, height: 140, justifyContent: 'center', alignItems: 'center' }}>
              <FastImage
                source={ImageAssets.barcodeFrame}
                resizeMode="contain"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <View style={styles.qrCodeWrapper}>
                <FastImage
                  source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Network Section */}
        <Typography size={15} style={styles.sectionTitle}>Network</Typography>
        <View style={styles.card}>
          <View style={styles.networkRow}>
            <View style={[styles.networkLogo, { backgroundColor: '#F3BA2F' }]}>
              <Typography size={17} style={{ color: colors.white, fontFamily: fonts.bold }}>B</Typography>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Typography size={15} style={{ color: colors.white, fontFamily: fonts.semiBold }}>BSC</Typography>
              <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>BNB Smart Chain – BEP20</Typography>
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.medium, marginRight: 4 }}>Change</Typography>
              <RefreshCw color={colors.cyan} size={12} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, styles.rowCard]}>
          <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular }}>
            Contract Info: <Typography size={13} style={{ color: colors.grey }}>0x***ad8c</Typography>
          </Typography>
          <TouchableOpacity style={styles.copyBtn}>
            <Copy color={colors.grey} size={14} />
          </TouchableOpacity>
        </View>

        {/* Deposit Address Section */}
        <Typography size={15} style={styles.sectionTitle}>Deposit Address</Typography>
        <View style={[styles.card, styles.rowCard]}>
          <Typography size={12} style={{ color: colors.white, fontFamily: fonts.regular, flex: 1, marginRight: 12 }}>
            0x7c40c0cd781237c43165a402f93
          </Typography>
          <TouchableOpacity style={styles.copyBtn}>
            <Copy color={colors.grey} size={14} />
          </TouchableOpacity>
        </View>

        {/* Important Warning */}
        <View style={styles.warningCard}>
          <View style={{ marginTop: 2 }}>
            <AlertTriangle color="#F3BA2F" size={16} />
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Important</Typography>
            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2, lineHeight: 16 }}>
              Send only {coinSymbol} to this deposit address. Sending any other coin or token may result in permanent loss.
            </Typography>
          </View>
        </View>

        {/* More Details */}
        {isMoreDetailsExpanded ? (
          <>
            <View style={[styles.card, { padding: 0, marginTop: 8 }]}>
              <View style={styles.detailRow}>
                <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular }}>Deposit to</Typography>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Typography size={13} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>Spot Wallet</Typography>
                  <ChevronDown color={colors.white} size={14} />
                </TouchableOpacity>
              </View>
              <View style={styles.detailRow}>
                <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular }}>Minimum Deposit</Typography>
                <Typography size={13} style={{ color: colors.white, fontFamily: fonts.medium }}>{'>'}0.00000002 {coinSymbol}</Typography>
              </View>
              <View style={styles.detailRow}>
                <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular }}>Credited (Trading enabled)</Typography>
                <Typography size={13} style={{ color: colors.white, fontFamily: fonts.medium }}>1 Confirmation</Typography>
              </View>
              <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular }}>Unlocked (Withdrawal enabled)</Typography>
                <Typography size={13} style={{ color: colors.white, fontFamily: fonts.medium }}>1 Confirmation</Typography>
              </View>
            </View>

            <View style={styles.warningCard}>
              <View style={{ flex: 1 }}>
                <View style={styles.warningRow}>
                  <AlertTriangle color="#F3BA2F" size={14} />
                  <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 10 }}>
                    Do not send assets via unsupported networks
                  </Typography>
                </View>
                <View style={[styles.warningRow, { marginTop: 14 }]}>
                  <AlertTriangle color="#F3BA2F" size={14} />
                  <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 10 }}>
                    NFTs are not supported on this address
                  </Typography>
                </View>
              </View>
            </View>
          </>
        ) : (
          <TouchableOpacity 
            style={[styles.card, styles.rowCard, { marginTop: 8 }]}
            onPress={() => setIsMoreDetailsExpanded(true)}
          >
            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>More Details</Typography>
            <ChevronDown color={colors.grey} size={16} />
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <CommonButton title="Save & Share Address" variant="primary" />
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    height: 35, width: 35, alignItems: "center", justifyContent: "center"
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  qrCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  qrCardLeft: {
    flex: 1,
    paddingRight: 16,
  },
  qrCardRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  qrCodeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontFamily: fonts.medium,
    marginBottom: 8,
    marginTop: 8,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
  },
  primaryBtn: {
    height: 48,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
