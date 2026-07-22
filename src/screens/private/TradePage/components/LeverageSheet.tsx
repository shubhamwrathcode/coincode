import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { Minus, Plus, TriangleAlert } from 'lucide-react-native';
import { ToggleSwitch } from './ToggleSwitch';
import { Slider } from './Slider';
import { useState } from 'react';

interface LeverageSheetProps {
    sheetRef: any;
    currentLeverage: number;
    onSelectLeverage: (leverage: number) => void;
}

export const LeverageSheet = ({ sheetRef, currentLeverage, onSelectLeverage }: LeverageSheetProps) => {
    const { colors: themeColors } = useTheme();
    const [leverage, setLeverage] = useState(currentLeverage || 20);
    const [batchAdjust, setBatchAdjust] = useState(false);

    const leveragePoints = [1, 4, 8, 12, 16, 20];

    const handleContinue = () => {
        onSelectLeverage(leverage);
        sheetRef.current?.close();
    };

    const decrease = () => {
        if (leverage > 1) setLeverage(leverage - 1);
    };

    const increase = () => {
        if (leverage < 20) setLeverage(leverage + 1);
    };

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={600}
            showCloseIcon={true}
        >
            <View style={styles.container}>
                <Typography size={22} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>Adjust Leverage</Typography>
                <Typography size={12} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginTop: 4, marginBottom: 20 }}>
                    Customize your leverage level for this trading pair.
                </Typography>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Typography size={13} style={{ fontFamily: fonts.medium, color: themeColors.white, marginBottom: 8 }}>
                        Adjust Leverage
                    </Typography>

                    <View style={styles.adjustCard}>
                        <View style={styles.adjustControls}>
                            <TouchableOpacity style={styles.circleBtn} onPress={decrease}>
                                <Minus color={themeColors.grey} size={18} />
                            </TouchableOpacity>

                            <Typography size={28} style={{ fontFamily: fonts.bold, color: themeColors.white }}>
                                {leverage}x
                            </Typography>

                            <TouchableOpacity style={styles.circleBtn} onPress={increase}>
                                <Plus color={themeColors.grey} size={18} />
                            </TouchableOpacity>
                        </View>

                        <Slider 
                            value={leverage} 
                            color={themeColors.cyan} 
                            onValueChange={setLeverage} 
                            points={leveragePoints}
                            min={1}
                            max={20}
                        />
                    </View>

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoRowTop}>
                            <Typography size={12} style={{ fontFamily: fonts.medium, color: '#8B978F' }}>Max Position Size (After)</Typography>
                            <Typography size={13} style={{ fontFamily: fonts.semiBold, color: themeColors.green }}>150,000 USDT</Typography>
                        </View>
                        <View style={styles.warningRow}>
                            <TriangleAlert color="#EAB308" size={14} style={{ marginTop: 2 }} />
                            <Typography size={11} style={{ fontFamily: fonts.medium, color: '#8B978F', marginLeft: 8, flex: 1, lineHeight: 16 }}>
                                With leverage above 10x, even small price movements may trigger liquidation. Please exercise caution.
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Batch Adjust Leverage */}
                    <View style={styles.batchAdjustRow}>
                        <Typography size={14} style={{ fontFamily: fonts.medium, color: themeColors.white }}>Batch Adjust Leverage</Typography>
                        <ToggleSwitch
                            value={batchAdjust}
                            onValueChange={setBatchAdjust}
                        />
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity style={[styles.continueBtn, { backgroundColor: themeColors.cyan }]} onPress={handleContinue}>
                        <Typography size={15} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>Continue</Typography>
                    </TouchableOpacity>
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
    adjustCard: {
        borderRadius: 16,
        padding: 16,
        paddingTop: 24,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#1E1F24',
        backgroundColor: '#161719', // fallback
    },
    adjustControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    circleBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#2A2C33',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoCard: {
        backgroundColor: '#161719',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#1E1F24',
    },
    infoRowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    warningRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    divider: {
        height: 1,
        backgroundColor: '#2A2C33',
        marginVertical: 20,
    },
    batchAdjustRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    continueBtn: {
        paddingVertical: 14,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
