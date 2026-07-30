import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, User, Mail, Phone, Edit3, Trash2 } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonButton } from '../../../../components/common/CommonButton';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

const { width } = Dimensions.get('window');

export const ReviewEmergencyContactScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, flex: 1, textAlign: 'center' }}>
                    Confirm Information
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Banner */}
                <View style={styles.bannerContainer}>
                    <FastImage
                        source={ImageAssets.reviewEmergencyContactBanner}
                        style={styles.banner}
                        resizeMode="contain"
                    />
                </View>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <Typography size={22} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                        Review & Confirm Your{'\n'}
                        <Typography size={22} style={{ color: colors.cyan, fontFamily: fonts.bold }}>Emergency Contact</Typography>
                    </Typography>
                </View>

                {/* Description */}
                <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 20, textAlign: 'center', marginBottom: 24, paddingHorizontal: 10 }}>
                    Please review the contact details carefully before continuing. We will use this information to reach your emergency contact when the conditions you set are triggered.
                </Typography>

                {/* Info Card */}
                <View style={styles.detailsCard}>
                    
                    {/* Name Row */}
                    <View style={styles.detailRow}>
                        <View style={styles.rowLeft}>
                            <View style={styles.iconBox}>
                                <User color={colors.cyan} size={18} />
                            </View>
                            <Typography size={15} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                                Hello
                            </Typography>
                        </View>
                        <View style={styles.rowRight}>
                            <TouchableOpacity style={styles.actionIconBtn} onPress={() => navigation.goBack()}>
                                <Edit3 color={colors.grey} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionIconBtn}>
                                <Trash2 color={colors.grey} size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Email Row */}
                    <View style={styles.detailRow}>
                        <View style={styles.iconBox}>
                            <Mail color={colors.cyan} size={18} />
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 2 }}>
                                Contact Email
                            </Typography>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium }}>
                                ***9@gmail.com
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Phone Row */}
                    <View style={styles.detailRow}>
                        <View style={styles.iconBox}>
                            <Phone color={colors.cyan} size={18} />
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 2 }}>
                                Contact Phone Number
                            </Typography>
                            <Typography size={14} style={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: fonts.medium }}>
                                Not Provided
                            </Typography>
                        </View>
                    </View>
                </View>

                {/* Footer Warning */}
                <View style={styles.warningBox}>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                        Your emergency contact will only be notified when the conditions you set are triggered. Your information is always safe and encrypted.
                    </Typography>
                </View>

            </ScrollView>

            <View style={styles.bottomContainer}>
                <CommonButton
                    title="Save"
                    onPress={() => {
                        // Final Save Logic
                    }}
                />
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
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    bannerContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    banner: {
        width: width * 0.7,
        height: 200,
    },
    titleContainer: {
        marginBottom: 8,
        alignItems: 'center',
    },
    detailsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    actionIconBtn: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    detailTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginVertical: 16,
    },
    warningBox: {
        backgroundColor: 'rgba(0, 204, 255, 0.04)',
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.1)',
        borderRadius: 12,
        padding: 16,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    }
});
