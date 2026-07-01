import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { ImageAssets } from '../common/ImageAssets';

const PROMO_DATA = [
    {
        id: '1',
        title: 'Token Splash',
        heading: 'Earn\n30,000,000',
        subHeading: 'Join now and earn big!',
        image: ImageAssets.earnCoin,
        icon: ImageAssets.tokenSplash,
    },
    {
        id: '2',
        title: 'Easy Earn',
        heading: 'APR 6.26%',
        subHeading: 'Flexible, Secure,',
        image: ImageAssets.easyEarnPromo,
        icon: ImageAssets.easyEarn,
    }
];

export const PromoCards = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {PROMO_DATA.map((promo) => {
                    const Icon = promo.icon;
                    return (
                        <TouchableOpacity key={promo.id} style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.header}>
                                    <View style={styles.iconCircle}>
                                        <FastImage source={promo?.icon} style={{ width: 16, height: 16 }} resizeMode='contain' />
                                    </View>
                                    <Typography color={colors.cyan} size={9} style={{ fontFamily: fonts.regular, marginLeft: 6 }}>
                                        {promo.title}
                                    </Typography>
                                </View>

                                <Typography color={colors.white} size={11} style={{ fontFamily: fonts.bold, marginTop: 8, lineHeight: 16 }}>
                                    {promo.heading}
                                </Typography>

                                <Typography color={colors.darkShadeColorText} size={8} style={{ marginTop: 4, lineHeight: 11 }}>
                                    {promo.subHeading}
                                </Typography>
                            </View>

                            <FastImage
                                source={promo.image}
                                style={styles.promoImage}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    card: {
        flex: 1,
        height: 120,
        backgroundColor: '#0F1012',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
    },
    cardContent: {
        flex: 1,
        padding: 10,
        paddingRight: 35,
        justifyContent: 'center',
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 35,
        height: 35,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoImage: {
        width: 80,
        height: 80,
        position: 'absolute',
        right: -5,
        bottom: 15,
        zIndex: 1,
    }
});
