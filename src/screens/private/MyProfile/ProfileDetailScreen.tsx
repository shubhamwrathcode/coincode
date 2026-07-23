import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { ChevronLeft, ChevronRight, UserPlus, Eye, ShieldCheck, Crown, FileText, User, AtSign, Gift, Users, LogOut, CheckCircle2, Check, Key, Smartphone, Mail, Phone, LogIn, ShieldAlert, PhoneCall, Link, Lock, Monitor, Clock, UserMinus, XCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { colors } from '../../../theme/colors';

export const ProfileDetailScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={colors.white} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIconBtn}>
          <UserPlus color={colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* User Info Section */}
        <View style={styles.userInfoContainer}>
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
              <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: colors.cyan, alignItems: 'center', justifyContent: 'center' }}>
                <Check color={colors.black} size={12} strokeWidth={3} />
              </View>
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
        </View>

        {/* Tabs */}
        <View style={[styles.tabContainer, { borderBottomColor: 'rgba(255, 255, 255, 0.1)', borderBottomWidth: 1 }]}>
          <TouchableOpacity onPress={() => setActiveTab('Profile')} style={styles.tabButton}>
            {activeTab === 'Profile' && (
              <>
                <FastImage source={ImageAssets.tabBgImg} style={StyleSheet.absoluteFill} resizeMode="stretch" />
                <View style={{ position: 'absolute', bottom: -1, width: 70, height: 2, backgroundColor: colors.cyan }} />
              </>
            )}
            <Typography size={14} style={{ color: activeTab === 'Profile' ? colors.cyan : colors.grey, fontFamily: activeTab === 'Profile' ? fonts.semiBold : fonts.medium, zIndex: 1 }}>
              Profile
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Security')} style={styles.tabButton}>
            {activeTab === 'Security' && (
              <>
                <FastImage source={ImageAssets.tabBgImg} style={StyleSheet.absoluteFill} resizeMode="stretch" />
                <View style={{ position: 'absolute', bottom: -1, width: 70, height: 2, backgroundColor: colors.cyan }} />
              </>
            )}
            <Typography size={14} style={{ color: activeTab === 'Security' ? colors.cyan : colors.grey, fontFamily: activeTab === 'Security' ? fonts.semiBold : fonts.medium, zIndex: 1 }}>
              Security
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'Profile' && (
          <>
            {/* First Section */}
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}>
                    <ShieldCheck color={colors.cyan} size={18} />
                  </View>
                  <Typography size={14} style={styles.listText}>Identity Verification</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Unverified</Typography>
                  </View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}>
                    <Crown color={colors.cyan} size={18} />
                  </View>
                  <Typography size={14} style={styles.listText}>VIP Privilege</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.vipBadge}>
                    <Typography size={11} style={{ color: '#FFD700', fontFamily: fonts.bold }}>VIP 0</Typography>
                  </View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}>
                    <FileText color={colors.cyan} size={18} />
                  </View>
                  <Typography size={14} style={styles.listText}>Personal Page</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
            </View>

            {/* Second Section */}
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}>
                    <User color={colors.cyan} size={18} />
                  </View>
                  <Typography size={14} style={styles.listText}>Nickname</Typography>
                </View>
                <View style={styles.listRight}>
                  <Typography size={13} style={{ color: colors.grey, marginRight: 8 }}>jan*@gmail.com**</Typography>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}>
                    <AtSign color={colors.cyan} size={18} />
                  </View>
                  <Typography size={14} style={styles.listText}>Username</Typography>
                </View>
                <View style={styles.listRight}>
                  <Typography size={13} style={{ color: colors.grey, marginRight: 8 }}>jan*@gmail.com**</Typography>
                  <Eye color={colors.grey} size={16} style={{ marginRight: 8 }} />
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}>
                    <Gift color={colors.cyan} size={18} />
                  </View>
                  <Typography size={14} style={styles.listText}>Referral</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.referralBadge}>
                    <Typography size={9} style={{ color: '#4CAF50', fontFamily: fonts.medium }}>40% commission and up to 200 USDT</Typography>
                  </View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}>
                    <Users color={colors.cyan} size={18} />
                  </View>
                  <Typography size={14} style={styles.listText}>Affiliate</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.affiliateBadge}>
                    <Typography size={9} style={{ color: '#FF9800', fontFamily: fonts.medium }}>Exclusive Commissions</Typography>
                  </View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}>
                    <User color={colors.cyan} size={18} />
                  </View>
                  <Typography size={14} style={styles.listText}>Switch Account</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
            </View>

            {/* Logout Section */}
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: 'rgba(244, 67, 54, 0.05)' }]}>
                    <LogOut color="#F44336" size={18} />
                  </View>
                  <Typography size={14} style={[styles.listText, { color: '#F44336' }]}>Log Out</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 'Security' && (
          <>
            {/* 2FA Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitle}>
                <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.bold }}>Two-Factor Authentication (2FA)</Typography>
              </View>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Key color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Passkey</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Not Enabled</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Smartphone color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Authenticator App</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Not Enabled</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Mail color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Email Verification</Typography>
                </View>
                <View style={styles.listRight}>
                  <Typography size={13} style={{ color: colors.grey, marginRight: 8 }}>jan*@gmail.com**</Typography>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Phone color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Phone Number</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
            </View>

            {/* Advanced Protection Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitle}>
                <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.bold }}>Advanced Protection</Typography>
              </View>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><LogIn color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Login Verification</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Not Enabled</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><ShieldAlert color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Anti-Phishing Code</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Not Enabled</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><ShieldAlert color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Withdrawal Protection</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Not configured</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><PhoneCall color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Emergency Contact</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Link color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Connected Accounts</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
            </View>

            {/* Password & Credentials Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitle}>
                <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.bold }}>Password & Credentials</Typography>
              </View>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Lock color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Login Password</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Change Password</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Lock color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Fund Password</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Set Password</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Devices & Activity Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitle}>
                <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.bold }}>Devices & Activity</Typography>
              </View>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Monitor color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Trusted Devices</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Manage Devices</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><Clock color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Login History</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
            </View>

            {/* Account Controls Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitle}>
                <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.bold }}>Account Controls</Typography>
              </View>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><UserMinus color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Freeze Account</Typography>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.unverifiedBadge}><Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Temporarily Lock</Typography></View>
                  <ChevronRight color={colors.grey} size={18} />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><XCircle color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Close Account</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
            </View>

            {/* Privacy & Integrations Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitle}>
                <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.bold }}>Privacy & Integrations</Typography>
              </View>
              <TouchableOpacity style={styles.listItem}>
                <View style={styles.listLeft}>
                  <View style={styles.iconContainer}><ShieldCheck color={colors.cyan} size={18} /></View>
                  <Typography size={14} style={styles.listText}>Third-Party Access</Typography>
                </View>
                <ChevronRight color={colors.grey} size={18} />
              </TouchableOpacity>
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const CheckCircleIcon = () => (
  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.white }} />
);

const CopyIcon = ({ color }: { color: string }) => (
  <View style={{ width: 12, height: 12, borderWidth: 1.5, borderColor: color, borderRadius: 2, marginLeft: 6, borderStyle: 'dotted' }} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
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
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 4,
  },
  sectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    marginLeft: 12,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  unverifiedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  vipBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  referralBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  affiliateBadge: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
});
