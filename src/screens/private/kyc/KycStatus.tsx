import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, X, ShieldCheck, Hourglass, XCircle, FileText, CheckCircle2, Lock, Download, ArrowUp, Activity, Users, LayoutGrid } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { CommonButton } from '../../../components/common/CommonButton';
import { Screen } from '../../../components/common/Screen';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';

export type KycStatusType = 'SUCCESS' | 'PENDING' | 'FAILED';

const KycStatus = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    // You can pass { status: 'FAILED' } etc when navigating to this screen.
    // Defaulting to SUCCESS for preview
    const status: KycStatusType = (route.params as any)?.status || 'SUCCESS';

    const getStatusConfig = () => {
        switch (status) {
            case 'SUCCESS':
                return {
                    color: '#22C55E', // Green
                    icon: <FastImage source={ImageAssets.verification_success} style={{ width: 200, height: 200 }} resizeMode="contain" />,
                    badgeText: 'VERIFICATION SUCCESSFUL',
                    subtitle: 'Your identity has been verified successfully.',
                    cardTitle: 'Scanned or copied documents\nare not accepted.',
                    cardDesc: 'Please upload a clear photo of your original ID\ndocument.',
                    cardIcon: <FileText color="#06B6D4" size={20} />, // Icon is cyan in screenshot
                    btnTitle: 'Go to Home',
                    btnIcon: <LayoutGrid color={colors.white} size={18} />,
                    btnGradient: ['#15803D', '#22C55E', '#15803D'],
                    privilegeIcon: <CheckCircle2 color="#22C55E" size={20} />,
                };
            case 'PENDING':
                return {
                    color: '#F59E0B', // Orange
                    icon: <FastImage source={ImageAssets.verification_pending} style={{ width: 80, height: 80 }} resizeMode="contain" />,
                    badgeText: 'Pending',
                    subtitle: 'Your identity has been verified successfully.',
                    cardTitle: 'Scanned or copied documents\nare not accepted.',
                    cardDesc: 'Please upload a clear photo of your original ID\ndocument.',
                    cardIcon: <FileText color="#F59E0B" size={20} />,
                    btnTitle: 'Try Again',
                    btnIcon: undefined,
                    btnGradient: ['#723D0A', '#F17906', '#723D0A'],
                    privilegeIcon: <Lock color="#F59E0B" size={16} />,
                };
            case 'FAILED':
                return {
                    color: '#EF4444', // Red
                    icon: <FastImage source={ImageAssets.verification_reject} style={{ width: 80, height: 80 }} resizeMode="contain" />,
                    badgeText: 'Failed',
                    subtitle: 'Your identity has been verified successfully.',
                    cardTitle: 'Your verification is incomplete.',
                    cardDesc: 'Please submit the required details and\ncomplete facial recognition.',
                    cardIcon: <XCircle color="#EF4444" size={20} />,
                    btnTitle: 'Try Again',
                    btnIcon: undefined,
                    btnGradient: ['#660005', '#FB2C36', '#660005'],
                    privilegeIcon: <Lock color="#EF4444" size={16} />,
                };
        }
    };

    const config = getStatusConfig();

    const privileges = [
        { id: 1, name: 'Withdrawal', icon: <Download color={colors.white} size={16} /> },
        { id: 2, name: 'Deposit', icon: <ArrowUp color={colors.white} size={16} /> },
        { id: 3, name: 'Trading', icon: <Activity color={colors.white} size={16} /> },
        { id: 4, name: 'P2P', icon: <Users color={colors.white} size={16} /> },
    ];

    return (
        <Screen>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                    <ChevronLeft color={colors.white} size={20} />
                </TouchableOpacity>
                <Typography color={colors.white} size={18} style={{ fontFamily: fonts.bold }}>
                    Verification Center
                </Typography>
                <View></View>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Status Graphic */}
                <View style={styles.graphicSection}>
                    <View style={styles.glowCircle}>
                        {config.icon}
                    </View>
                    {/* Badge */}
                    <View style={[styles.badge, { borderColor: config.color }]}>
                        <View style={[styles.badgeDot, { backgroundColor: config.color }]} />
                        <Typography color={config.color} size={12} style={{ fontFamily: fonts.semiBold, textTransform: 'uppercase' }}>
                            {config.badgeText}
                        </Typography>
                    </View>
                </View>
                {/* User Info */}
                <Typography color={colors.white} size={18} style={{ fontFamily: fonts.bold, textAlign: 'center', marginBottom: 4, marginTop: 10 }}>
                    Coincode User-0c52a95c
                </Typography>
                <Typography color={colors.grey} size={12} style={{ fontFamily: fonts.regular, textAlign: 'center', marginBottom: 20 }}>
                    {config.subtitle}
                </Typography>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconWrapper}>
                        {config.cardIcon}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Typography color={colors.white} size={13} style={{ fontFamily: fonts.medium, marginBottom: 4 }}>
                            {config.cardTitle}
                        </Typography>
                        <Typography color={colors.grey} size={12} style={{ fontFamily: fonts.regular, lineHeight: 16 }}>
                            {config.cardDesc}
                        </Typography>
                    </View>
                </View>

                {/* Action Button */}
                <CommonButton
                    title={config.btnTitle}
                    onPress={() => { }}
                    style={{ marginBottom: 24, borderWidth: 0 }}
                    gradientColors={config.btnGradient}
                    leftIcon={config.btnIcon}
                />

                {/* Privileges Table */}
                <View style={styles.tableCard}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <View style={{ flex: 2 }}>
                            <Typography color={colors.grey} size={13} style={{ fontFamily: fonts.medium }}>
                                Privileges
                            </Typography>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Typography color={colors.grey} size={13} style={{ fontFamily: fonts.medium }}>
                                Not Verified
                            </Typography>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Typography color={colors.grey} size={13} style={{ fontFamily: fonts.medium }}>
                                Verified
                            </Typography>
                        </View>
                    </View>

                    {/* Table Rows */}
                    {privileges.map((item, index) => (
                        <View key={item.id} style={[styles.tableRow, index === privileges.length - 1 && { borderBottomWidth: 0 }]}>
                            <View style={styles.tableRowLeft}>
                                <View style={styles.rowIconWrapper}>
                                    {item.icon}
                                </View>
                                <Typography color={colors.white} size={14} style={{ fontFamily: fonts.semiBold }}>
                                    {item.name}
                                </Typography>
                            </View>

                            <View style={styles.tableRowMiddle}>
                                <Typography color={colors.darkShadeColorText} size={16} style={{ fontFamily: fonts.bold }}>
                                    —
                                </Typography>
                            </View>

                            <View style={styles.tableRowRight}>
                                {config.privilegeIcon}
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </Screen>
    );
};

export default KycStatus;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 10,
    },
    headerBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#111214',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    graphicSection: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    glowCircle: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#08090B', // match bg to cover circle border
        marginTop: 20,
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#111214',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#1E1E1E',
    },
    infoIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    tableCard: {
        backgroundColor: '#111214',
        borderRadius: 16,
        paddingTop: 16,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: '#1E1E1E',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E1E',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E1E',
    },
    tableRowLeft: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    tableRowMiddle: {
        flex: 1,
        alignItems: 'center',
    },
    tableRowRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
