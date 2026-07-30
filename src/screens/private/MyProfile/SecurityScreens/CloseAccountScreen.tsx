import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Frown, Users, Grid, AlertCircle, FileText, Lock, Activity, CreditCard, Monitor, Clock, Star, User } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonButton } from '../../../../components/common/CommonButton';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { colors } from '../../../../theme/colors';

const { width } = Dimensions.get('window');

export const CloseAccountScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [step, setStep] = useState(1);
    const [selectedReason, setSelectedReason] = useState<number | null>(0); // 0, 1, 2
    const [isAgreed, setIsAgreed] = useState(false);
    const bottomSheetRef = useRef<any>(null);

    const handleNext = () => {
        if (step === 1) setStep(2);
        else if (step === 2) setStep(3);
        else if (step === 3) bottomSheetRef.current?.open();
    };

    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            <Typography size={24} style={{ color: colors.white, fontFamily: fonts.bold, marginBottom: 16 }}>
                Why do you want to close your account?
            </Typography>
            <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 24 }}>
                Your feedback helps us improve and serve you better.
            </Typography>

            <TouchableOpacity
                style={[styles.reasonCard, selectedReason === 0 && { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.05)' }]}
                onPress={() => setSelectedReason(0)}
            >
                <View style={styles.reasonIconBox}>
                    <Frown color={selectedReason === 0 ? colors.cyan : colors.grey} size={20} />
                </View>
                <Typography size={14} style={{ flex: 1, color: colors.white, fontFamily: fonts.semiBold }}>
                    I no longer wish to use this account
                </Typography>
                <View style={[styles.radio, selectedReason === 0 && { borderColor: colors.cyan }]}>
                    {selectedReason === 0 && <View style={styles.radioInner} />}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.reasonCard, selectedReason === 1 && { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.05)' }]}
                onPress={() => setSelectedReason(1)}
            >
                <View style={styles.reasonIconBox}>
                    <Users color={selectedReason === 1 ? colors.cyan : colors.grey} size={20} />
                </View>
                <Typography size={14} style={{ flex: 1, color: colors.white, fontFamily: fonts.semiBold }}>
                    Merge multiple accounts into one
                </Typography>
                <View style={[styles.radio, selectedReason === 1 && { borderColor: colors.cyan }]}>
                    {selectedReason === 1 && <View style={styles.radioInner} />}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.reasonCard, selectedReason === 2 && { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.05)' }]}
                onPress={() => setSelectedReason(2)}
            >
                <View style={styles.reasonIconBox}>
                    <Grid color={selectedReason === 2 ? colors.cyan : colors.grey} size={20} />
                </View>
                <Typography size={14} style={{ flex: 1, color: colors.white, fontFamily: fonts.semiBold }}>
                    Others
                </Typography>
                <View style={[styles.radio, selectedReason === 2 && { borderColor: colors.cyan }]}>
                    {selectedReason === 2 && <View style={styles.radioInner} />}
                </View>
            </TouchableOpacity>

            <View style={styles.noticeBox}>
                <AlertCircle color={colors.cyan} size={16} style={{ marginRight: 8, marginTop: 2 }} />
                <Typography size={12} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                    Please note that once your account is closed, you may lose access to your data permanently.
                </Typography>
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            <View style={styles.termsHeaderRow}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                    <Typography size={22} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                        Coincode Account Deregistration
                    </Typography>
                    <Typography size={18} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>
                        Terms and Conditions
                    </Typography>
                </View>
                {/* Fallback image if deregistration shield icon not provided */}
                <FastImage
                    source={ImageAssets.deleteAccountTermBanner}
                    style={{ width: 130, height: 150, }}
                    resizeMode="contain"
                />
            </View>

            <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 20, marginBottom: 16 }}>
                This Coincode Account Deregistration Terms and Conditions ("Terms") applies to all users who wishes to, requests or applies to deregister or cancel its account ("Coincode Account") opened or registered with or on the Sites of Coincode ("we", "our", "us", "ours"). By submitting an application or request for or proceeding with the deregistration and cancellation of your Coincode Account, you will be deemed to have fully read, understood and expressly agreed and consented to the Terms.
            </Typography>

            <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 20, marginBottom: 24 }}>
                The Terms shall be supplemental to and constitute part of the Coincode User Agreement (available at <Typography size={13} style={{ color: colors.cyan }}>coincode.com/user-agreement</Typography>) ("User Agreement") and should be read in conjunction with such User Agreement. Therefore, unless otherwise stated in this Agreement, the capitalized terms used in this Agreement shall have the same meaning given to them under the User Agreement.
            </Typography>

            <View style={styles.termSection}>
                <View style={styles.termSectionHeader}>
                    <View style={styles.stepNumberBadge}>
                        <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold }}>1</Typography>
                    </View>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                        Deregistration of your Coincode Account
                    </Typography>
                </View>

                <View style={styles.termSectionContent}>
                    <View style={styles.fileIconBox}>
                        <FileText color={colors.cyan} size={16} />
                    </View>
                    <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 20 }}>
                        <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold }}>(a)</Typography> You may request or apply to cancel and deregister your Coincode Account ('Account Deregistration') by submitting a request and following instructions on relevant pages in the 'Security Centre' of your account.
                    </Typography>
                </View>
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            <View style={{ alignItems: 'center', }}>
                <FastImage
                    source={ImageAssets.deleteAccountIcon}
                    style={{ width: 200, height: 180 }}
                    resizeMode="contain"
                />
                <Typography size={20} style={{ color: colors.white, fontFamily: fonts.bold, marginTop: 8 }}>
                    Close Your Account
                </Typography>
            </View>

            <View style={styles.consequencesCard}>

                <View style={styles.consequenceRow}>
                    <View style={styles.cIconBox}><User color={colors.cyan} size={16} /></View>
                    <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                        You will not be able to recover this account.
                    </Typography>
                </View>
                <View style={styles.divider} />

                <View style={styles.consequenceRow}>
                    <View style={styles.cIconBox}><Lock color={colors.cyan} size={16} /></View>
                    <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                        You will no longer be able to log in to this account or its subaccounts.
                    </Typography>
                </View>
                <View style={styles.divider} />

                <View style={styles.consequenceRow}>
                    <View style={styles.cIconBox}><Activity color={colors.cyan} size={16} /></View>
                    <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                        The trading functions of this account and its subaccounts will be disabled.
                    </Typography>
                </View>
                <View style={styles.divider} />

                <View style={styles.consequenceRow}>
                    <View style={styles.cIconBox}><CreditCard color={colors.cyan} size={16} /></View>
                    <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                        Your <Typography size={13} style={{ color: colors.cyan }}>Coincode</Typography> Card will be closed and can no longer be used.
                    </Typography>
                </View>
                <View style={styles.divider} />

                <View style={styles.consequenceRow}>
                    <View style={styles.cIconBox}><Monitor color={colors.cyan} size={16} /></View>
                    <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                        The authorized devices for this account will be removed automatically.
                    </Typography>
                </View>
                <View style={styles.divider} />

                <View style={styles.consequenceRow}>
                    <View style={styles.cIconBox}><Clock color={colors.cyan} size={16} /></View>
                    <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                        All pending withdrawals, deposits, and transactions associated with this account will be permanently canceled.
                    </Typography>
                </View>
                <View style={styles.divider} />

                <View style={styles.consequenceRow}>
                    <View style={styles.cIconBox}><Star color={colors.cyan} size={16} /></View>
                    <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                        Rewards, bonuses, and promotional benefits linked to this account will expire immediately after account closure.
                    </Typography>
                </View>
            </View>

            <TouchableOpacity style={styles.agreeRow} onPress={() => setIsAgreed(!isAgreed)}>
                <View style={[styles.checkbox, isAgreed && { backgroundColor: colors.cyan, borderColor: colors.cyan }]}>
                    {isAgreed && <Typography size={10} style={{ color: colors.white, fontFamily: fonts.bold }}>✓</Typography>}
                </View>
                <Typography size={12} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                    I agree to relinquish all remaining assets in this account and confirm that I fully waive and release any claims. I will not hold <Typography size={12} style={{ color: colors.cyan }}>Coincode</Typography> responsible for any account closure or loss of balance.
                </Typography>
            </TouchableOpacity>

        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => {
                    if (step > 1) {
                        setStep(step - 1);
                    } else {
                        navigation.goBack();
                    }
                }}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </ScrollView>

            <View style={styles.bottomContainer}>
                <CommonButton
                    title={step === 1 ? 'Confirm' : 'Accept and Continue'}
                    onPress={handleNext}
                    disabled={step === 3 && !isAgreed}
                />
            </View>

            <CustomBottomSheet
                sheetRef={bottomSheetRef}
                title=""
                height={420}
            >
                <View style={styles.sheetContent}>
                    <Typography size={22} style={{ color: colors.white, fontFamily: fonts.bold, marginBottom: 12 }}>
                        Are you sure you want to{'\n'}
                        <Typography size={22} style={{ color: colors.cyan, fontFamily: fonts.bold }}>close this account?</Typography>
                    </Typography>

                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18, marginBottom: 20 }}>
                        Once your account closure is confirmed, it cannot be reversed. Please ensure you understand and accept all associated risks.
                    </Typography>

                    <Typography size={16} style={{ color: colors.cyan, fontFamily: fonts.semiBold, marginBottom: 12 }}>
                        Account to be closed
                    </Typography>

                    <View style={styles.warningListCard}>
                        <View style={styles.consequenceRow}>
                            <View style={styles.cIconBox}><User color={colors.cyan} size={16} /></View>
                            <View style={{ flex: 1 }}>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 2 }}>
                                    Coincode User
                                </Typography>
                                <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                                    UID: 52444419
                                </Typography>
                            </View>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.consequenceRow}>
                            <View style={styles.cIconBox}><Clock color={colors.cyan} size={16} /></View>
                            <Typography size={12} style={{ flex: 1, color: colors.white, fontFamily: fonts.semiBold, lineHeight: 18 }}>
                                All pending withdrawals, deposits, and transactions <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>associated with this account will be permanently canceled.</Typography>
                            </Typography>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.consequenceRow}>
                            <View style={styles.cIconBox}><Star color={colors.cyan} size={16} /></View>
                            <Typography size={12} style={{ flex: 1, color: colors.white, fontFamily: fonts.semiBold, lineHeight: 18 }}>
                                Rewards, bonuses, and promotional benefits linked <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>to this account will expire immediately after account closure.</Typography>
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.sheetActionRow}>
                        <TouchableOpacity style={styles.sheetCancelBtn} onPress={() => bottomSheetRef.current?.close()}>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                                Cancel
                            </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sheetConfirmBtn} onPress={() => {
                            bottomSheetRef.current?.close();
                            // handle close account logic
                            navigation.goBack();
                        }}>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                                Close
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomBottomSheet>
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
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    stepContainer: {
        flex: 1,
    },
    reasonCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 10,
    },
    reasonIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.cyan,
    },
    noticeBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 12,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    },
    termsHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    termSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
    },
    termSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepNumberBadge: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: colors.cyan,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    termSectionContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    fileIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 204, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    consequencesCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
    },
    consequenceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 204, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginVertical: 12,
    },
    agreeRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    sheetContent: {
        paddingTop: 10,
    },
    warningListCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    sheetActionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sheetCancelBtn: {
        flex: 1,
        height: 52,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    sheetConfirmBtn: {
        flex: 1,
        height: 52,
        backgroundColor: '#00C076',
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    }
});
