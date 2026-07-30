import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

export const ThirdPartyAccessScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, textAlign: 'center' }}>
                        Third Party Account Access{'\n'}Management
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            {/* List Header */}
            <View style={styles.listHeader}>
                <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium, flex: 1.2, textAlign: 'center' }}>
                    Third Party
                </Typography>
                <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium, flex: 1, textAlign: 'center' }}>
                    Account
                </Typography>
                <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium, flex: 1, textAlign: 'center' }}>
                    Added at
                </Typography>
                <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium, flex: 1, textAlign: 'center' }}>
                    Operation
                </Typography>
            </View>
            <View style={styles.headerDivider} />

            {/* Content Body */}
            <View style={styles.contentBody}>
                <FastImage
                    source={ImageAssets.noData}
                    style={{ width: 120, height: 120, opacity: 0.8 }}
                    resizeMode="contain"
                />
                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.regular, marginTop: 16 }}>
                    No data
                </Typography>
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
        paddingBottom: 20,
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
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    contentBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100, // offset to visually center
    }
});
