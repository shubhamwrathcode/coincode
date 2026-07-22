import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../../../../../components/common/Typography';
import { useTheme } from '../../../../../theme/ThemeProvider';
import { fonts } from '../../../../../theme/fonts';
import { SearchCode } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../../components/common/ImageAssets';

const TABS = ['Positions (0)', 'Orders (0)', 'Assets'];

export const FuturesPositions = () => {
    const { colors } = useTheme();
    const [activeTab, setActiveTab] = useState('Positions (0)');

    return (
        <View style={styles.container}>
            {/* Tabs Row */}
            <View style={styles.tabsRow}>
                {TABS.map(tab => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity key={tab} style={styles.tabBtn} onPress={() => setActiveTab(tab)}>
                            <Typography
                                size={14}
                                style={{
                                    color: isActive ? colors.white : colors.grey,
                                    fontFamily: isActive ? fonts.semiBold : fonts.medium
                                }}
                            >
                                {tab}
                            </Typography>
                            {isActive && <View style={[styles.activeIndicator, { backgroundColor: colors.cyan }]} />}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Empty State */}
            <View style={styles.emptyState}>
                <FastImage source={ImageAssets.noData} style={{ width: 85, height: 85 }} resizeMode='contain' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    tabsRow: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#161719',
        paddingBottom: 10,
        gap: 20,
    },
    tabBtn: {
        position: 'relative',
        paddingVertical: 5,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -10,
        left: '50%',
        transform: [{ translateX: -15 }],
        height: 2,
        width: 30,
        borderRadius: 2,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1E1F24',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111214',
    }
});
