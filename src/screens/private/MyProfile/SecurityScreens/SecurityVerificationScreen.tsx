import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, ShieldQuestion } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';
import { CommonInput } from '../../../../components/common/CommonInput';

export const SecurityVerificationScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft color={colors.white} size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroTextContainer}>
                            <Typography size={24} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Security
                            </Typography>
                            <Typography size={24} style={{ color: colors.cyan, fontFamily: fonts.semiBold, marginBottom: 12 }}>
                                Verification
                            </Typography>
                            <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 20 }}>
                                To secure the security of your account, please complete the following verification.
                            </Typography>
                        </View>
                        <FastImage
                            source={ImageAssets.SecurityVerificationBanner}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Verification Fields */}
                    <View style={styles.formContainer}>
                        {/* Phone Code */}
                        <View style={styles.inputGroup}>
                            <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 8 }}>
                                Code sent to: <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>+91 ••• ••42</Typography>
                            </Typography>
                            <CommonInput
                                placeholder="Please enter 6-digit code"
                                keyboardType="number-pad"
                                maxLength={6}
                                rightIcon={
                                    <TouchableOpacity>
                                        <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Send</Typography>
                                    </TouchableOpacity>
                                }
                            />
                            <Typography size={12} style={{ color: 'rgba(255,255,255,0.3)', fontFamily: fonts.regular, }}>
                                Valid for 10 minutes
                            </Typography>
                        </View>

                        {/* Email Code */}
                        <View style={styles.inputGroup}>
                            <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 8 }}>
                                Code sent to:
                            </Typography>
                            <CommonInput
                                placeholder="Please enter 6-digit code"
                                keyboardType="number-pad"
                                maxLength={6}
                                rightIcon={
                                    <TouchableOpacity>
                                        <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Send</Typography>
                                    </TouchableOpacity>
                                }
                            />
                            <Typography size={12} style={{ color: 'rgba(255,255,255,0.3)', fontFamily: fonts.regular, }}>
                                Valid for 10 minutes
                            </Typography>
                        </View>
                    </View>

                </ScrollView>

                {/* Footer Section */}
                <View style={styles.footer}>
                    <CommonButton
                        title="Submit"
                        onPress={() => { }}
                    />

                    <View style={styles.orContainer}>
                        <View style={[styles.line, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginHorizontal: 12 }}>OR</Typography>
                        <View style={[styles.line, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
                    </View>

                    <TouchableOpacity style={styles.helpBtn}>
                        <ShieldQuestion color={colors.cyan} size={16} />
                        <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.semiBold, marginLeft: 6 }}>Unable to Verify?</Typography>
                    </TouchableOpacity>
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
    heroSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        marginBottom: 30,
    },
    heroTextContainer: {
        flex: 1,
        paddingRight: 16,
    },
    heroImage: {
        width: 140,
        height: 140,
    },
    formContainer: {
        gap: 12,
    },
    inputGroup: {

    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 8,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
    },
    helpBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16,
    }
});
