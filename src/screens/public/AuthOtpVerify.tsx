import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography } from '../../components/common/Typography';
import { Screen } from '../../components/common/Screen';
import { useTheme } from '../../theme/ThemeProvider';
import { CommonButton } from '../../components/common/CommonButton';
import { CommonOtpInput } from '../../components/common/CommonOtpInput';
import { fonts } from '../../theme/fonts';
import { ArrowLeft, X, RefreshCw, Clipboard, Lock } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../components/common/ImageAssets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/RootNavigator';

const AuthOtpVerify = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [otp, setOtp] = useState('');

    const handleVerify = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                navigation.navigate('SetPassword');
                resolve(true);
            }, 2000);
        });
    };

    return (
        <Screen>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    {/* Top Header Icons */}
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FastImage
                                source={ImageAssets.authBackIcon}
                                style={styles.iconButton}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                        <FastImage
                            source={ImageAssets.authBellImg}
                            style={styles.iconButton}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>

                    <View style={styles.illustrationContainer}>
                        <FastImage
                            source={ImageAssets.verifyEmailImg}
                            style={styles.illustrationImage}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>

                    {/* Text Content */}
                    <View style={styles.textContainer}>
                        <Typography size={25} align="center" style={styles.title}>
                            Verify Your <Typography color={colors.cyan} size={25} style={styles.title}>Phone</Typography>
                        </Typography>

                        <Typography color={colors.darkShadeColorText} size={14} align="center" style={styles.subtitle}>
                            A verification code has been sent to your phone number <Typography color={colors.white} size={14} style={styles.boldText}>+91 98••••••</Typography>. It is valid for <Typography color={colors.cyan} size={14} style={styles.boldText}>10 minutes.</Typography>
                        </Typography>
                    </View>

                    {/* OTP Input */}
                    <View style={styles.otpContainer}>
                        <CommonOtpInput
                            autoFocus={true}
                            onTextChange={(text) => setOtp(text)}
                            onFilled={(text) => console.log('OTP Filled:', text)}
                        />
                    </View>

                    {/* Action Links */}
                    <View style={styles.actionLinksContainer}>
                        <TouchableOpacity style={styles.actionLinkButton}>
                            <RefreshCw color={colors.cyan} size={16} />
                            <Typography color={colors.cyan} size={14} style={styles.actionLinkText}>Resend Code</Typography>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionLinkButton}>
                            <Clipboard color={colors.darkShadeColorText} size={16} />
                            <Typography color={colors.darkShadeColorText} size={14} style={styles.actionLinkText}>Paste</Typography>
                        </TouchableOpacity>
                    </View>

                    {/* Verify Button */}
                    <View style={styles.buttonWrapper}>
                        <CommonButton
                            title="Next"
                            onPress={handleVerify}
                            shrinkOnLoad
                        />
                    </View>

                    {/* Security Info Box */}
                    <View style={[styles.infoBox, { backgroundColor: colors.inputBgColor, borderColor: colors.inputBorderColor }]}>
                        <View style={styles.lockIconContainer}>
                            <FastImage source={ImageAssets.lock} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </View>
                        <Typography color={colors.darkShadeColorText} size={13} style={styles.infoText}>
                            Your verification code is for your security. Do not share it with anyone.
                        </Typography>
                    </View>

                    {/* Bottom Link */}
                    <TouchableOpacity style={styles.bottomLinkContainer}>
                        <Typography color={colors.cyan} size={14} style={styles.bottomLinkText}>
                            Didn't receive the code?
                        </Typography>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
};

export default AuthOtpVerify;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        marginBottom: 10,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bellIcon: {
        width: 22,
        height: 22,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    illustrationImage: {
        width: 150,
        height: 150,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontFamily: fonts.bold,
        marginBottom: 12,
    },
    subtitle: {
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    boldText: {
        fontFamily: fonts.regular,
    },
    otpContainer: {
        marginTop: 24,
    },
    actionLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },
    actionLinkButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionLinkText: {
        fontFamily: fonts.medium,
        marginLeft: 8,
    },
    buttonWrapper: {
        alignItems: 'center',
        width: '100%',
        marginTop: 24,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 24,
    },
    lockIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2BC2874D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 0.8,
        borderColor: "#2BC287",
    },
    infoText: {
        flex: 1,
        lineHeight: 20,
    },
    bottomLinkContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    bottomLinkText: {
        fontFamily: fonts.medium,
        textDecorationLine: 'underline',
    },
});