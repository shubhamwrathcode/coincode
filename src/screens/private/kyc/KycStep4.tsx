import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, X, Hourglass } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { CommonButton } from '../../../components/common/CommonButton';
import { Screen } from '../../../components/common/Screen';
import { KycProgressBar } from '../../../components/common/KycProgressBar';
import { ImageAssets } from '../../../components/common/ImageAssets';
import FastImage from 'react-native-fast-image';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

const KycStep4 = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const rotation = useSharedValue(0);
    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 4000, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });

    return (
        <Screen>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                    <ChevronLeft color={colors.white} size={20} />
                </TouchableOpacity>
                <KycProgressBar currentStep={4} totalSteps={4} />
                <View></View>
            </View>

            <View style={styles.content}>
                <View style={styles.imageWrapper}>
                    <Animated.View style={animatedIconStyle}>
                        <FastImage source={ImageAssets.verifyingImg} style={{ width: 120, height: 120 }} resizeMode="contain" />
                    </Animated.View>
                </View>

                <Typography color={colors.white} size={24} style={{ fontFamily: fonts.bold, marginTop: 32, marginBottom: 12 }}>
                    Verifying
                </Typography>
                <Typography color={colors.grey} size={14} style={{ fontFamily: fonts.regular, textAlign: 'center', marginBottom: 16, lineHeight: 18 }}>
                    Hang tight, your review will be completed within{'\n'}the next 48 hours.
                </Typography>
                <Typography color={colors.grey} size={14} style={{ fontFamily: fonts.regular, textAlign: 'center', lineHeight: 18, paddingHorizontal: 20 }}>
                    Continue exploring Exchange while you wait. We'll notify you once verification is complete.
                </Typography>
            </View>

            <View style={styles.footer}>
                <CommonButton
                    title="Explore"
                    onPress={() => (navigation as any).navigate('KycStatus', { status: 'SUCCESS' })}
                    style={{ width: '100%' }}
                />
            </View>
        </Screen>
    );
};

export default KycStep4;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 10,
    },
    headerBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#111214',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    imageWrapper: {
        width: 140,
        height: 140,
        borderRadius: 85,
        borderWidth: 2,
        borderColor: 'rgba(6, 182, 212, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(6, 182, 212, 0.02)',
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        paddingTop: 16,
    },
});
