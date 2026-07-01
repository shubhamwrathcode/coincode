import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { Search, User } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from './ImageAssets';
import { SearchModal } from './SearchModal';

export const HomeHeader = () => {
    const { colors } = useTheme();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchLayout, setSearchLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const searchBarRef = useRef<View>(null);

    const handleOpenSearch = () => {
        searchBarRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setSearchLayout({ x: pageX, y: pageY, width, height });
            setIsSearchVisible(true);
        });
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity style={[styles.avatar, { borderColor: colors.searchBoxBorderColor, backgroundColor: colors.inputBorderColor }]}>
                <User color={colors.grey} size={20} />
            </TouchableOpacity>

            <TouchableOpacity 
                ref={searchBarRef as any}
                style={[styles.searchContainer, { borderColor: colors.searchBoxBorderColor, backgroundColor: colors.inputBorderColor }]}
                onPress={handleOpenSearch}
                activeOpacity={0.8}
            >
                <Search color={colors.grey} size={18} />
                <Typography color={colors.grey} size={14} style={{ marginLeft: 8, fontFamily: fonts.medium }}>
                    SOL/USDT
                </Typography>
            </TouchableOpacity>

            <View style={styles.rightIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <FastImage source={ImageAssets.gridIcon} style={{ width: 22, height: 22 }} resizeMode={FastImage.resizeMode.contain} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <FastImage source={ImageAssets.giftIcon} style={{ width: 22, height: 22 }} resizeMode={FastImage.resizeMode.contain} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <View>
                        <FastImage source={ImageAssets.bellIcon} style={{ width: 22, height: 22 }} resizeMode={FastImage.resizeMode.contain} />
                    </View>
                </TouchableOpacity>
            </View>
            <SearchModal 
                isVisible={isSearchVisible} 
                onClose={() => setIsSearchVisible(false)} 
                originLayout={searchLayout}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        backgroundColor: 'transparent',
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    innerAvatar: {
        width: 22,
        height: 22,
        borderRadius: 11,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        gap: 8,
    },
    iconButton: {
        padding: 2,
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -8,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 2,
    }
});
