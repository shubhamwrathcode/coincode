import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, ChevronRight, FileQuestion } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';

const { width } = Dimensions.get('window');

export const AuthenticatorScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconBtn}>
                    <FileQuestion color={colors.white} size={20} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <FastImage
                        source={ImageAssets.downloadAuthenticatorBanner}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Text Content */}
                <View style={styles.titleContainer}>
                    <Typography size={24} style={{
                        color: colors.cyan, fontFamily: fonts.bold
                        ,
                    }}>
                        Download an
                    </Typography>
                    <Typography size={24} style={{
                        color: colors.white, fontFamily: fonts.medium
                    }}>
                        Authenticator App
                    </Typography>
                    <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, textAlign: 'center', marginTop: 16, lineHeight: 22, paddingHorizontal: 20 }}>
                        Use Google Authenticator to scan the QR code and securely generate verification codes.
                    </Typography>
                </View>

                {/* Google Authenticator Option */}
                <TouchableOpacity style={styles.optionCard} activeOpacity={0.8} onPress={() => navigation.navigate('LinkGoogleAuthenticatorScreen' as never)}>
                    <View style={styles.optionLeft}>
                        <View style={styles.iconWrapper}>
                            <FastImage source={ImageAssets.googleIcon} style={{ width: 20, height: 20 }} resizeMode="contain" />
                        </View>
                        <Typography size={14} style={{
                            color: colors.white, fontFamily: fonts.medium


                        }}>
                            Google Authenticator
                        </Typography>
                    </View>
                    <ChevronRight color={colors.grey} size={18} />
                </TouchableOpacity>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <CommonButton
                    title="Add a Passkey"
                    onPress={() => { }}
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
    headerIconBtn: {
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
    },
    heroImage: {
        width: 280,
        height: 280,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 10,
    },
});
