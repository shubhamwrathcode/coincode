import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import {
  ChevronRight,
  CheckCircle2
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { ToggleSwitch } from '../TradePage/components/ToggleSwitch';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';

const ACTION_BUTTONS = [
  { img: ImageAssets.depositIcon, label: 'Deposit' },
  { img: ImageAssets.p2pIcon, label: 'P2P' },
  { img: ImageAssets.withdrawalIcon, label: 'Withdrawal' },
  { img: ImageAssets.convertIcon, label: 'Convert' },
  { img: ImageAssets.inviteFriendsIcon, label: 'Invite Friends' },
  { img: ImageAssets.copyTradeIcon, label: 'Copy Trading' },
  { img: ImageAssets.newsIcon, label: 'News' },
  { img: ImageAssets.moreIcon, label: 'More' },
];

export const MyProfileScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [productChangelog, setProductChangelog] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <FastImage source={ImageAssets.backButtonImg} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <FastImage source={ImageAssets.scanImg} style={{ width: 40, height: 40 }} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <FastImage source={ImageAssets.settingImg} style={{ width: 40, height: 40 }} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <FastImage source={ImageAssets.headphoneImg} style={{ width: 40, height: 40 }} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* User Info Section */}
        <TouchableOpacity style={styles.userInfoContainer}>
          <View style={[styles.avatarContainer, { borderColor: colors.cyan, borderWidth: 1.5 }]}>
            <FastImage
              source={ImageAssets.userAvtar}
              style={{
                width: 73, height: 73, borderRadius: 30,
                position: "absolute", bottom: 2
              }}
              resizeMode="cover"
            />
          </View>

          <View style={styles.userDetails}>
            <View style={styles.emailRow}>
              <Typography size={16} style={{ fontFamily: fonts.semiBold, color: colors.white, marginRight: 6 }}>
                jie****@gmail.com
              </Typography>
              <CheckCircle2 color={colors.cyan} fill={colors.cyan} size={16} />
            </View>
            <Typography size={13} style={{ color: colors.grey, marginBottom: 8 }}>
              UID: 224183177
            </Typography>
            <View style={styles.badgesRow}>
              <View style={[styles.badge, { backgroundColor: 'rgba(0, 255, 255, 0.1)' }]}>
                <Typography size={10} style={{ color: colors.cyan, fontFamily: fonts.medium }}>VIP 0</Typography>
              </View>
              <View style={[styles.badge, { backgroundColor: 'rgba(244, 67, 54, 0.15)' }]}>
                <Typography size={10} style={{ color: '#F44336', fontFamily: fonts.medium }}>Failed</Typography>
              </View>
            </View>
          </View>
          <ChevronRight color={colors.white} size={20} />
        </TouchableOpacity>

        {/* Referral Program Banner */}
        <TouchableOpacity style={styles.referralBanner}>
          <View style={styles.referralContent}>
            <Typography size={16} style={{ fontFamily: fonts.semiBold, color: colors.cyan, marginBottom: 4 }}>
              Referral Program
            </Typography>
            <Typography size={13} style={{ color: colors.grey, lineHeight: 18 }}>
              Refer friends to earn a 35%{'\n'}commission
            </Typography>
          </View>
          <View style={styles.referralImagePlaceholder}>
            <FastImage
              source={ImageAssets.referProgramIcon}
              style={{
                width: 180,
                height: 160,
                position: 'absolute',
                right: -10,
                bottom: -25,
              }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* Action Grid */}
        <View style={styles.gridContainer}>
          {ACTION_BUTTONS.map((action, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <View style={styles.gridIconContainer}>
                <FastImage source={action.img} style={{ width: 22, height: 22 }} resizeMode="contain" />
              </View>
              <Typography size={12} style={{
                color: colors.white, textAlign: 'center',
                fontFamily: fonts.medium
              }}>
                {action.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>

        {/* List Items */}
        <View style={styles.listSection}>
          <TouchableOpacity style={styles.listItem}>
            <Typography size={14} style={{ fontFamily: fonts.medium, color: colors.white }}>
              Suggestions
            </Typography>
            <ChevronRight color={colors.grey} size={20} />
          </TouchableOpacity>

          <View style={styles.listItem}>
            <Typography size={14} style={{ fontFamily: fonts.medium, color: colors.white }}>
              Product Changelog
            </Typography>
            <ToggleSwitch value={productChangelog} onValueChange={setProductChangelog} />
          </View>

          <TouchableOpacity style={styles.listItem}>
            <Typography size={14} style={{ fontFamily: fonts.medium, color: colors.white }}>
              Customer Support
            </Typography>
            <ChevronRight color={colors.grey} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <Typography size={14} style={{ fontFamily: fonts.medium, color: colors.white }}>
              Help Center
            </Typography>
            <ChevronRight color={colors.grey} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <Typography size={14} style={{ fontFamily: fonts.medium, color: colors.white }}>
              About
            </Typography>
            <ChevronRight color={colors.grey} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <Typography size={14} style={{ fontFamily: fonts.medium, color: colors.white }}>
              Select Server
            </Typography>
            <Typography size={14} style={{ fontFamily: fonts.medium, color: colors.cyan }}>
              Auto Select
            </Typography>
          </TouchableOpacity>
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
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    marginLeft: 12,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 10
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  referralBanner: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
    marginBottom: 24,
    alignItems: 'center',
    height: 85,
    position: 'relative',
    overflow: 'visible',
  },
  referralContent: {
    flex: 1,
    paddingRight: 10,
  },
  referralImagePlaceholder: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginHorizontal: 10,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  gridItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  gridIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  listSection: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  }
});
