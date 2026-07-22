import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { CustomBottomSheet } from '../../../../components/common/CustomBottomSheet';
import { Info, Users, Circle, CheckCircle2 } from 'lucide-react-native';
import { ToggleSwitch } from './ToggleSwitch';

interface MarginModeSheetProps {
    sheetRef: any;
    selectedMode: string;
    onSelectMode: (mode: string) => void;
}

export const MarginModeSheet = ({ sheetRef, selectedMode, onSelectMode }: MarginModeSheetProps) => {
    const { colors: themeColors } = useTheme();
    const [mode, setMode] = useState(selectedMode || 'Isolated');
    const [batchAdjust, setBatchAdjust] = useState(false);

    const handleContinue = () => {
        onSelectMode(mode);
        sheetRef.current?.close();
    };

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={620}
            showCloseIcon={true}
        >
            <View style={styles.container}>
                <Typography size={22} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>Margin Mode</Typography>
                <Typography size={12} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginTop: 4, marginBottom: 16 }}>
                    Select the unit type you want to use for placing your order.
                </Typography>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Isolated Option */}
                    <TouchableOpacity
                        style={[styles.optionCard, mode === 'Isolated' && styles.selectedCard]}
                        onPress={() => setMode('Isolated')}
                    >
                        <View style={styles.iconContainer}>
                            <Users color={mode === 'Isolated' ? themeColors.cyan : themeColors.grey} size={20} />
                        </View>
                        <View style={styles.optionContent}>
                            <Typography size={15} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>Isolated</Typography>
                            <Typography size={12} style={{ fontFamily: fonts.medium, color: mode === 'Isolated' ? '#8B978F' : themeColors.grey, marginTop: 4, lineHeight: 18 }}>
                                In isolated margin mode, the position margin is the allocated amount, and your loss is limited to it upon liquidation. You can also adjust the margin for positions in this mode.
                            </Typography>
                        </View>
                        <View style={styles.radioContainer}>
                            {mode === 'Isolated' ? (
                                <View style={styles.radioSelectedOuter}>
                                    <View style={styles.radioSelectedInner} />
                                </View>
                            ) : (
                                <Circle color={themeColors.grey} size={20} />
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* Cross Option */}
                    <TouchableOpacity
                        style={[styles.optionCard, mode === 'Cross' && styles.selectedCard]}
                        onPress={() => setMode('Cross')}
                    >
                        <View style={styles.iconContainer}>
                            <Users color={mode === 'Cross' ? themeColors.cyan : themeColors.grey} size={20} />
                        </View>
                        <View style={styles.optionContent}>
                            <Typography size={15} style={{ fontFamily: fonts.semiBold, color: themeColors.white }}>Cross</Typography>
                            <Typography size={12} style={{ fontFamily: fonts.medium, color: mode === 'Cross' ? '#8B978F' : themeColors.grey, marginTop: 4, lineHeight: 18 }}>
                                In cross margin mode, the entire account balance is used as margin, and you may lose it all upon liquidation.
                            </Typography>
                        </View>
                        <View style={styles.radioContainer}>
                            {mode === 'Cross' ? (
                                <View style={styles.radioSelectedOuter}>
                                    <View style={styles.radioSelectedInner} />
                                </View>
                            ) : (
                                <Circle color={themeColors.grey} size={20} />
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <Info color={themeColors.grey} size={16} />
                        <Typography size={12} style={{ fontFamily: fonts.medium, color: themeColors.grey, marginLeft: 8, flex: 1 }}>
                            Switching margin modes only applies to the current contract.
                        </Typography>
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
    optionCard: {
        flexDirection: 'row',
        backgroundColor: '#161719',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#2A2C33',
    },
    selectedCard: {
        borderColor: '#00BCD4',
        backgroundColor: 'rgba(0, 188, 212, 0.05)',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#1E1F24',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    optionContent: {
        flex: 1,
        paddingRight: 10,
    },
    radioContainer: {
        // justifyContent: 'center',
        alignItems: 'center',
        width: 24,
    },
    radioSelectedOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#00BCD4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelectedInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#00BCD4',
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161719',
        borderRadius: 8,
        padding: 12,
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#2A2C33',
        marginVertical: 16,
    },
    batchAdjustRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    continueBtn: {
        paddingVertical: 14,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
