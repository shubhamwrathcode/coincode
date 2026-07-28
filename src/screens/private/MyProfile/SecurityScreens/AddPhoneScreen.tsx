import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, Globe, Phone, MessageSquare, Mail, ChevronDown, ShieldQuestion } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';
import { CommonInput } from '../../../../components/common/CommonInput';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';

export const AddPhoneScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryCode>('IN');
    const [callingCode, setCallingCode] = useState<string>('91');
    const [countryName, setCountryName] = useState<string>('India');

    const onSelectCountry = (country: Country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0] || '');
        setCountryName(country.name as string);
        setIsCountryPickerVisible(false);
    };

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
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>Add Phone</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.heroTextContainer}>
                        <Typography size={22} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 12 }}>
                            Secure Your <Typography size={22} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Account</Typography>
                        </Typography>
                        <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 20 }}>
                            Add your phone number and verification codes to keep your account safe.
                        </Typography>
                    </View>
                    <FastImage
                        source={ImageAssets.addPhoneBanner}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Form Section */}
                <View style={styles.formContainer}>

                    {/* Country Code */}
                    <View style={styles.inputGroup}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>Country Code</Typography>
                        <TouchableOpacity style={[styles.inputContainer, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]} activeOpacity={0.8} onPress={() => setIsCountryPickerVisible(true)}>
                            <FastImage
                                source={{ uri: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` }}
                                style={{ width: 24, height: 24, borderRadius: 12, marginRight: 12 }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.regular, flex: 1 }}>{countryName} (+{callingCode})</Typography>
                            <ChevronDown color={colors.grey} size={18} />
                        </TouchableOpacity>
                    </View>

                    {/* Country Picker Modal */}
                    <Modal visible={isCountryPickerVisible} animationType="slide" transparent={false} onRequestClose={() => setIsCountryPickerVisible(false)}>
                        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }} edges={['top', 'bottom']}>
                            <CountryPicker
                                withModal={false}
                                onClose={() => setIsCountryPickerVisible(false)}
                                onSelect={onSelectCountry}
                                withFilter
                                withFlag
                                withEmoji
                                countryCode={countryCode}
                                theme={{
                                    backgroundColor: colors.black,
                                    onBackgroundTextColor: colors.white,
                                    fontFamily: fonts.regular,
                                    filterPlaceholderTextColor: colors.grey,
                                    primaryColorVariant: colors.darkGrey,
                                }}
                            />
                        </SafeAreaView>
                    </Modal>

                    {/* Phone */}
                    <View style={styles.inputGroup}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>Phone</Typography>
                        <CommonInput
                            containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                            placeholder="Please input phone number"
                            keyboardType="phone-pad"
                            leftIcon={<Phone color={colors.cyan} size={18} style={{ marginRight: 12 }} />}
                        />
                    </View>

                    {/* SMS Code */}
                    <View style={styles.inputGroup}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>SMS Code</Typography>
                        <CommonInput
                            containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                            placeholder="Input SMS code"
                            keyboardType="number-pad"
                            leftIcon={<MessageSquare color={colors.cyan} size={18} style={{ marginRight: 12 }} />}
                            rightIcon={
                                <TouchableOpacity>
                                    <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Get SMS</Typography>
                                </TouchableOpacity>
                            }
                        />
                    </View>

                    {/* Email Verification Code */}
                    <View style={styles.inputGroup}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 6 }}>Email Verification Code</Typography>
                        <CommonInput
                            containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                            placeholder="Input email code"
                            keyboardType="number-pad"
                            leftIcon={<Mail color={colors.cyan} size={18} style={{ marginRight: 12 }} />}
                            rightIcon={
                                <TouchableOpacity>
                                    <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.medium }}>Get Email Code</Typography>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </View>

            </ScrollView>

            {/* Footer Section */}
            <View style={styles.footer}>
                <CommonButton
                    title="Submit"
                    onPress={() => navigation.navigate('SecurityVerificationScreen')}
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
    heroSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        marginBottom: 20,
    },
    heroTextContainer: {
        flex: 1,
        paddingRight: 16,
    },
    heroImage: {
        width: 120,
        height: 130,
    },
    formContainer: {
        gap: 12,
    },
    inputGroup: {
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
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
