import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Share2, ChevronUp, ChevronRight, Layers, Activity, DollarSign, ArrowRightLeft, Rocket, Coins, History, Zap } from 'lucide-react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from './ImageAssets';

type HistoryTypeSelectorModalProps = {
    visible: boolean;
    onClose: () => void;
    onSelect: (type: string, title: string) => void;
    currentType: string;
};

const OPTIONS = [
    { id: 'spot', title: 'Spot Orders', Icon: Layers },
    { id: 'futures', title: 'Futures', image: ImageAssets.futuresIcon },
    { id: 'margin', title: 'Margin Orders', Icon: DollarSign },
    { id: 'convert', title: 'Convert', Icon: ArrowRightLeft },
    { id: 'launchpad', title: 'Launchpad', Icon: Rocket },
    { id: 'staking', title: 'Staking', Icon: Coins },
    { id: 'asset', title: 'Asset History', Icon: History },
    { id: 'quick', title: 'Quick Buy / Sell', Icon: Zap },
];

export const HistoryTypeSelectorModal = ({ visible, onClose, onSelect, currentType }: HistoryTypeSelectorModalProps) => {
    const { colors } = useTheme();

    if (!visible) return null;

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={[styles.container, { backgroundColor: colors.black }]}>
                <SafeAreaView edges={['top']} style={{ flex: 1 }}>

                    {/* Header inside Modal (to look seamless) */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.iconBtn} onPress={onClose}>
                            <FastImage source={ImageAssets.backButtonImg} style={{ width: 35, height: 35 }} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.headerTitleRow} onPress={onClose}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.semiBold, marginRight: 4 }}>My Trades</Typography>
                                    <ChevronUp color={colors.white} size={16} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.iconBtn}>
                            <Share2 color={colors.white} size={20} />
                        </View>
                    </View>

                    {/* Options List with Staggered Animation */}
                    <View style={styles.listContainer}>
                        {OPTIONS.map((opt, index) => {
                            const isSelected = currentType === opt.id;
                            return (
                                <Animated.View
                                    key={opt.id}
                                    entering={FadeInDown.delay(150 + index * 100).duration(400)}
                                >
                                    <TouchableOpacity
                                        style={[styles.optionCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.15)' }]}
                                        onPress={() => onSelect(opt.id, opt.title)}
                                    >
                                        <View style={styles.optionLeft}>
                                            <View style={[styles.iconBg, { backgroundColor: 'rgba(0,194,255,0.1)' }]}>
                                                {opt.image ? (
                                                    <FastImage source={opt.image} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                                ) : opt.Icon ? (
                                                    <opt.Icon color={colors.cyan} size={18} />
                                                ) : null}
                                            </View>
                                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.medium, marginLeft: 16 }}>
                                                {opt.title}
                                            </Typography>
                                        </View>
                                        <ChevronRight color={colors.grey} size={16} />
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        })}
                    </View>

                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
    },
    iconBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitleRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
