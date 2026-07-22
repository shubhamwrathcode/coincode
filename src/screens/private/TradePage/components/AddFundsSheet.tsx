import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { ChevronRight, ShieldCheck, Lock } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import FastImage from 'react-native-fast-image';

interface AddFundsSheetProps {
    sheetRef: any;
}

export const AddFundsSheet = ({ sheetRef }: AddFundsSheetProps) => {
    const { colors: themeColors } = useTheme();

    const OPTIONS = [
        {
            title: 'Onchain Deposit',
            subtitle: 'Securely transfer crypto from external wallets or exchanges.',
            icon: ImageAssets.onchainImg,
        },
        {
            title: 'P2P Trading',
            subtitle: 'Trade crypto with zero fees and flexible payment options.',
            icon: ImageAssets.p2pTradeImg,
        },
        {
            title: 'Buy with Fiat',
            subtitle: 'Instantly buy crypto using cards, bank transfers, and more.',
            icon: ImageAssets.buyFiatImg,
        },
    ];

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={460}
            showCloseIcon={true}
        >
            <View style={styles.container}>
                <Typography size={22} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>Add Funds</Typography>
                <Typography size={13} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginTop: 4, marginBottom: 12 }}>
                    Choose a method to deposit or buy crypto
                </Typography>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {OPTIONS.map((opt, index) => (
                        <TouchableOpacity key={index} style={styles.optionCard}>
                            <View style={styles.iconContainer}>
                                <FastImage source={opt.icon} style={{ width: 22, height: 22 }} resizeMode="contain" />
                            </View>
                            <View style={styles.optionContent}>
                                <Typography size={15} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>{opt.title}</Typography>
                                <Typography size={12} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginTop: 2, lineHeight: 16 }}>
                                    {opt.subtitle}
                                </Typography>
                            </View>
                            <View style={styles.chevronContainer}>
                                <ChevronRight color="#4B5563" size={16} strokeWidth={2} />
                            </View>
                        </TouchableOpacity>
                    ))}

                    <LinearGradient
                        colors={['rgba(6, 182, 212, 0.1)', 'rgba(16, 185, 129, 0.05)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.securityCard}
                    >
                        <ShieldCheck color={themeColors.cyan} size={20} strokeWidth={1.5} />
                        <View style={styles.securityContent}>
                            <Typography size={13} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>Your security is our priority</Typography>
                            <Typography size={11} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginTop: 2 }}>
                                All transactions are encrypted and secure.
                            </Typography>
                        </View>
                        <Lock color={themeColors.grey} size={16} strokeWidth={2} />
                    </LinearGradient>
                </ScrollView>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161719',
        borderRadius: 16,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#2A2C33',
    },
    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    optionContent: {
        flex: 1,
        paddingRight: 10,
    },
    chevronContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#1E1F24',
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        padding: 12,
        marginTop: 4,
        borderWidth: 1,
        borderColor: 'rgba(6, 182, 212, 0.2)',
    },
    securityContent: {
        flex: 1,
        marginLeft: 12,
        marginRight: 10,
    }
});
