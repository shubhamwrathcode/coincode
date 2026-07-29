import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, ChevronRight, Phone, Edit, Link2Off } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';

export const PhoneNumberScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                    Phone Number
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <FastImage
                        source={ImageAssets.phoneNumberBanner}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Linked Phone Number Card */}
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Phone color={colors.cyan} size={20} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 12 }}>
                                Phone Number
                            </Typography>
                        </View>
                        <Typography size={13} style={{ color: colors.cyan, fontFamily: fonts.regular }}>
                            +91******3
                        </Typography>
                    </View>
                </View>

                {/* Change Phone Number Card */}
                <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('SecurityVerificationScreen' as any)}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Edit color={colors.cyan} size={20} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 12 }}>
                                Change Phone Number
                            </Typography>
                        </View>
                        <ChevronRight color={colors.grey} size={20} />
                    </View>
                </TouchableOpacity>

                {/* Unlink Phone Number Card */}
                <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('UnlinkPhoneNumberScreen' as any)}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Link2Off color={colors.cyan} size={20} />
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 12 }}>
                                Unlink Phone Number
                            </Typography>
                        </View>
                        <ChevronRight color={colors.grey} size={20} />
                    </View>
                </TouchableOpacity>

            </ScrollView>
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
    heroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    heroImage: {
        width: 280,
        height: 220,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
