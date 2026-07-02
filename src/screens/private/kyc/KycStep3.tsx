import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, X, ArrowRight, Camera, Lock, Zap, Layers, ScanFace, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { CommonButton } from '../../../components/common/CommonButton';
import { Screen } from '../../../components/common/Screen';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { ImageAssets } from '../../../components/common/ImageAssets';
import FastImage from 'react-native-fast-image';
import { KycProgressBar } from '../../../components/common/KycProgressBar';

const KycStep3 = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    // Scan line animation
    const scanLineY = useSharedValue(0);
    useEffect(() => {
        scanLineY.value = withRepeat(
            withTiming(150, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const scanLineStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: scanLineY.value }],
        };
    });

    return (
        <Screen>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.mainScroll} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                        <ChevronLeft color={colors.white} size={20} />
                    </TouchableOpacity>
                    <KycProgressBar currentStep={3} totalSteps={4} />
                    <View></View>
                </View>

                <View style={styles.scrollContent}>
                    {/* Title */}
                    <Typography color={colors.white} size={22} style={{ fontFamily: fonts.semiBold, marginBottom: 4, marginTop: 10 }}>
                        Face<Typography color={colors.cyan} size={22} style={{ fontFamily: fonts.semiBold, marginBottom: 4, marginTop: 10 }}> Verification</Typography>
                    </Typography>
                    <Typography color={colors.darkShadeColorText} size={13} style={{ fontFamily: fonts.medium, marginBottom: 20 }}>
                        Verify your identity to continue securely
                    </Typography>
                    {/* Main Graphic - Face Scanner */}
                    <View style={styles.scannerContainer}>
                        {/* 4 Corners */}
                        <View style={[styles.corner, styles.topLeft, { borderColor: colors.cyan }]} />
                        <View style={[styles.corner, styles.topRight, { borderColor: colors.cyan }]} />
                        <View style={[styles.corner, styles.bottomLeft, { borderColor: colors.cyan }]} />
                        <View style={[styles.corner, styles.bottomRight, { borderColor: colors.cyan }]} />

                        {/* 4th Circle: Faint Glow Ring */}
                        <View style={styles.faintGlowRing}>
                            {/* 3rd Circle: Black Ring */}
                            <View style={styles.blackRing}>
                                {/* 2nd Circle: Bright Cyan Glow */}
                                <View style={[styles.outerCircle]}>
                                    {/* 1st Circle: Sharp Cyan Border */}
                                    <View style={[styles.glowCircle, { borderColor: colors.cyan }]}>
                                        <View style={styles.avatarPlaceholder}>
                                            <FastImage source={ImageAssets.faceVeificationUser} style={{ width: 150, height: 150 }}
                                                resizeMode={FastImage.resizeMode.contain} />
                                        </View>

                                        <Animated.View style={[styles.scanLine, scanLineStyle]} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Instruction */}
                    <View style={styles.instructionContainer}>
                        <View style={styles.instructionTitleRow}>
                            <ScanFace color={colors.cyan} size={18} strokeWidth={2} />
                            <Typography color={colors.white} size={16} style={{ fontFamily: fonts.bold, marginLeft: 8 }}>
                                Position your face
                            </Typography>
                        </View>
                        <Typography color={colors.grey} size={13} style={{ fontFamily: fonts.medium }}>
                            Make sure your face is visible
                        </Typography>
                    </View>

                    {/* Features Row */}
                    <View style={styles.featuresRow}>
                        <View style={styles.featureCard}>
                            <View style={styles.featureIconWrapper}>
                                <Lock color={colors.cyan} size={16} strokeWidth={2} />
                            </View>
                            <Typography color={colors.white} size={13} style={{ fontFamily: fonts.semiBold, marginBottom: 4, textAlign: 'center' }}>
                                Secure
                            </Typography>
                            <Typography color={colors.grey} size={10} style={{ fontFamily: fonts.medium, textAlign: 'center', lineHeight: 14 }}>
                                Your data is{'\n'}protected
                            </Typography>
                        </View>

                        <View style={styles.featureCard}>
                            <View style={styles.featureIconWrapper}>
                                <Zap color={colors.cyan} size={16} strokeWidth={2} />
                            </View>
                            <Typography color={colors.white} size={13} style={{ fontFamily: fonts.semiBold, marginBottom: 4, textAlign: 'center' }}>
                                Quick
                            </Typography>
                            <Typography color={colors.grey} size={10} style={{ fontFamily: fonts.medium, textAlign: 'center', lineHeight: 14 }}>
                                Takes only a few{'\n'}seconds
                            </Typography>
                        </View>

                        <View style={styles.featureCard}>
                            <View style={styles.featureIconWrapper}>
                                <Layers color={colors.cyan} size={16} strokeWidth={2} />
                            </View>
                            <Typography color={colors.white} size={13} style={{ fontFamily: fonts.semiBold, marginBottom: 4, textAlign: 'center' }}>
                                Reliable
                            </Typography>
                            <Typography color={colors.grey} size={10} style={{ fontFamily: fonts.medium, textAlign: 'center', lineHeight: 14 }}>
                                Advanced{'\n'}verification
                            </Typography>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <CommonButton
                        title="Start Verification"
                        onPress={() => navigation.navigate('KycStep4' as never)}
                        style={{ width: '100%', marginBottom: 16 }}
                        rightIcon={<View style={styles.nextIconWrapper}><ArrowRight color={colors.white} size={14} /></View>}
                    />

                    <View style={styles.privacyRow}>
                        <ShieldCheck color={colors.darkShadeColorText} size={14} strokeWidth={2} />
                        <Typography color={colors.darkShadeColorText} size={12} style={{ fontFamily: fonts.regular, marginLeft: 6 }}>
                            Your privacy is our priority
                        </Typography>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
};

export default KycStep3;

const styles = StyleSheet.create({
    mainScroll: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
    },
    headerBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        alignItems: 'center',
    },
    scannerContainer: {
        width: 240,
        height: 240,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20,
    },
    corner: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderColor: '#06B6D4',
    },
    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderTopLeftRadius: 8,
    },
    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderTopRightRadius: 8,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderBottomLeftRadius: 8,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderBottomRightRadius: 8,
    },
    faintGlowRing: {
        width: 215,
        height: 215,
        borderRadius: 107.5,
        backgroundColor: 'rgba(6, 182, 212, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blackRing: {
        width: 190,
        height: 190,
        borderRadius: 97.5,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerCircle: {
        width: 175,
        height: 175,
        borderRadius: 87.5,
        backgroundColor: 'rgba(6, 182, 212, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    glowCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
        overflow: 'hidden',
    },
    avatarPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
    },
    avatarHead: {
        width: 60,
        height: 70,
        borderRadius: 30,
        backgroundColor: '#DEAA7E',
        marginBottom: 4,
    },
    avatarBody: {
        width: 100,
        height: 60,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#1E3E4B',
    },
    scanLine: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        height: 2,
        backgroundColor: '#FFFFFF',
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    instructionContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    instructionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    featuresRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 12,
    },
    featureCard: {
        flex: 1,
        backgroundColor: '#111214',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#1C1C1E',
        alignItems: 'center',
        height: 120,
        justifyContent: 'center',
    },
    featureIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 24,
        backgroundColor: '#08090B',
        marginTop: 'auto',
    },
    nextIconWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 4,
    },
    privacyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
