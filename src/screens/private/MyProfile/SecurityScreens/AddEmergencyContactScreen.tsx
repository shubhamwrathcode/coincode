import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, User, Mail, Phone, AlertCircle, ChevronDown } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonButton } from '../../../../components/common/CommonButton';
import { CommonInput } from '../../../../components/common/CommonInput';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';

export const AddEmergencyContactScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    const [countryCode, setCountryCode] = useState<CountryCode>('IN');
    const [callingCode, setCallingCode] = useState<string>('91');
    const [visible, setVisible] = useState<boolean>(false);

    const onSelect = (country: Country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setVisible(false);
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
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, flex: 1, textAlign: 'center' }}>
                        Confirm Information
                    </Typography>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    
                    {/* Name */}
                    <View style={styles.inputSection}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                            Emergency Contact Name
                        </Typography>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 12 }}>
                            Full name of your trusted contact
                        </Typography>
                        <CommonInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Please enter name"
                            leftIcon={<User color={colors.grey} size={18} style={{ marginRight: 8 }} />}
                            containerStyle={styles.inputBox}
                        />
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 8 }}>
                            This name will be used for communication and verification.
                        </Typography>
                    </View>

                    {/* Email */}
                    <View style={styles.inputSection}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                            Contact Information
                        </Typography>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 12 }}>
                            Enter email address of your contact
                        </Typography>
                        <CommonInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter email address"
                            keyboardType="email-address"
                            leftIcon={<Mail color={colors.grey} size={18} style={{ marginRight: 8 }} />}
                            containerStyle={styles.inputBox}
                        />
                    </View>

                    {/* Phone Number */}
                    <View style={styles.inputSection}>
                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                            Phone Number
                        </Typography>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 12 }}>
                            Enter your contact's phone number
                        </Typography>
                        
                        <View style={styles.phoneRow}>
                            <TouchableOpacity style={styles.countrySelector} onPress={() => setVisible(true)}>
                                <FastImage
                                    source={{ uri: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` }}
                                    style={{ width: 20, height: 20, borderRadius: 10, marginRight: 8 }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginRight: 8 }}>
                                    +{callingCode}
                                </Typography>
                                <ChevronDown color={colors.grey} size={16} />
                            </TouchableOpacity>

                            <View style={styles.phoneInputContainer}>
                                <Phone color={colors.grey} size={18} style={{ marginRight: 8, marginLeft: 16 }} />
                                <TextInput
                                    style={[styles.phoneTextInput, { color: colors.white, fontFamily: fonts.regular }]}
                                    placeholder="Enter your phone number"
                                    placeholderTextColor={colors.grey}
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Info Alert */}
                    <View style={styles.infoAlert}>
                        <View style={{ marginTop: 2 }}>
                            <AlertCircle color={colors.cyan} size={18} />
                        </View>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18, marginLeft: 12, flex: 1 }}>
                            Your emergency contact may be notified if unusual account inactivity is detected. For a smoother verification process, it is recommended that your emergency contact is also a <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium }}>Coincode</Typography> user.
                        </Typography>
                    </View>

                </ScrollView>

                <View style={styles.bottomContainer}>
                    <CommonButton
                        title="Save"
                        onPress={() => {
                            navigation.navigate('ReviewEmergencyContactScreen' as any);
                        }}
                    />
                </View>
            </KeyboardAvoidingView>

            {/* Country Picker Modal */}
            <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={() => setVisible(false)}>
                <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }} edges={['top', 'bottom']}>
                    <CountryPicker
                        withModal={false}
                        onClose={() => setVisible(false)}
                        onSelect={onSelect}
                        withCallingCode
                        withFilter
                        withFlag
                        withEmoji
                        countryCode={countryCode}
                        theme={{
                            backgroundColor: colors.black,
                            onBackgroundTextColor: colors.white,
                            fontSize: 16,
                            fontFamily: fonts.regular,
                            filterPlaceholderTextColor: colors.grey,
                            primaryColor: colors.white,
                            primaryColorVariant: colors.grey,
                        }}
                    />
                </SafeAreaView>
            </Modal>
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
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    inputSection: {
        marginBottom: 24,
    },
    inputBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 52,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginRight: 12,
    },
    phoneInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        height: 52,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    phoneTextInput: {
        flex: 1,
        height: '100%',
        paddingRight: 16,
    },
    infoAlert: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginTop: 8,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    }
});
