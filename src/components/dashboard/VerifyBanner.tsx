import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Typography } from '../common/Typography';
import { CommonButton } from '../common/CommonButton';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { ImageAssets } from '../common/ImageAssets';

export const VerifyBanner = () => {
    const { colors } = useTheme();

    return (
        <View style={[styles.banner, {
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: '#111214',
        }]}>
            <View style={{ position: 'absolute', top: 0, left: 0, width: 180, height: 200, overflow: 'hidden', borderTopLeftRadius: 20 }}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <RadialGradient id="glow" cx="0%" cy="0%" rx="100%" ry="100%">
                            <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                            <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
                </Svg>
            </View>
            <View style={styles.bannerLeft}>
                <Typography color={colors.cyan} size={11} style={{
                    fontFamily: fonts.medium,
                    textShadowColor: colors.cyan,
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10
                }}>Unlock Full Access</Typography>
                <Typography color={colors.white} size={15} style={{ fontFamily: fonts.semiBold, marginTop: 5, lineHeight: 22 }}>
                    Verify your identity{'\n'}to unlock full features
                </Typography>
                <Typography color={colors.darkShadeColorText} size={11} style={{ marginTop: 5, lineHeight: 16 }}>
                    Complete verification to enjoy{'\n'}all features and higher limits.
                </Typography>
                <CommonButton
                    title="Verify Now →"
                    onPress={() => { }}
                    style={{ width: 130, height: 34, marginTop: 8 }}
                    titleStyle={{ fontSize: 13, fontFamily: fonts.semiBold }}
                />
            </View>
            <FastImage source={ImageAssets.verifyIdentity}
                style={{ width: 185, height: 200, position: "absolute", right: 0, top: -30 }}
                resizeMode={FastImage.resizeMode.contain} />
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row',
        marginHorizontal: 16,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        overflow: 'hidden',
        backgroundColor: "#08090B"
    },
    bannerLeft: {
        flex: 1,
        zIndex: 2,
    }
});
