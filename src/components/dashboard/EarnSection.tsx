import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../common/ImageAssets';

const MINI_CARDS = [
    { id: '1', symbol: 'BYUSDT', label: 'Easy Earn', apy: '1.69%', color: '#00C076', initial: 'T' },
    { id: '2', symbol: 'OPG', label: 'Easy Earn', apy: '1.69%', color: '#FF4B4B', initial: 'M' },
    { id: '3', symbol: 'XAUT', label: 'Easy Earn', apy: '1.69%', color: '#F4B731', initial: 'Z' },
];

export const EarnSection = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {/* Left Main Card */}
            <TouchableOpacity style={styles.leftCard}>
                <Typography color={colors.darkShadeColorText} size={12} style={{ fontFamily: fonts.medium }}>
                    Easy Earn
                </Typography>

                <View style={{ marginTop: 6 }}>
                    <Typography color={colors.white} size={10} style={{ fontFamily: fonts.semiBold, marginBottom: 2 }}>
                        UP TO
                    </Typography>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Typography color={colors.cyan} size={20} style={{ fontFamily: fonts.bold }}>
                            12.5%
                        </Typography>
                        <Typography color={colors.cyan} size={12} style={{ fontFamily: fonts.semiBold, marginLeft: 4 }}>
                            APY
                        </Typography>
                    </View>
                </View>

                <Typography color={colors.darkShadeColorText} size={10} style={{ marginTop: 6, lineHeight: 14, width: '55%' }}>
                    Stable Returns on Your Crypto
                </Typography>

                <FastImage
                    source={ImageAssets.stakingHomeIcon}
                    style={styles.safeImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </TouchableOpacity>

            {/* Right Mini Cards Column */}
            <View style={styles.rightColumn}>
                {MINI_CARDS.map((card) => (
                    <TouchableOpacity key={card.id} style={styles.miniCard}>
                        <View style={[styles.miniCardIcon, { backgroundColor: card.color }]}>
                            <Typography color={colors.white} size={11} style={{ fontFamily: fonts.bold }}>
                                {card.initial}
                            </Typography>
                        </View>
                        <View style={{ flex: 1, marginLeft: 6 }}>
                            <Typography color={colors.white} size={11} style={{ fontFamily: fonts.bold }} numberOfLines={1}>
                                {card.symbol}
                            </Typography>
                            <Typography color={colors.darkShadeColorText} size={9} style={{ marginTop: 1 }}>
                                {card.label}
                            </Typography>
                        </View>
                        <Typography color={'#00C076'} size={10} style={{ fontFamily: fonts.semiBold, marginLeft: 2 }}>
                            {card.apy} {'>'}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
    },
    leftCard: {
        flex: 1.05,
        backgroundColor: '#0F1012',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        minHeight: 135,
    },
    safeImage: {
        position: 'absolute',
        right: -2,
        top: 25,
        width: 90,
        height: 148,
        zIndex: 1,

    },
    rightColumn: {
        flex: 1,
        gap: 8,
        justifyContent: 'space-between',
    },
    miniCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F1012',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    miniCardIcon: {
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
