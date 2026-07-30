import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronLeft, ShieldQuestion, Phone, Mail, Clock } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonButton } from '../../../../components/common/CommonButton';
import { OTPInput } from '../../../../components/common/OTPInput';

export const SecurityVerificationScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<any, any>>();
    const nextScreen = route.params?.nextScreen || 'ChangePhoneNumberScreen';

    const [phoneCode, setPhoneCode] = useState('');
    const [emailCode, setEmailCode] = useState('');

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
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]} keyboardShouldPersistTaps="handled">
                    <View style={{ flex: 1 }}>
                        <Typography size={24} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 8, marginTop: 16 }}>
                            Security Verification
                        </Typography>
                        <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 22, marginBottom: 24 }}>
                            To ensure the security of your account, please complete the following verification operations.
                        </Typography>

                        {/* Phone Verification Card */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Phone color={colors.cyan} size={18} />
                                <Typography size={15} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 8 }}>
                                    Code sent to: <Typography size={15} style={{ color: colors.cyan, fontFamily: fonts.medium }}>+91******3</Typography>
                                </Typography>
                            </View>
                            <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 16, lineHeight: 20 }}>
                                Please enter the 6-digit SMS code sent to your mobile number.
                            </Typography>

                            <OTPInput
                                value={phoneCode}
                                onChangeText={setPhoneCode}
                                onSendPress={() => { }}
                            />

                            <View style={styles.validityContainer}>
                                <Clock color={colors.cyan} size={14} />
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 6 }}>
                                    Valid for 10 minutes
                                </Typography>
                            </View>
                        </View>

                        {/* Email Verification Card */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Mail color={colors.cyan} size={18} />
                                <Typography size={15} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 8 }}>
                                    Code sent to: <Typography size={15} style={{ color: colors.cyan, fontFamily: fonts.medium }}>r***9@gmail.com</Typography>
                                </Typography>
                            </View>
                            <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 16, lineHeight: 20 }}>
                                Please enter the 6-digit email code sent to your email address.
                            </Typography>

                            <OTPInput
                                value={emailCode}
                                onChangeText={setEmailCode}
                                onSendPress={() => { }}
                            />

                            <View style={styles.validityContainer}>
                                <Clock color={colors.cyan} size={14} />
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 6 }}>
                                    Valid for 10 minutes
                                </Typography>
                            </View>
                        </View>
                    </View>

                    {/* Footer Section */}
                    <View style={styles.footer}>
                        <CommonButton
                            title="Confirm"
                            onPress={() => {
                                navigation.navigate(nextScreen as never);
                            }}
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
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    validityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
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
