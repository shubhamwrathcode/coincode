import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { Info, X } from 'lucide-react-native';

interface NetworkSelectSheetProps {
    sheetRef: any;
    onSelect: (network: string) => void;
}

const networks = [
    { id: 'ERC20', name: 'ERC20', desc: 'Ethereum (ETH)', time: '~ 3 min', minDeposit: '1 ETH', color: '#627EEA', iconLabel: 'ETH' },
    { id: 'BEP20', name: 'BEP20', desc: 'BNB Smart Chain (BSC)', time: '~ 3 min', minDeposit: '0.1 BNB', color: '#F3BA2F', iconLabel: 'BSC' },
    { id: 'TRC20', name: 'TRC20', desc: 'Tron (TRX)', time: '~ 1 min', minDeposit: '1.1 TRX', color: '#FF060A', iconLabel: 'TRX' },
    { id: 'PLASMA', name: 'PLASMA', desc: 'Plasma (PLASMA)', time: '~ 5 min', minDeposit: '2.1 PLASMA', color: '#8A2BE2', iconLabel: 'PLA' },
    { id: 'TON', name: 'TON', desc: 'TON (The Open Network)', time: '~ 2 min', minDeposit: '0.1 TON', color: '#0098EA', iconLabel: 'TON' },
];

export const NetworkSelectSheet: React.FC<NetworkSelectSheetProps> = ({ sheetRef, onSelect }) => {
    const { colors } = useTheme();

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={550}
        >
            <View style={styles.customHeader}>
                <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Select Network</Typography>
                {/* <TouchableOpacity onPress={() => sheetRef.current?.close()}>
                    <X color={colors.grey} size={20} />
                </TouchableOpacity> */}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Warning Banner */}
                <View style={styles.warningBanner}>
                    <Info color="#8A82F1" size={16} style={{ marginTop: 2 }} />
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginLeft: 10, flex: 1, lineHeight: 18 }}>
                        Please confirm that the receiving platform supports both the selected token and blockchain network before proceeding. Incorrect network selection may result in permanent loss of funds.
                    </Typography>
                </View>

                {/* Network List */}
                {networks.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.networkItem}
                        activeOpacity={0.8}
                        onPress={() => {
                            onSelect(item.name);
                            sheetRef.current?.close();
                        }}
                    >
                        {/* Logo placeholder */}
                        <View style={[styles.logoCircle, { backgroundColor: item.color }]}>
                            <Typography size={10} style={{ color: '#fff', fontFamily: fonts.bold }}>{item.iconLabel}</Typography>
                        </View>

                        <View style={{ flex: 1, marginLeft: 10, paddingRight: 8 }}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                                {item.name}
                            </Typography>
                            <Typography size={11} numberOfLines={1} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                                {item.desc}
                            </Typography>
                        </View>

                        <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.dot, { backgroundColor: ['TRC20', 'TON'].includes(item.id) ? '#F3BA2F' : '#06C168' }]} />
                                <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 6 }}>
                                    {item.time}
                                </Typography>
                            </View>
                            <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                                Min Deposit: {item.minDeposit}
                            </Typography>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    warningBanner: {
        flexDirection: 'row',
        backgroundColor: 'rgba(138, 130, 241, 0.1)',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(138, 130, 241, 0.2)',
        marginHorizontal: 16,
    },
    networkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        marginHorizontal: 16,
    },
    logoCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    }
});
