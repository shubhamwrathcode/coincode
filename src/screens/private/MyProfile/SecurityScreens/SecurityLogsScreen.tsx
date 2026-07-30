import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Filter, Clock, Globe, MapPin } from 'lucide-react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';

export const SecurityLogsScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    
    const [activeTab, setActiveTab] = useState<'logins' | 'security'>('logins');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                        Security Logs
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabBtn, activeTab === 'logins' ? { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.05)' } : { borderColor: 'rgba(255, 255, 255, 0.05)' }]}
                    onPress={() => setActiveTab('logins')}
                >
                    <Typography size={13} style={{ color: activeTab === 'logins' ? colors.cyan : colors.grey, fontFamily: fonts.medium }}>
                        Logins History
                    </Typography>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.tabBtn, activeTab === 'security' ? { borderColor: colors.cyan, backgroundColor: 'rgba(0, 204, 255, 0.05)' } : { borderColor: 'rgba(255, 255, 255, 0.05)' }]}
                    onPress={() => setActiveTab('security')}
                >
                    <Typography size={13} style={{ color: activeTab === 'security' ? colors.cyan : colors.grey, fontFamily: fonts.medium }}>
                        Security Settings History
                    </Typography>
                </TouchableOpacity>
            </View>

            {/* List Header */}
            <View style={styles.listHeader}>
                <View style={styles.listHeaderItem}>
                    <Filter color={colors.grey} size={12} style={{ marginRight: 4 }} />
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Type</Typography>
                </View>
                <View style={[styles.listHeaderItem, { flex: 1.2 }]}>
                    <Clock color={colors.grey} size={12} style={{ marginRight: 4 }} />
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Time</Typography>
                </View>
                <View style={styles.listHeaderItem}>
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Status</Typography>
                </View>
                <View style={styles.listHeaderItem}>
                    <Globe color={colors.grey} size={12} style={{ marginRight: 4 }} />
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>IP</Typography>
                </View>
                <View style={[styles.listHeaderItem, { flex: 1.5, justifyContent: 'flex-end' }]}>
                    <MapPin color={colors.grey} size={12} style={{ marginRight: 4 }} />
                    <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.medium }}>Login Location</Typography>
                </View>
            </View>

            {/* Empty State */}
            <View style={styles.emptyContainer}>
                <FastImage
                    source={ImageAssets.noData}
                    style={{ width: 120, height: 120, opacity: 0.8 }}
                    resizeMode="contain"
                    tintColor={colors.grey}
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
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    tabBtn: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 12,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    listHeaderItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100, // Visual offset
    }
});
