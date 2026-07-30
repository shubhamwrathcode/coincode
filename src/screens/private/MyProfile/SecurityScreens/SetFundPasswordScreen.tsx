import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight, Lock, KeyRound, ShieldQuestion } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';
import { SecurityRiskSheet } from './components/SecurityRiskSheet';

const { width } = Dimensions.get('window');

export const SetFundPasswordScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const sheetRef = useRef<any>(null);
    const [flowType, setFlowType] = useState<'change' | 'reset'>('change');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                        Set Fund Password
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Illustration */}
                <View style={styles.illustrationContainer}>
                    <FastImage
                        source={ImageAssets.fundPasswordBanner || ImageAssets.resetPasswordBanner}
                        style={{ width: width * 0.6, height: width * 0.6 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Title & Description */}
                <View style={styles.textContainer}>
                    <Typography size={24} style={{ color: colors.white, fontFamily: fonts.semiBold, textAlign: 'center', marginBottom: 12 }}>
                        Secure Your <Typography size={24} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Funds</Typography>
                    </Typography>
                    <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, textAlign: 'center', lineHeight: 22 }}>
                        Set a strong fund password to add an extra layer of protection for your assets.
                    </Typography>
                </View>

                {/* Cards */}
                <TouchableOpacity style={styles.card} onPress={() => { setFlowType('change'); sheetRef.current?.open(); }}>
                    <View style={styles.cardIconWrapper}>
                        <Lock color={colors.cyan} size={24} />
                    </View>
                    <View style={styles.cardContent}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                            Change Fund Password
                        </Typography>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                            Update your existing fund password for better security.
                        </Typography>
                    </View>
                    <View style={styles.cardArrow}>
                        <ChevronRight color={colors.cyan} size={20} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => { setFlowType('reset'); sheetRef.current?.open(); }}>
                    <View style={styles.cardIconWrapper}>
                        <KeyRound color={colors.cyan} size={24} />
                    </View>
                    <View style={styles.cardContent}>
                        <Typography size={15} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                            Reset Fund Password
                        </Typography>
                        <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                            Reset your fund password if you've forgotten it.
                        </Typography>
                    </View>
                    <View style={styles.cardArrow}>
                        <ChevronRight color={colors.cyan} size={20} />
                    </View>
                </TouchableOpacity>

            </ScrollView>


            <SecurityRiskSheet
                sheetRef={sheetRef}
                height={500}
                title={
                    <Typography size={22} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center', lineHeight: 30 }}>
                        Are you sure you want to{'\n'}change the fund password?
                    </Typography>
                }
                description="To protect your account and assets, withdrawals and P2P transactions will be temporarily restricted for 24 hours after updating your email address."
            >
                <View style={{ flexDirection: 'row', gap: 16, marginTop: 10 }}>
                    <CommonButton
                        title="Cancel"
                        variant="secondary"
                        onPress={() => sheetRef.current?.close()}
                        style={{ flex: 1, borderWidth: 0, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <CommonButton
                        title="Continue"
                        onPress={() => {
                            sheetRef.current?.close();
                            if (flowType === 'change') {
                                navigation.navigate('ChangeFundPasswordScreen' as any);
                            } else {
                                navigation.navigate('ResetFundPasswordScreen' as any);
                            }
                        }}
                        style={{ flex: 1 }}
                    />
                </View>
            </SecurityRiskSheet>
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
        paddingBottom: 16,
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
    illustrationContainer: {
        alignItems: 'center',
        marginTop: 0,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
        paddingRight: 12,
    },
    cardArrow: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    },
    orDividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    unableBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
