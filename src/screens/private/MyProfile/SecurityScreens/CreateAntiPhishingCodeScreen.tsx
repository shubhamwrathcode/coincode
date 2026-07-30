import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Shield, Lock, Type } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonButton } from '../../../../components/common/CommonButton';
import { CommonInput } from '../../../../components/common/CommonInput';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

export const CreateAntiPhishingCodeScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [code, setCode] = useState('');

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
                        Anti-Phishing Code
                    </Typography>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 12 }}>
                        Anti-Phishing Code
                    </Typography>

                    <CommonInput
                        value={code}
                        onChangeText={setCode}
                        placeholder="Please enter anti-phishing code"
                        maxLength={6}
                        containerStyle={styles.inputContainer}
                        keyboardType='number-pad'
                    />

                    {/* Rule Cards */}
                    <View style={styles.ruleCard}>
                        <View style={styles.iconContainer}>
                            <FastImage source={ImageAssets.charIcon} style={{ width: 18, height: 18 }} resizeMode='contain' />
                        </View>
                        <View style={styles.ruleTextContainer}>
                            <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                6–16 characters
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                Your code must be between 6 to 16 characters long.
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.ruleCard}>
                        <View style={styles.iconContainer}>
                            <FastImage source={ImageAssets.lettersIcon} style={{ width: 18, height: 18 }} resizeMode='contain' />
                        </View>
                        <View style={styles.ruleTextContainer}>
                            <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Only letters, digits & underscores
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                Use letters (A–Z, a–z), numbers (0–9) and underscores (_).
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.ruleCard}>
                        <View style={styles.iconContainer}>
                            <Lock color={colors.cyan} size={18} />
                        </View>
                        <View style={styles.ruleTextContainer}>
                            <Typography size={13} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Case sensitive
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                                The code you set will be case sensitive.
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
    inputContainer: {
        marginBottom: 24,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
    },
    ruleCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 204, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.15)',
    },
    ruleTextContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 2, // Slight vertical alignment tweak
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 8,
    },
});
