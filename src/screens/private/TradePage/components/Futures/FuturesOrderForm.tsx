import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Typography } from '../../../../../components/common/Typography';
import { useTheme } from '../../../../../theme/ThemeProvider';
import { fonts } from '../../../../../theme/fonts';
import { ChevronDown, Plus, Minus, PlusCircle } from 'lucide-react-native';
import { PercentBar } from '../PercentBar';
import { ToggleSwitch } from '../ToggleSwitch';
import { MarginModeSheet } from '../MarginModeSheet';
import { LeverageSheet } from '../LeverageSheet';
import { AddFundsSheet } from '../AddFundsSheet';
import { OrderTypeSheet } from '../OrderTypeSheet';

export const FuturesOrderForm = () => {
    const { colors } = useTheme();
    const [marginMode, setMarginMode] = useState('Cross');
    const [leverage, setLeverage] = useState(10);
    const [orderType, setOrderType] = useState('Limit');
    const [percent, setPercent] = useState(0);
    const [tpSl, setTpSl] = useState(false);

    const marginModeSheetRef = useRef<any>(null);
    const leverageSheetRef = useRef<any>(null);
    const fundsSheetRef = useRef<any>(null);
    const orderTypeSheetRef = useRef<any>(null);

    return (
        <View style={styles.container}>
            {/* Top row: Margin Mode & Leverage */}
            <View style={styles.topRow}>
                <TouchableOpacity style={styles.dropdownBtn} onPress={() => marginModeSheetRef.current?.open()}>
                    <Typography size={13}>{marginMode}</Typography>
                    <ChevronDown color={colors.grey} size={14} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownBtn} onPress={() => leverageSheetRef.current?.open()}>
                    <Typography size={13}>{leverage}x</Typography>
                    <ChevronDown color={colors.grey} size={14} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            </View>

            {/* Available */}
            <View style={styles.availableRow}>
                <Typography size={12} style={{ color: colors.grey }}>Available</Typography>
                <TouchableOpacity style={styles.availableRight} onPress={() => fundsSheetRef.current?.open()}>
                    <Typography size={12} style={{ fontFamily: fonts.semiBold, marginRight: 4 }}>0 USDT</Typography>
                    <PlusCircle color={colors.black} fill="#00C853" size={14} />
                </TouchableOpacity>
            </View>

            {/* Order Type */}
            <TouchableOpacity 
                style={[styles.inputContainer, styles.orderTypeContainer]}
                onPress={() => orderTypeSheetRef.current?.open()}
            >
                <Typography size={14}>{orderType}</Typography>
                <ChevronDown color={colors.grey} size={16} />
            </TouchableOpacity>

            {/* Price */}
            <Typography size={11} style={{ color: colors.grey, marginBottom: 4 }}>Price (USDT)</Typography>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.iconBtn}><Minus color={colors.grey} size={16} /></TouchableOpacity>
                <TextInput
                    style={[styles.input, { color: colors.white, fontFamily: fonts.semiBold }]}
                    defaultValue="58,694.0"
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.iconBtn}><Plus color={colors.grey} size={16} /></TouchableOpacity>
            </View>

            {/* Quantity */}
            <Typography size={11} style={{ color: colors.grey, marginBottom: 4, marginTop: 12 }}>Quantity (BTC)</Typography>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.iconBtn}><Minus color={colors.grey} size={16} /></TouchableOpacity>
                <TextInput
                    style={[styles.input, { color: colors.white }]}
                    placeholder="Enter Amount"
                    placeholderTextColor={colors.grey}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.iconBtn}><Plus color={colors.grey} size={16} /></TouchableOpacity>
            </View>

            {/* Percent Bar */}
            <View style={{ marginTop: 15, marginBottom: 10 }}>
                <PercentBar percent={percent} color={colors.cyan} onPercentChange={setPercent} />
            </View>

            {/* Readouts (Value, Cost, Liq. Price) */}
            <View style={styles.readoutCard}>
                <View style={styles.readoutRow}>
                    <Typography size={10} style={{ color: colors.grey }}>Value</Typography>
                    <View style={styles.readoutVal}>
                        <Typography size={10} style={{ color: colors.green }}>0</Typography>
                        <Typography size={10} style={{ color: colors.grey }}>/</Typography>
                        <Typography size={10} style={{ color: colors.red }}>0</Typography>
                        <Typography size={10} style={{ color: colors.white, marginLeft: 2 }}>USDT</Typography>
                    </View>
                </View>
                <View style={styles.readoutRow}>
                    <Typography size={10} style={{ color: colors.grey }}>Cost</Typography>
                    <View style={styles.readoutVal}>
                        <Typography size={10} style={{ color: colors.green }}>0</Typography>
                        <Typography size={10} style={{ color: colors.grey }}>/</Typography>
                        <Typography size={10} style={{ color: colors.red }}>0</Typography>
                        <Typography size={10} style={{ color: colors.white, marginLeft: 2 }}>USDT</Typography>
                    </View>
                </View>
                <View style={styles.readoutRow}>
                    <Typography size={10} style={{ color: colors.grey }}>Liq. Price</Typography>
                    <Typography size={10} style={{ color: colors.white }}>Calculate</Typography>
                </View>
            </View>

            {/* TP/SL */}
            <View style={styles.tpslRow}>
                <Typography size={12} style={{ color: colors.grey }}>TP/SL</Typography>
                <ToggleSwitch value={tpSl} onValueChange={setTpSl} />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionSection}>
                <View style={styles.actionRow}>
                    <Typography size={11} style={{ color: colors.grey }}>Max</Typography>
                    <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium }}>0 RON</Typography>
                </View>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.green }]}>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Open Long</Typography>
                </TouchableOpacity>

                <View style={[styles.actionRow, { marginTop: 15 }]}>
                    <Typography size={11} style={{ color: colors.grey }}>Max</Typography>
                    <Typography size={11} style={{ color: colors.white, fontFamily: fonts.medium }}>0 RON</Typography>
                </View>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.red }]}>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>Open Short</Typography>
                </TouchableOpacity>
            </View>

            {/* Sheets */}
            <MarginModeSheet sheetRef={marginModeSheetRef} selectedMode={marginMode} onSelectMode={setMarginMode} />
            <LeverageSheet sheetRef={leverageSheetRef} currentLeverage={leverage} onSelectLeverage={setLeverage} />
            <AddFundsSheet sheetRef={fundsSheetRef} />
            <OrderTypeSheet
                sheetRef={orderTypeSheetRef}
                selectedType={orderType}
                onSelect={(type) => {
                    setOrderType(type);
                    orderTypeSheetRef.current?.close();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 10,
    },
    topRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 15,
    },
    dropdownBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#161719',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    availableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    availableRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161719',
        borderRadius: 8,
        height: 40,
        paddingHorizontal: 10,
    },
    orderTypeContainer: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    iconBtn: {
        padding: 5,
    },
    input: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: fonts.medium,
        padding: 0,
    },
    readoutCard: {
        backgroundColor: '#161719',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        gap: 6,
    },
    readoutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    readoutVal: {
        flexDirection: 'row',
    },
    tpslRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
    actionSection: {
        marginTop: 5,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    actionBtn: {
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
