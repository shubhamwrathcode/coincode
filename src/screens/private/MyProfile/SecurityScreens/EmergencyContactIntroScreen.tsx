import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, UserPlus } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CommonButton } from '../../../../components/common/CommonButton';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

const { width } = Dimensions.get('window');

export const EmergencyContactIntroScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Hero Image */}
                <View style={styles.bannerContainer}>
                    <FastImage
                        source={ImageAssets.emergencyContactBanner}
                        style={styles.banner}
                        resizeMode="contain"
                    />
                </View>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <Typography size={32} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                        Emergency <Typography size={32} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Contact</Typography>
                    </Typography>
                    <View style={styles.dividerDots}>
                        <View style={[styles.dotLine, { width: 32 }]} />
                        <View style={styles.dot} />
                        <View style={[styles.dotLine, { width: 32 }]} />
                    </View>
                </View>

                {/* Body Text */}
                <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 22, marginBottom: 24 }}>
                    At <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Coincode</Typography>, the security of your digital assets remains our highest priority.
                </Typography>

                <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 22, marginBottom: 24 }}>
                    The Emergency Contact feature is designed to help protect your account by allowing us to send email and SMS notifications to you and your trusted contacts if your account becomes inactive for an extended period.
                </Typography>

                <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 22, marginBottom: 32 }}>
                    Your selected emergency contacts may also request account access support or initiate an inheritance claim process when necessary.
                </Typography>

            </ScrollView>

            <View style={styles.bottomContainer}>
                <CommonButton
                    title="Add Emergency Contact"
                    leftIcon={<UserPlus color={colors.white} size={20} style={{ marginRight: 8 }} />}
                    onPress={() => {
                        navigation.navigate('AddEmergencyContactScreen' as any);
                    }}
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
    },
    banner: {
        width: width * 0.85,
        height: 250,
    },
    titleContainer: {
        marginBottom: 24,
    },
    dividerDots: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    dotLine: {
        height: 2,
        backgroundColor: 'rgba(0, 204, 255, 0.3)',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#00CCFF',
        marginHorizontal: 4,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    }
});
