import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';

const { width } = Dimensions.get('window');

export const FundPasswordSuccessScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Illustration */}
                <View style={styles.illustrationContainer}>
                    <FastImage
                        source={ImageAssets.resetsuccessBanner}
                        style={{ width: width * 0.7, height: width * 0.7 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <Typography size={22} style={{ color: colors.white, fontFamily: fonts.semiBold, textAlign: 'center', marginTop: 24, lineHeight: 32 }}>
                    Fund Password Reset{'\n'}Successfully
                </Typography>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomContainer}>
                <CommonButton
                    title="Confirm"
                    onPress={() => {
                        // navigation.navigate('ProfileDetailScreen' as never);
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 16,
    }
});
