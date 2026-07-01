import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

const STEPS = ['Sign up', 'Identification', 'Deposit'];

export const AccountSetupProgress = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.dotsRow}>
                <View style={styles.trackBackground} />
                <View style={[styles.trackFill, { backgroundColor: colors.cyan, width: '40%' }]} />
                {STEPS.map((step, index) => {
                    const isActive = index === 0;
                    return (
                        <View key={step} style={styles.dotContainer}>
                            {isActive && (
                                <View style={styles.glowContainer}>
                                    <Svg height="40" width="40" viewBox="0 0 40 40">
                                        <Defs>
                                            <RadialGradient id={`glow-${index}`} cx="50%" cy="50%" rx="50%" ry="50%">
                                                <Stop offset="0%" stopColor={colors.cyan} stopOpacity="0.6" />
                                                <Stop offset="40%" stopColor={colors.cyan} stopOpacity="0.2" />
                                                <Stop offset="100%" stopColor={colors.cyan} stopOpacity="0" />
                                            </RadialGradient>
                                        </Defs>
                                        <Circle cx="20" cy="20" r="20" fill={`url(#glow-${index})`} />
                                    </Svg>
                                </View>
                            )}
                            <View style={[
                                styles.dot,
                                { backgroundColor: isActive ? colors.cyan : '#2A2B2F' }
                            ]} />
                        </View>
                    );
                })}
            </View>

            <View style={styles.textsRow}>
                {STEPS?.map((step, index) => {
                    const isActive = index === 0;
                    let alignStyle: any = styles.textCenter;
                    if (index === 0) alignStyle = styles.textLeft;
                    if (index === STEPS.length - 1) alignStyle = styles.textRight;

                    return (
                        <View key={step} style={alignStyle}>
                            <Typography
                                color={isActive ? colors.white : colors.darkShadeColorText}
                                size={12}
                                style={{ fontFamily: isActive ? fonts.semiBold : fonts.medium }}
                            >
                                {step}
                            </Typography>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
    },
    trackBackground: {
        position: 'absolute',
        top: '50%',
        marginTop: -1.5,
        left: 5,
        right: 5,
        height: 3,
        backgroundColor: '#2A2B2F',
    },
    trackFill: {
        position: 'absolute',
        top: '50%',
        marginTop: -1.5,
        left: 5,
        height: 3,
        zIndex: 1,
    },
    dotContainer: {
        width: 10,
        height: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        zIndex: 2,
    },
    glowContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        // center the 40x40 glow over the 10x10 dot
        top: -15,
        left: -15,
        width: 40,
        height: 40,
    },
    textsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    textLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    textCenter: {
        flex: 1,
        alignItems: 'center',
    },
    textRight: {
        flex: 1,
        alignItems: 'flex-end',
    }
});
