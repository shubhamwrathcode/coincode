import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, ChevronDown, Clock } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonInput } from '../../../../components/common/CommonInput';
import { CommonButton } from '../../../../components/common/CommonButton';

export const ChangePhoneNumberScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [newPhone, setNewPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const notes = [
        "To protect your account, withdrawals and P2P transactions will be restricted for 24 hours after updating your phone number.",
        "If your phone number is currently associated with your account, it will automatically switch to the newly updated number.",
        "Your phone number will also be synced across all connected sub-accounts. Separate sub-accounts with independent settings will remain unchanged."
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
                        Change Phone Number
                    </Typography>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    {/* Hero Section */}
                    <View style={styles.heroContainer}>
                        <FastImage
                            source={ImageAssets.phoneNumberBanner}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Important Notes Card */}
                    <View style={styles.notesCard}>
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
                            New Phone Number
                        </Typography>
                        <CommonInput
                            placeholder="Enter your new phone number"
                            value={newPhone}
                            onChangeText={setNewPhone}
                            keyboardType="phone-pad"
                            leftIcon={
                                <TouchableOpacity style={styles.countryCodeBtn}>
                                    <FastImage source={{ uri: 'https://flagcdn.com/w40/in.png' }} style={styles.flagIcon} />
                                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 4 }}>
                                        +91
                                    </Typography>
                                    <ChevronDown color={colors.grey} size={14} />
                                    <View style={styles.verticalDivider} />
                                </TouchableOpacity>
                            }
                        />

                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 8, marginTop: 4 }}>
                            New Phone Verification Code
                        </Typography>
                        <CommonInput
                            placeholder="Enter the verification code"
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
                        <View style={styles.validityContainer}>
                            <Clock color={colors.cyan} size={14} />
                            <Typography size={12} style={{ color: colors.darkShadeColorText || '#666', fontFamily: fonts.regular, marginLeft: 6 }}>
                                Valid for 10 minutes
                            </Typography>
                        </View>
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
        marginTop: 10,
    },
    heroImage: {
        width: 220,
        height: 220,
    },
    notesCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 24,
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
    countryCodeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 8,
        paddingVertical: 12,
    },
    flagIcon: {
        width: 18,
        height: 18,
        borderRadius: 9,
        marginRight: 6,
    },
    verticalDivider: {
        width: 1,
        height: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginLeft: 12,
    },
    validityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 8,
    },
});
