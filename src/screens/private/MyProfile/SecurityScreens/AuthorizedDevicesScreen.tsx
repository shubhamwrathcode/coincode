import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

export const AuthorizedDevicesScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState('Devices');
    const tabs = ['Devices', 'Login time', 'IP address', 'Login place', 'Device ID'];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                        Authorized Devices
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            {/* List Header (Scrollable horizontally) */}
            <View style={styles.listHeaderWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listHeaderContent}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={styles.headerCol}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Typography size={13} style={{ color: isActive ? colors.cyan : colors.grey, fontFamily: fonts.medium }}>
                                    {tab}
                                </Typography>
                                {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Empty State */}
            <View style={styles.emptyContainer}>
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
        paddingBottom: 16,
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
    listHeaderWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    listHeaderContent: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    headerCol: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        position: 'relative',
        alignItems: 'center',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 2,
        width: 30, // Shorter width as requested
        alignSelf: 'center',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100, // Visual offset
    }
});
