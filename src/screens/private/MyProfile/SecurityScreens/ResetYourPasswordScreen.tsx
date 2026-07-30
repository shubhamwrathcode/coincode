import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Mail, ShieldAlert, ChevronDown } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonInput } from '../../../../components/common/CommonInput';
import { CommonButton } from '../../../../components/common/CommonButton';

const { width } = Dimensions.get('window');

export const ResetYourPasswordScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                        Reset Your Password
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Banner */}
                <View style={styles.bannerContainer}>
                    <FastImage
                        source={activeTab === 'email' ? ImageAssets.resetPasswordBanner : ImageAssets.resetPasswordPhoneBanner}
                        style={{ width: width * 0.7, height: width * 0.7 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabBtn, activeTab === 'email' && styles.tabBtnActive, activeTab === 'email' && { borderBottomColor: colors.cyan }]}
                        onPress={() => setActiveTab('email')}
                    >
                        <Typography size={14} style={{ color: activeTab === 'email' ? colors.cyan : colors.grey, fontFamily: fonts.bold }}>
                            Email
                        </Typography>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabBtn, activeTab === 'phone' && styles.tabBtnActive, activeTab === 'phone' && { borderBottomColor: colors.cyan }]}
                        onPress={() => setActiveTab('phone')}
                    >
                        <Typography size={14} style={{ color: activeTab === 'phone' ? colors.cyan : colors.grey, fontFamily: fonts.bold }}>
                            Phone
                        </Typography>
                    </TouchableOpacity>
                </View>

                {/* Form Content */}
                {activeTab === 'email' ? (
                    <View style={styles.formContainer}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 8 }}>
                            Email Address
                        </Typography>
                        <CommonInput
                            placeholder="Enter your email address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            leftIcon={<Mail color={colors.grey} size={20} />}
                            containerStyle={styles.inputWrapper}
                            style={{ color: colors.white, fontFamily: fonts.regular }}
                        />

                        <View style={styles.infoRow}>
                            <ShieldAlert color={colors.cyan} size={16} style={{ marginTop: 2 }} />
                            <Typography size={12} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, marginLeft: 12, lineHeight: 18 }}>
                                We will send a verification code to this email to reset your password.
                            </Typography>
                        </View>
                    </View>
                ) : (
                    <View style={styles.formContainer}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 8 }}>
                            Phone Number
                        </Typography>
                        <CommonInput
                            placeholder="Enter your new phone number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            leftIcon={
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.countryCodeBtn}>
                                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium }}>🇮🇳 +91</Typography>
                                        <ChevronDown color={colors.grey} size={16} style={{ marginLeft: 4 }} />
                                    </TouchableOpacity>
                                    <View style={styles.verticalDivider} />
                                </View>
                            }
                            containerStyle={styles.inputWrapper}
                            style={{ color: colors.white, fontFamily: fonts.regular }}
                        />

                        <View style={styles.infoRow}>
                            <ShieldAlert color={colors.cyan} size={16} style={{ marginTop: 2 }} />
                            <Typography size={12} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, marginLeft: 12, lineHeight: 18 }}>
                                We will send a verification code to this number to reset your password.
                            </Typography>
                        </View>
                    </View>
                )}

            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <CommonButton 
                    title="Next" 
                    onPress={() => navigation.navigate('SetNewPasswordScreen' as any)} 
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
    bannerContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        height: 48,
        marginBottom: 24,
        overflow: 'hidden',
    },
    tabBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabBtnActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    formContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        height: 56,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 14,
    },
    countryCodeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 12,
    },
    verticalDivider: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginRight: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    }
});
