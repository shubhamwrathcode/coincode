import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, HeadphonesIcon, FileText, ShieldCheck, ScanFace, Layers, UserPlus } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';
import { SecurityRiskSheet } from './components/SecurityRiskSheet';

const { width } = Dimensions.get('window');

export const PasskeyScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const securitySheetRef = useRef<any>(null);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                    <FastImage source={ImageAssets.backButtonImg} resizeMode="contain" style={{ width: 30, height: 30 }} />
                </TouchableOpacity>

                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>Passkey</Typography>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage source={ImageAssets.headphoneImg} resizeMode="contain" style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
                        <FastImage source={ImageAssets.historyIcon} resizeMode="contain" style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Graphic */}
                <View style={styles.heroContainer}>
                    <FastImage
                        source={ImageAssets.enablePasskey}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <Typography size={22} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                        Enable <Typography size={22} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Passkey</Typography>
                    </Typography>
                    <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, textAlign: 'center', marginTop: 12, lineHeight: 20, paddingHorizontal: 20 }}>
                        A smarter & safer way to access your account
                    </Typography>
                </View>

                {/* Feature Cards */}
                <View style={styles.featuresContainer}>
                    {/* Card 1 */}
                    <View style={styles.featureCard}>
                        <View style={styles.iconWrapper}>
                            <ShieldCheck color={colors.cyan} size={20} />
                        </View>
                        <View style={styles.featureTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 4 }}>
                                High Security
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Protect your account from traditional password threats.
                            </Typography>
                        </View>
                    </View>

                    {/* Card 2 */}
                    <View style={styles.featureCard}>
                        <View style={styles.iconWrapper}>
                            <FastImage source={ImageAssets.CameraCheckIcon} style={{ width: 20, height: 20 }} tintColor={colors.cyan} resizeMode="contain" />
                        </View>
                        <View style={styles.featureTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 4 }}>
                                Easy Verification
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Verify in one tap. No more remembering complex passwords.
                            </Typography>
                        </View>
                    </View>

                    {/* Card 3 */}
                    <View style={styles.featureCard}>
                        <View style={styles.iconWrapper}>
                            <Layers color={colors.cyan} size={20} />
                        </View>
                        <View style={styles.featureTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 4 }}>
                                Multi-Device
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Use passkey across devices seamlessly.
                            </Typography>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.footer}>
                <CommonButton
                    title="Add a Passkey"
                    onPress={() => securitySheetRef.current?.open()}
                />
            </View>

            <SecurityRiskSheet sheetRef={securitySheetRef} />
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
        paddingBottom: 20,
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
    iconBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    heroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 24,
    },
    heroImage: {
        width: 200,
        height: 200,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    featuresContainer: {
        gap: 16,
    },
    featureCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 16,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    featureTextContainer: {
        flex: 1,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 8,
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
});
