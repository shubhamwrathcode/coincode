import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { CommonButton } from '../../../../components/common/CommonButton';

export const DeviceRemovedScreen = () => {
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

            {/* Content */}
            <View style={styles.content}>
                <FastImage
                    source={ImageAssets.deviceRemovedBanner}
                    style={styles.heroImage}
                    resizeMode="contain"
                />
                
                <Typography size={24} style={{ color: '#77EAA3', fontFamily: fonts.semiBold, marginTop: 40 }}>
                    Device Removed
                </Typography>
            </View>

            {/* Bottom Button */}
            <View style={styles.footer}>
                <CommonButton
                    title="Confirm"
                    onPress={() => {
                        // Go back to the security screen or profile
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'MainTabs' },
                                    { name: 'ProfileDetail' },
                                ],
                            })
                        );
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
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: -60, // Shift up slightly to center better visually
    },
    heroImage: {
        width: 240,
        height: 240,
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 8,
    },
});
