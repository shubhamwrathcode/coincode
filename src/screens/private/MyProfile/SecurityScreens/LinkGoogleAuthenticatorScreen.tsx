import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, FileQuestion, Copy, Lock, Eye, EyeOff } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';
import { CommonInput } from '../../../../components/common/CommonInput';

export const LinkGoogleAuthenticatorScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [showCode, setShowCode] = useState(false);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft color={colors.white} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIconBtn}>
                        <FileQuestion color={colors.white} size={20} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    {/* Hero Section */}
                    <View style={styles.heroContainer}>
                        <FastImage
                            source={ImageAssets.googleAuthenticatorBanner}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Step 1 Card */}
                    <View style={styles.card}>
                        <View style={styles.stepHeader}>
                            <View style={[styles.stepNumberBadge, { backgroundColor: 'rgba(0, 204, 255, 0.1)' }]}>
                                <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>01</Typography>
                            </View>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, marginLeft: 12 }}>
                                Scan the QR code
                            </Typography>
                        </View>
                        <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 8, lineHeight: 18 }}>
                            Open Google Authenticator and scan the QR code below or manually enter the setup key to add your verification account securely.
                        </Typography>

                        <View style={styles.qrSection}>
                            <View style={styles.qrCodeWrapper}>
                                <FastImage
                                    source={ImageAssets.scanImg}
                                    style={styles.qrImage}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.setupKeySection}>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 8 }}>
                                    Setup Key:
                                </Typography>
                                <View style={styles.setupKeyBox}>
                                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, flex: 1 }} numberOfLines={1}>
                                        0xb8a37c0ab0443734e84ed...
                                    </Typography>
                                    <TouchableOpacity style={{ padding: 4 }}>
                                        <Copy color={colors.cyan} size={16} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Step 2 Card */}
                    <View style={styles.card}>
                        <View style={styles.stepHeader}>
                            <View style={[styles.stepNumberBadge, { backgroundColor: 'rgba(0, 204, 255, 0.1)' }]}>
                                <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>02</Typography>
                            </View>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, marginLeft: 12 }}>
                                Enter the 6-digit code
                            </Typography>
                        </View>
                        <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 8, lineHeight: 18, marginBottom: 12 }}>
                            Return to Coincode and enter the 6-digit verification code generated in your authenticator app.
                        </Typography>

                        <CommonInput
                            placeholder="Enter 6-digit code"
                            keyboardType="number-pad"
                            maxLength={6}
                            secureTextEntry={!showCode}
                            containerStyle={{ marginBottom: 8, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.05)', height: 44 }}
                            leftIcon={<Lock color={colors.grey} size={18} style={{ marginHorizontal: 4 }} />}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowCode(!showCode)} style={{ padding: 4 }}>
                                    {showCode ? <EyeOff color={colors.grey} size={18} /> : <Eye color={colors.grey} size={18} />}
                                </TouchableOpacity>
                            }
                        />
                        <Typography size={12} style={{ color: 'rgba(255, 255, 255, 0.3)', fontFamily: fonts.regular }}>
                            Enter the 6-digit code from Google Authenticator
                        </Typography>
                    </View>
                </ScrollView>

                {/* Footer Section */}
                <View style={styles.footer}>
                    <CommonButton
                        title="Confirm"
                        onPress={() => { }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

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
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    heroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroImage: {
        width: 280,
        height: 180,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 12,
        paddingVertical: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepNumberBadge: {
        width: 28,
        height: 28,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    qrCodeWrapper: {
        width: 85,
        height: 85,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.4)',
        padding: 6,
        marginRight: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    qrImage: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    setupKeySection: {
        flex: 1,
        justifyContent: 'center',
    },
    setupKeyBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 42,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 8,
    },
});
