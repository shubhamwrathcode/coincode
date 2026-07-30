import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

const { width } = Dimensions.get('window');

export const ConnectedAccountsScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, flex: 1, textAlign: 'center' }}>
                    Account Connections
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Banner Card */}
                <View style={styles.bannerCard}>
                    <View style={styles.bannerTextContainer}>
                        <Typography size={24} style={{ color: colors.white, fontFamily: fonts.bold, marginBottom: 8 }}>
                            Coincode
                        </Typography>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18 }}>
                            Connect your <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium }}>Coincode</Typography> account with trusted third-party platforms for faster login and enhanced account access.
                        </Typography>
                    </View>
                    <FastImage
                        source={ImageAssets.AccountConnectionBanner}
                        style={styles.bannerImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Google Connection Card */}
                <View style={styles.connectionCard}>
                    <View style={styles.cardLeft}>
                        {/* Placeholder for Google Icon */}
                        <View style={styles.iconBox}>
                            <FastImage
                                source={ImageAssets.googleIcon}
                                style={{ width: 20, height: 20 }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Sign in with Google
                            </Typography>
                            <View style={styles.statusRow}>
                                <CheckCircle2 color="#00C076" size={12} style={{ marginRight: 4 }} />
                                <Typography size={11} style={{ color: '#00C076', fontFamily: fonts.regular }}>
                                    ***9@gmail.com
                                </Typography>
                                <View style={styles.statusDot} />
                                <Typography size={11} style={{ color: '#00C076', fontFamily: fonts.medium }}>
                                    Connected
                                </Typography>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>
                            Disconnect
                        </Typography>
                    </TouchableOpacity>
                </View>

                {/* Apple Connection Card */}
                <View style={styles.connectionCard}>
                    <View style={styles.cardLeft}>
                        {/* Placeholder for Apple Icon */}
                        <View style={styles.iconBox}>
                            <FastImage
                                source={ImageAssets.appleLogo}
                                style={{ width: 20, height: 20 }}
                                resizeMode="contain"
                                tintColor={colors.white}
                            />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Sign in with Apple
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                                Not Connected
                            </Typography>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.actionBtn, { borderColor: 'rgba(0, 204, 255, 0.2)' }]}>
                        <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
                            Connect
                        </Typography>
                    </TouchableOpacity>
                </View>

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
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    bannerCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    bannerTextContainer: {
        flex: 1,
        marginRight: 16,
    },
    bannerImage: {
        width: 150,
        height: 150,
    },
    connectionCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    cardTextContainer: {
        flex: 1,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    statusDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#00C076',
        marginHorizontal: 4,
    },
    actionBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginLeft: 8,
    }
});
