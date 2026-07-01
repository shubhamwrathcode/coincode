import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { ImageAssets } from '../common/ImageAssets';

const QUICK_LINKS = [
    { id: '1', title: 'Spot', icon: ImageAssets.spotIcon },
    { id: '2', title: 'Margin', icon: ImageAssets.marginIcon },
    { id: '3', title: 'Wallet', icon: ImageAssets.walletIcon },
    { id: '4', title: 'Swap', icon: ImageAssets.swapIcon },
    { id: '5', title: 'More', icon: ImageAssets.moreIcon },
];

export const QuickLinks = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.quickLinksContainer}>
            {QUICK_LINKS.map((link) => {
                return (
                    <TouchableOpacity key={link.id} style={styles.quickLinkItem}>
                        <View style={styles.quickLinkIconCircle}>
                            <FastImage
                                source={link.icon}
                                style={{ width: 24, height: 24 }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                        <Typography color={colors.white} size={11} style={{ fontFamily: fonts.medium, marginTop: 8 }}>
                            {link.title}
                        </Typography>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    quickLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    quickLinkItem: {
        alignItems: 'center',
    },
    quickLinkIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#0F1012',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
