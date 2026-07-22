import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { Clock } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';

interface BorrowingRateSheetProps {
    sheetRef: any;
}

export const BorrowingRateSheet = ({ sheetRef }: BorrowingRateSheetProps) => {
    const { colors: themeColors } = useTheme();

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={360}
            showCloseIcon={true}
        >
            <View style={styles.container}>
                <Typography size={22} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>Borrowing Rate</Typography>
                <Typography size={13} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginTop: 8, lineHeight: 18 }}>
                    Loan interest for Margin Trading will be settled and charged on an hourly basis.
                </Typography>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Clock color={themeColors.white} size={16} />
                        <Typography size={14} style={{ fontFamily: fonts.medium, color: themeColors.white, marginLeft: 8 }}>
                            Current Hourly Rate
                        </Typography>
                    </View>
                    
                    <View style={styles.row}>
                        <View style={styles.coinInfo}>
                            <View style={[styles.iconWrapper, { backgroundColor: '#F59E0B' }]}>
                                <Typography size={12} style={{ color: themeColors.white, fontFamily: fonts.bold }}>B</Typography>
                            </View>
                            <Typography size={15} style={{ fontFamily: fonts.semiBold, color: themeColors.white, marginLeft: 12 }}>BTC</Typography>
                        </View>
                        <View style={styles.rateBadge}>
                            <Typography size={13} style={{ fontFamily: fonts.semiBold, color: themeColors.cyan }}>0.000058%</Typography>
                        </View>
                    </View>

                    <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                        <View style={styles.coinInfo}>
                            <View style={[styles.iconWrapper, { backgroundColor: '#10B981' }]}>
                                <Typography size={12} style={{ color: themeColors.white, fontFamily: fonts.bold }}>T</Typography>
                            </View>
                            <Typography size={15} style={{ fontFamily: fonts.semiBold, color: themeColors.white, marginLeft: 12 }}>USDT</Typography>
                        </View>
                        <View style={styles.rateBadge}>
                            <Typography size={13} style={{ fontFamily: fonts.semiBold, color: themeColors.cyan }}>0.000231%</Typography>
                        </View>
                    </View>
                </View>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#161719',
        borderRadius: 16,
        marginTop: 24,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2A2C33',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#2A2C33',
        paddingBottom: 12,
        marginBottom: 16,
        borderStyle: 'dashed',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2A2C33',
        marginBottom: 16,
    },
    coinInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rateBadge: {
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    }
});
