import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { TrendingUp, ShoppingCart, Target, Layers, Clock, Shield, Activity, ChevronRight, CheckCircle2, Circle, Check } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

interface OrderTypeSheetProps {
    sheetRef: any;
    selectedType: string;
    onSelect: (type: string) => void;
}

export const OrderTypeSheet = ({ sheetRef, selectedType, onSelect }: OrderTypeSheetProps) => {
    const { colors: themeColors } = useTheme();

    const renderItem = (title: string, subtitle: string, IconComponent: any, iconBgColors: string[], type: 'radio' | 'chevron', isSelected: boolean) => {
        return (
            <TouchableOpacity
                key={title}
                style={[styles.itemCard, isSelected && { borderColor: '#06B6D4', backgroundColor: 'rgba(6, 182, 212, 0.05)' }]}
                onPress={() => onSelect(title)}
            >
                <LinearGradient
                    colors={iconBgColors}
                    style={styles.iconWrapper}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <IconComponent color="#FFF" size={20} strokeWidth={2} />
                </LinearGradient>
                <View style={styles.itemTextContent}>
                    <Typography size={14} style={{ fontFamily: fonts.semiBold, color: '#FFF' }}>{title}</Typography>
                    <Typography size={12} style={{ fontFamily: fonts.medium, color: '#9CA3AF', marginTop: 4, lineHeight: 16 }}>{subtitle}</Typography>
                </View>
                <View style={styles.rightAction}>
                    {type === 'chevron' ? (
                        <ChevronRight color="#6B7280" size={20} />
                    ) : isSelected ? (
                        <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#A855F7', alignItems: 'center', justifyContent: 'center' }}>
                            <Check color="#FFF" size={14} strokeWidth={3} />
                        </View>
                    ) : (
                        <Circle color="#4B5563" size={22} strokeWidth={1.5} />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={700}
            showCloseIcon={true}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Typography size={22} style={{ fontFamily: fonts.bold, color: '#FFF' }}>Order Type</Typography>
                    <Typography size={13} style={{ fontFamily: fonts.medium, color: '#9CA3AF', marginTop: 6 }}>Choose how you want to place your order</Typography>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* BASIC SECTION */}
                    <View style={styles.sectionHeader}>
                        <FastImage source={ImageAssets.DiamondIcon} style={{ width: 15, height: 15 }} tintColor="#F59E0B" resizeMode="contain" />
                        <Typography size={13} style={{ fontFamily: fonts.semiBold, color: '#F59E0B', marginLeft: 8, letterSpacing: 1 }}>BASIC</Typography>
                    </View>

                    {renderItem('Limit', 'Buy or sell at a given price or better.', TrendingUp, ['#4F1D96', '#7C3AED'], 'radio', selectedType === 'Limit')}
                    {renderItem('Market', 'Quickly buy or sell at the best market price.', ShoppingCart, ['#064E3B', '#059669'], 'radio', selectedType === 'Market')}
                    {renderItem('Conditional', 'The system will place an order automatically when the preset price is reached.', Target, ['#78350F', '#D97706'], 'radio', selectedType === 'Conditional')}

                    {/* ADVANCED SECTION */}
                    <View style={[styles.sectionHeader, { marginTop: 16 }]}>
                        <FastImage source={ImageAssets.DiamondIcon} style={{ width: 15, height: 15 }} tintColor="#3B82F6" resizeMode="contain" />
                        <Typography size={13} style={{ fontFamily: fonts.semiBold, color: '#3B82F6', marginLeft: 8, letterSpacing: 1 }}>ADVANCED</Typography>
                    </View>

                    {renderItem('Advanced Limit', 'Advanced Limit allows advance limit order types, such as Post Only, IOC and FOK.', Layers, ['#1E3A8A', '#3B82F6'], 'chevron', false)}
                    {renderItem('TWAP', 'Split large orders and place orders at regular intervals to reduce slippage.', Clock, ['#134E4A', '#0D9488'], 'chevron', false)}
                    {renderItem('TP/SL', 'When order of either side is triggered, the other side will be auto cancelled.', Shield, ['#7F1D1D', '#DC2626'], 'chevron', false)}
                    {renderItem('Trailing Stop', 'Track the market price, and once the preset value is reached, a market order will be automatically placed.', Activity, ['#312E81', '#6366F1'], 'chevron', false)}
                </ScrollView>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        marginBottom: 12,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1F24',
        borderRadius: 16,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#2A2C33',
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    itemTextContent: {
        flex: 1,
        marginRight: 12,
    },
    rightAction: {
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
