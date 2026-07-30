import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, RefreshCcw, ClipboardPaste, ShieldQuestion, Lock } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonButton } from '../../../../components/common/CommonButton';
import { OTPInput } from '../../../../components/common/OTPInput';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import Clipboard from '@react-native-clipboard/clipboard';

export const VerifyEmailScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [otp, setOtp] = useState('');

    const handlePaste = async () => {
        const text = await Clipboard.getString();
        if (text && text.length <= 6) {
            setOtp(text);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft color={colors.white} size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                >

                    <Typography size={24} style={{ color: colors.white, fontFamily: fonts.bold, marginBottom: 8 }}>
                        Verify Your Email
                    </Typography>

                    <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 22, marginBottom: 32 }}>
                        The verification code has been sent to your email{'\n'}
                        ***9@gmail.com valid for <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.medium }}>10 minutes</Typography>.
                    </Typography>

                    <View style={styles.bannerContainer}>
                        <FastImage
                            source={ImageAssets.emailVerifyBanner}
                            style={styles.banner}
                            resizeMode="contain"
                        />
                    </View>

                    <OTPInput
                        value={otp}
                        onChangeText={setOtp}
                        length={6}
                    />

                    <View style={styles.otpActions}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <RefreshCcw color={colors.cyan} size={14} style={{ marginRight: 6 }} />
                            <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                                Resend Code
                            </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn} onPress={handlePaste}>
                            <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.medium, marginRight: 6 }}>
                                Paste
                            </Typography>
                            <ClipboardPaste color={colors.cyan} size={14} />
                        </TouchableOpacity>
                    </View>

                    <CommonButton
                        title="Confirm"
                        onPress={() => {
                            // handle confirm
                        }}
                        style={{ marginTop: 24 }}
                    />

                    <View style={styles.orDividerContainer}>
                        <View style={styles.orLine} />
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium, paddingHorizontal: 12 }}>
                            OR
                        </Typography>
                        <View style={styles.orLine} />
                    </View>

                    <TouchableOpacity style={styles.unableVerifyCard}>
                        <View style={styles.lockIconBox}>
                            <Lock color={colors.cyan} size={16} />
                        </View>
                        <View style={styles.unableVerifyText}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Unable to Verify?
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                If you didn't receive the code, please check your spam folder or try another method.
                            </Typography>
                        </View>
                        <ChevronLeft color={colors.grey} size={16} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>

                </ScrollView>
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
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 24,
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
    },
    banner: {
        width: 280,
        height: 200,
    },
    otpActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orDividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    unableVerifyCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
    },
    lockIconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 204, 255, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    unableVerifyText: {
        flex: 1,
        paddingRight: 8,
    }
});
