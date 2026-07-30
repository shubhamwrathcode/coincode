import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Clock, BarChart2, Key, User, Trash2 } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

const { width } = Dimensions.get('window');
export const DisableAccountScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                        Disable Account
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Banner Illustration */}
                <View style={styles.bannerContainer}>
                    <FastImage
                        source={ImageAssets.disableAccountBanner}
                        style={{ width: width * 0.7, height: width * 0.7 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Important to Know Card */}
                <View style={styles.infoCard}>
                    <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold, marginBottom: 4 }}>
                        Important to Know
                    </Typography>
                    <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 20, marginBottom: 16 }}>
                        Once you disable your account, the following actions will take place:
                    </Typography>

                    {/* Point 1 */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Clock color={colors.cyan} size={18} />
                        </View>
                        <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 20 }}>
                            Any pending withdrawal requests will be cancelled.
                        </Typography>
                    </View>

                    {/* Point 2 */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <BarChart2 color={colors.cyan} size={18} />
                        </View>
                        <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 20 }}>
                            All trading features on your account will be disabled.
                        </Typography>
                    </View>

                    {/* Point 3 */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Key color={colors.cyan} size={18} />
                        </View>
                        <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 20 }}>
                            All API keys linked to your account will be removed.
                        </Typography>
                    </View>

                    {/* Point 4 */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <User color={colors.cyan} size={18} />
                        </View>
                        <Typography size={13} style={{ flex: 1, color: colors.grey, fontFamily: fonts.regular, lineHeight: 20 }}>
                            Your identity verification details will be retained and not deleted.
                        </Typography>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.disableBtn}
                    onPress={() => navigation.navigate('VerifyEmailScreen' as any)}
                >
                    <Trash2 color={colors.red} size={20} style={{ marginRight: 10 }} />
                    <Typography size={16} style={{ color: colors.red, fontFamily: fonts.medium }}>
                        Disable Account
                    </Typography>
                </TouchableOpacity>

                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, textAlign: 'center', marginTop: 16, lineHeight: 18 }}>
                    Your security is our priority. You can always contact{'\n'}
                    <Typography size={12} style={{ color: colors.cyan }}>Coincode support</Typography> if you need help.
                </Typography>
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
        alignItems: 'center',
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
        marginTop: 0,
    },
    infoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        padding: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 204, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    },
    disableBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 77, 77, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 77, 77, 0.3)',
    }
});
