import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft, ChevronRight, AlertCircle, Edit, ShieldOff, ShieldCheck } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';

export const ManageAntiPhishingCodeScreen = () => {
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
                    Anti-Phishing Code
                </Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Hero Banner Image */}
                <View style={{ alignItems: 'center', marginBottom: 16 }}>
                    <FastImage
                        source={ImageAssets.antiPhisingBanner}
                        style={{ width: '100%', height: 160 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <AlertCircle color={colors.cyan} size={18} style={{ marginTop: 2, marginRight: 12 }} />
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 18, flex: 1 }}>
                        This code helps you identify official emails from Coincode and protect you from phishing attempts.
                    </Typography>
                </View>
                {/* Menu List */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditAntiPhishingCodeScreen' as any)}>
                        <View style={styles.menuIconContainer}>
                            <Edit color={colors.cyan} size={18} />
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 4 }}>
                                Edit Anti-Phishing Code
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                                Update your unique code
                            </Typography>
                        </View>
                        <ChevronRight color={colors.grey} size={18} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DisableAntiPhishingCodeScreen' as any)}>
                        <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(233, 77, 77, 0.08)', borderColor: 'rgba(233, 77, 77, 0.15)' }]}>
                            <ShieldOff color="#E94D4D" size={18} />
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginBottom: 4 }}>
                                Disable Anti-Phishing Code
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>
                                Turn off anti-phishing protection
                            </Typography>
                        </View>
                        <ChevronRight color={colors.grey} size={18} />
                    </TouchableOpacity>
                </View>

                {/* Bottom Note Card */}
                <View style={styles.noteCard}>
                    <View style={styles.menuIconContainer}>
                        <ShieldCheck color={colors.cyan} size={18} />
                    </View>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 20, flex: 1 }}>
                        Always check that the email contains your <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Anti-Phishing Code</Typography> to ensure it's from <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>Coincode</Typography>.
                    </Typography>
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
        paddingBottom: 16,
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

    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    menuContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 204, 255, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.15)',
    },
    menuTextContainer: {
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    noteCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
});
