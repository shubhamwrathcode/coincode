import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Key, Copy, Edit, EyeOff, Mail, AlertCircle, ShieldQuestion } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonButton } from '../../../../components/common/CommonButton';
import { CommonInput } from '../../../../components/common/CommonInput';

export const EditAntiPhishingCodeScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [newCode, setNewCode] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [isCodeHidden, setIsCodeHidden] = useState(true);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft color={colors.white} size={24} />
                    </TouchableOpacity>
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, flex: 1, textAlign: 'center' }}>
                        Edit Anti-Phishing Code
                    </Typography>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    {/* Current Code */}
                    <View style={styles.inputSection}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBox}>
                                <Key color={colors.cyan} size={16} />
                            </View>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium }}>
                                Current Anti-phishing Code
                            </Typography>
                        </View>
                        <CommonInput
                            value="12******"
                            editable={false}
                            containerStyle={styles.inputContainer}
                            rightIcon={
                                <TouchableOpacity>
                                    <Copy color={colors.grey} size={18} />
                                </TouchableOpacity>
                            }
                        />
                    </View>

                    {/* New Code */}
                    <View style={styles.inputSection}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBox}>
                                <Edit color={colors.cyan} size={14} />
                            </View>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium }}>
                                New Anti-Phishing Code
                            </Typography>
                        </View>
                        <CommonInput
                            value={newCode}
                            onChangeText={setNewCode}
                            placeholder="Enter new code"
                            secureTextEntry={isCodeHidden}
                            containerStyle={[styles.inputContainer, { marginBottom: 8 }]}
                            rightIcon={
                                <TouchableOpacity onPress={() => setIsCodeHidden(!isCodeHidden)}>
                                    <EyeOff color={colors.grey} size={18} />
                                </TouchableOpacity>
                            }
                        />
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 2 }}>
                            Choose a unique code that's easy for you to remember.
                        </Typography>
                    </View>

                    {/* Email Verification */}
                    <View style={styles.inputSection}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.iconBox}>
                                <Mail color={colors.cyan} size={14} />
                            </View>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium }}>
                                Code sent to: <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.medium }}>r****9@gmail.com</Typography>
                            </Typography>
                        </View>
                        <CommonInput
                            value={emailCode}
                            onChangeText={setEmailCode}
                            placeholder="Enter email verification code"
                            containerStyle={styles.inputContainer}
                            keyboardType="number-pad"
                            rightIcon={
                                <TouchableOpacity>
                                    <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>
                                        Send Code
                                    </Typography>
                                </TouchableOpacity>
                            }
                        />
                    </View>

                    {/* Alert Card */}
                    <View style={styles.infoCard}>
                        <AlertCircle color={colors.cyan} size={18} style={{ marginTop: 2, marginRight: 12 }} />
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18, flex: 1 }}>
                            We will send a verification code to your email. Please enter the code to confirm your changes.
                        </Typography>
                    </View>

                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <CommonButton
                        title="Confirm"
                        onPress={() => {
                            // Handle Confirm Action
                        }}
                    />

                    <View style={styles.orDividerContainer}>
                        <View style={styles.orLine} />
                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium, paddingHorizontal: 12 }}>
                            OR
                        </Typography>
                        <View style={styles.orLine} />
                    </View>

                    <TouchableOpacity style={styles.unableVerifyBtn}>
                        <ShieldQuestion color={colors.cyan} size={16} style={{ marginRight: 6 }} />
                        <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>
                            Unable to Verify?
                        </Typography>
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
    inputSection: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    iconBox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: 'rgba(0, 204, 255, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.15)',
    },
    inputContainer: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        marginBottom: 0,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginTop: 8,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 8,
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
    unableVerifyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    }
});
