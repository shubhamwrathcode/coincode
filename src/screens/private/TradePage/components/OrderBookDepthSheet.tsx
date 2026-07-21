import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { Circle, Info, CircleDot } from 'lucide-react-native';

interface OrderBookDepthSheetProps {
    sheetRef: any;
    selectedDepth: string;
    onSelect: (depth: string) => void;
}

export const OrderBookDepthSheet = ({ sheetRef, selectedDepth, onSelect }: OrderBookDepthSheetProps) => {
    const { colors: themeColors } = useTheme();
    const depths = ['0.1', '1', '10', '100'];

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={500}
            showCloseIcon={true}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Typography size={22} style={{ fontFamily: fonts.semiBold, color: '#FFF' }}>Order Book Depth</Typography>
                    <Typography size={13} style={{ fontFamily: fonts.medium, color: '#9CA3AF', marginTop: 6 }}>Select the depth of market data to display.</Typography>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {depths.map(depth => {
                        const isSelected = selectedDepth === depth;
                        return (
                            <TouchableOpacity
                                key={depth}
                                style={[styles.itemCard, isSelected && { borderColor: '#06B6D4', backgroundColor: 'rgba(6, 182, 212, 0.05)' }]}
                                onPress={() => onSelect(depth)}
                            >
                                <Typography size={16} style={{ fontFamily: fonts.semiBold, color: '#FFF', flex: 1 }}>{depth}</Typography>
                                {isSelected ? (
                                    <View style={{ width: 20, height: 20, borderRadius: 11, borderWidth: 1.5, borderColor: '#06B6D4', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ width: 10, height: 10, borderRadius: 16, backgroundColor: '#06B6D4' }} />
                                    </View>
                                ) : (
                                    <Circle color="#4B5563" size={22} strokeWidth={1.5} />
                                )}
                            </TouchableOpacity>
                        );
                    })}

                    <View style={styles.infoBox}>
                        <Info color="#6B7280" size={16} style={{ marginRight: 10, marginTop: 2 }} />
                        <Typography size={12} style={{ fontFamily: fonts.medium, color: '#6B7280', flex: 1, lineHeight: 18 }}>
                            Lower depth shows more levels of the order book. Higher depth shows aggregated levels.
                        </Typography>
                    </View>
                </ScrollView>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 12,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1F24',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#2A2C33',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#1E1F24',
        borderRadius: 16,
        padding: 12,
        marginTop: 4,
    }
});
