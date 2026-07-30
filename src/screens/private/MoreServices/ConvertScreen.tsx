import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Share2, FileText, Clock, ChevronDown, ArrowDownUp } from 'lucide-react-native';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import { CommonButton } from '../../../components/common/CommonButton';
import { ImageAssets } from '../../../components/common/ImageAssets';

const { width } = Dimensions.get('window');

export const ConvertScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: colors.black }]}>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>

                {/* Header */}
                <View style={[styles.header, { marginTop: 10 }]}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft color={colors.white} size={24} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.iconBtn, { marginRight: 12 }]}>
                            <Share2 color={colors.white} size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <FileText color={colors.white} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    {/* Page Title & History Button */}
                    <View style={styles.pageTitleRow}>
                        <View>
                            <Typography size={28} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                                Convert
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                                Trade crypto instantly
                            </Typography>
                        </View>
                        <TouchableOpacity style={styles.historyBtn}>
                            <Clock color={colors.grey} size={12} style={{ marginRight: 6 }} />
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>Convert History</Typography>
                        </TouchableOpacity>
                    </View>

                    {/* Main Swap Container */}
                    <View style={[styles.mainContainer, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)' }]}>

                        {/* You Pay Section */}
                        <View style={[styles.boxSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }]}>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium, marginBottom: 12 }}>You Pay</Typography>

                            <View style={styles.inputRow}>
                                <TextInput
                                    style={[styles.inputField, { color: colors.white, fontFamily: fonts.semiBold }]}
                                    value="1000"
                                    keyboardType="numeric"
                                    editable={true}
                                />
                                <TouchableOpacity style={[styles.currencySelector, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                    <View style={[styles.coinIcon, { backgroundColor: '#26A17B' }]}>
                                        <Typography size={12} style={{ color: colors.white, fontFamily: fonts.bold }}>₮</Typography>
                                    </View>
                                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold, marginHorizontal: 8 }}>USDT</Typography>
                                    <ChevronDown color={colors.white} size={16} />
                                </TouchableOpacity>
                            </View>

                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 8 }}>≈ $1,000.00</Typography>

                            <View style={styles.balanceRow}>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>Balance: 2,520.50 USDT</Typography>
                                <TouchableOpacity style={styles.maxBtn}>
                                    <Typography size={10} style={{ color: '#F7931A', fontFamily: fonts.bold }}>MAX</Typography>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Swap Icon */}
                        <View style={styles.swapIconContainer}>
                            <TouchableOpacity>
                                <Image
                                    source={ImageAssets.convertImg}
                                    style={{ width: 90, height: 90 }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* You Receive Section */}
                        <View style={[styles.boxSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }]}>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium, marginBottom: 12 }}>You Receive</Typography>

                            <View style={styles.inputRow}>
                                <TextInput
                                    style={[styles.inputField, { color: colors.white, fontFamily: fonts.semiBold }]}
                                    value="0.02561"
                                    keyboardType="numeric"
                                    editable={true}
                                />
                                <TouchableOpacity style={[styles.currencySelector, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                    <View style={[styles.coinIcon, { backgroundColor: '#F7931A' }]}>
                                        <Typography size={12} style={{ color: colors.white, fontFamily: fonts.bold }}>₿</Typography>
                                    </View>
                                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold, marginHorizontal: 8 }}>BTC</Typography>
                                    <ChevronDown color={colors.white} size={16} />
                                </TouchableOpacity>
                            </View>

                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 8 }}>≈ $985.45</Typography>

                            <View style={styles.balanceRow}>
                                <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>Balance: 0.02521 BTC</Typography>
                            </View>
                        </View>

                        {/* Stats Info Footer */}
                        <View style={styles.statsFooter}>
                            <View style={styles.statCol}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Rate</Typography>
                                <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium }}>1 USDT = 0.00002561 BTC</Typography>
                            </View>
                            <View style={styles.statColCenter}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Fee</Typography>
                                <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium }}>0.1%</Typography>
                            </View>
                            <View style={styles.statColRight}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Minimum Received</Typography>
                                <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium }}>0.02539 BTC</Typography>
                            </View>
                        </View>

                    </View>

                </ScrollView>

                {/* Fixed Bottom Button */}
                <View style={styles.bottomFixed}>
                    <CommonButton title="Convert Now" onPress={() => { }} />
                </View>

            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 100,
    },
    pageTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    historyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
    },
    mainContainer: {
        borderWidth: 1,
        borderRadius: 24,
        padding: 16,
    },
    boxSection: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        marginTop: 10
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputField: {
        flex: 1,
        fontSize: 28,
        padding: 0,
        margin: 0,
        height: 40,
    },
    currencySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    coinIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    maxBtn: {
        backgroundColor: 'rgba(247,147,26,0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    swapIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 0,
        zIndex: 10,
    },
    swapIconGlow: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        filter: [{ blur: 10 }] as any,
    },
    swapIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 8,
    },
    statCol: {
        flex: 1.5,
    },
    statColCenter: {
        flex: 1,
        alignItems: 'center',
    },
    statColRight: {
        flex: 1.5,
        alignItems: 'flex-end',
    },
    bottomFixed: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 10,
    }
});
