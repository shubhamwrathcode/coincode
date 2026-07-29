import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonInput } from '../../../../components/common/CommonInput';
import { CommonButton } from '../../../../components/common/CommonButton';

export const ChangeEmailAddressScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [newEmail, setNewEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const notes = [
        "To keep your account secure, verification via email, SMS and 2FA verification is mandatory after changing your email.",
        "If your current email is linked to any account, it will automatically notify you for security updates and alerts.",
        "Changing emails too frequently may impact account security. Make sure your new email is active and accessible with uninterrupted access."
    ];

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
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                        Change Email
                    </Typography>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    {/* Hero Section */}
                    <View style={styles.heroContainer}>
                        <FastImage
                            source={ImageAssets.changeEmailBanner}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Important Notes Card */}
                    <View style={styles.notesCard}>
                        <Typography size={15} style={{ color: colors.cyan, fontFamily: fonts.semiBold, marginBottom: 16 }}>
                            Important Notes
                        </Typography>

                        {notes.map((note, index) => (
                            <View key={index} style={styles.noteItem}>
                                <View style={styles.noteBadgeWrapper}>
                                    <View style={[styles.noteBadge, { borderColor: 'rgba(0, 204, 255, 0.2)' }]}>
                                        <Typography size={11} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>
                                            {index + 1}
                                        </Typography>
                                    </View>
                                </View>
                                <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, flex: 1, lineHeight: 20 }}>
                                    {note}
                                </Typography>
                            </View>
                        ))}
                    </View>

                    {/* Inputs */}
                    <View style={styles.formContainer}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 8 }}>
                            New Email
                        </Typography>
                        <CommonInput
                            placeholder="Enter your new email address"
                            value={newEmail}
                            onChangeText={setNewEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 8, marginTop: 4 }}>
                            New Email Verification Code
                        </Typography>
                        <CommonInput
                            placeholder="Enter the verification code sent to your new email"
                            value={verificationCode}
                            onChangeText={setVerificationCode}
                            keyboardType="number-pad"
                            rightIcon={
                                <TouchableOpacity activeOpacity={0.8} style={{ paddingHorizontal: 4, paddingVertical: 8 }}>
                                    <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                                        Send
                                    </Typography>
                                </TouchableOpacity>
                            }
                            containerStyle={{ marginBottom: 8 }}
                        />
                        <Typography size={12} style={{ color: colors.darkShadeColorText || '#666', fontFamily: fonts.regular, marginTop: 2 }}>
                            Valid for 10 minutes
                        </Typography>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.footer}>
                    <CommonButton
                        title="Confirm"
                        onPress={() => {
                            // Handle Confirm Action
                        }}
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
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    heroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    heroImage: {
        width: 180,
        height: 140,
    },
    notesCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    noteItem: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    noteBadgeWrapper: {
        marginRight: 12,
        marginTop: 2,
    },
    noteBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        backgroundColor: 'rgba(0, 204, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        marginBottom: 10,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 8,
    },
});
