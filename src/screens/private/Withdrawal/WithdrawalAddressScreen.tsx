import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { History, FileText, ChevronDown, RefreshCw, Shield, Info, UserSquare, CalendarDays, Mail, Phone as PhoneIcon, CreditCard } from 'lucide-react-native';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { CommonButton } from '../../../components/common/CommonButton';
import { CommonInput } from '../../../components/common/CommonInput';
import { NetworkSelectSheet } from './components/NetworkSelectSheet';

export const WithdrawalAddressScreen = () => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const coinSymbol = 'USDT';
  const [activeTab, setActiveTab] = useState('Address');

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const networkSheetRef = useRef<any>(null);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  
  const [coincodeSubTab, setCoincodeSubTab] = useState('Email');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <FastImage source={ImageAssets.backButtonImg} resizeMode="contain" style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <View style={[styles.coinLogo, { backgroundColor: colors.green }]}>
            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold }}>T</Typography>
          </View>
          <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold, marginLeft: 8 }}>
            {coinSymbol}
          </Typography>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <FileText color={colors.white} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <History color={colors.white} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'Address' && styles.activeTabBtn]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('Address')}
        >
          <LinearGradient
            colors={activeTab === 'Address' ? ['rgba(0, 255, 255, 0.15)', 'transparent'] : ['transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.medium,
              color: activeTab === 'Address' ? colors.white : colors.grey
            }}
          >
            Address
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'Coincode' && styles.activeTabBtn]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('Coincode')}
        >
          <LinearGradient
            colors={activeTab === 'CoinCode' ? ['rgba(0, 255, 255, 0.15)', 'transparent'] : ['transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.medium,
              color: activeTab === 'Coincode' ? colors.white : colors.grey
            }}
          >
            Coincode User
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sub Tabs for Coincode User */}
      {activeTab === 'Coincode' && (
        <View style={styles.subTabsContainer}>
          {[
            { id: 'Email', icon: Mail, label: 'Email' },
            { id: 'Phone', icon: PhoneIcon, label: 'Phone' },
            { id: 'Coincode ID', icon: CreditCard, label: 'Coincode ID' }
          ].map(tab => {
            const isActive = coincodeSubTab === tab.id;
            const Icon = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.subTabBtn, isActive && styles.activeSubTabBtn]}
                activeOpacity={0.8}
                onPress={() => setCoincodeSubTab(tab.id)}
              >
                <Icon color={isActive ? colors.white : colors.grey} size={16} />
                <Typography size={13} style={{ color: isActive ? colors.white : colors.grey, fontFamily: fonts.medium, marginLeft: 6 }}>
                  {tab.label}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {activeTab === 'Address' ? (
          <>
            {/* Address Input */}
            <View style={styles.inputSection}>
              <Typography size={13} style={styles.inputLabel}>Address</Typography>
              <CommonInput
                placeholder="Enter wallet address"
                value={address}
                onChangeText={setAddress}
                rightIcon={
                  <TouchableOpacity>
                    <UserSquare color={colors.grey} size={20} />
                  </TouchableOpacity>
                }
              />
            </View>

            {/* Network Select */}
            <View style={styles.inputSection}>
              <Typography size={13} style={styles.inputLabel}>Network</Typography>
              <TouchableOpacity activeOpacity={0.8} onPress={() => networkSheetRef.current?.open()}>
                <View pointerEvents="none">
                  <CommonInput
                    placeholder="Select Network"
                    value={selectedNetwork}
                    editable={false}
                    rightIcon={<ChevronDown color={colors.grey} size={20} />}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Coincode Inputs */}
            {coincodeSubTab === 'Email' && (
              <View style={styles.inputSection}>
                <Typography size={13} style={styles.inputLabel}>Email</Typography>
                <CommonInput
                  placeholder="Enter Email"
                  keyboardType="email-address"
                />
              </View>
            )}
            {coincodeSubTab === 'Phone' && (
              <View style={styles.inputSection}>
                <Typography size={13} style={styles.inputLabel}>Phone</Typography>
                <CommonInput
                  placeholder="Recipient’s phone number"
                  keyboardType="phone-pad"
                  leftIcon={
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10, borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.1)', marginRight: 10 }}>
                      <Text style={{ fontSize: 16, marginRight: 6 }}>🇮🇳</Text>
                      <Typography size={14} style={{ color: colors.white, fontFamily: fonts.regular }}>+91</Typography>
                      <ChevronDown color={colors.grey} size={16} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                  }
                />
              </View>
            )}
            {coincodeSubTab === 'Coincode ID' && (
              <View style={styles.inputSection}>
                <Typography size={13} style={styles.inputLabel}>Coincode</Typography>
                <CommonInput
                  placeholder="Recipient’s Coincode ID"
                />
              </View>
            )}
          </>
        )}

        {/* Withdrawal Amount */}
        <View style={styles.inputSection}>
          <Typography size={13} style={styles.inputLabel}>Withdrawal Amount</Typography>
          <CommonInput
            placeholder="Please Enter"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            rightIcon={
              <View style={styles.amountRight}>
                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 8 }}>{coinSymbol}</Typography>
                <TouchableOpacity>
                  <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.medium }}>MAX</Typography>
                </TouchableOpacity>
              </View>
            }
          />
        </View>

        {/* Available Balance */}
        <View style={styles.balanceRow}>
          <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>
            Available Balance
          </Typography>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography size={13} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 6 }}>
              0 {coinSymbol}
            </Typography>
            <RefreshCw color={colors.cyan} size={14} />
          </View>
        </View>

        {/* Stay Safe Warning */}
        <View style={styles.warningCard}>
          <View style={styles.shieldIconWrapper}>
            <Shield color="#26A17B" size={20} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
              Stay Safe, Always
            </Typography>
            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4, lineHeight: 18 }}>
              Never share your passwords, OTPs, recovery phrases, or private keys with anyone. Always verify wallet addresses before confirming transactions.
            </Typography>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.feeRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.circleIcon}>
              <View style={styles.innerDot} />
            </View>
            <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 8, marginRight: 4 }}>
              Network Fee
            </Typography>
            <Info color={colors.grey} size={14} />
          </View>
          <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium }}>
            0 {coinSymbol}
          </Typography>
        </View>

        <View style={[styles.feeRow, { marginBottom: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.circleIcon}>
              <View style={[styles.innerDot, { backgroundColor: colors.cyan }]} />
            </View>
            <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 8, marginRight: 4 }}>
              You Will Receive
            </Typography>
            <Info color={colors.grey} size={14} />
          </View>
          <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium }}>
            -- {coinSymbol}
          </Typography>
        </View>

        <CommonButton title="Withdrawal" variant="primary" />
      </View>
      <NetworkSelectSheet sheetRef={networkSheetRef} onSelect={setSelectedNetwork} />
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
    height: 42,
    alignSelf: 'flex-start',
    width: 280,
  },
  tabBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
  },
  activeTabBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderLeftColor: '#00FFFF',
  },
  subTabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 4,
  },
  subTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 16,
  },
  activeSubTabBtn: {
    backgroundColor: '#00FFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  inputSection: {
    marginBottom: 4,
  },
  inputLabel: {
    color: '#fff',
    fontFamily: fonts.semiBold,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  inputIconRight: {
    paddingLeft: 12,
  },
  amountRight: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: 12,
    marginLeft: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -8,
  },
  warningCard: {
    backgroundColor: 'rgba(38, 161, 123, 0.05)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(38, 161, 123, 0.2)',
  },
  shieldIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(38, 161, 123, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 16,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  circleIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
