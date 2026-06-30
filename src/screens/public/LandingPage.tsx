import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Animated, LayoutChangeEvent } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../components/common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { Search, User } from 'lucide-react-native';
import { CommonButton } from '../../components/common/CommonButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/RootNavigator';
import FastImage from 'react-native-fast-image';
import { fonts } from '../../theme/fonts';
import { ImageAssets } from '../../components/common/ImageAssets';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

// Mock Data
const MOCK_CRYPTO_DATA = [
    { id: '1', symbol: 'BTCUSDT', name: 'Bitcoin', price: '71,726.6', priceUsd: '$71,726.6', change: '+0.68%', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    { id: '2', symbol: 'ETHUSDT', name: 'Ethereum', price: '2,192.38', priceUsd: '$2,192.38', change: '+0.68%', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { id: '3', symbol: 'SOLUSDT', name: 'Solana', price: '83.37', priceUsd: '$83.37', change: '+0.68%', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
    { id: '4', symbol: 'XAUUSDT', name: 'Gold', price: '4,752.50', priceUsd: '$4,752.50', change: '+0.68%', icon: 'https://cryptologos.cc/logos/tether-gold-xaut-logo.png' },
    { id: '5', symbol: 'DOGEUSDT', name: 'DogeCoin', price: '0.09239', priceUsd: '$0.09239', change: '+0.68%', icon: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
];

const MAIN_TABS = ['Favorites', 'Hot', 'New', 'Gainers', 'Losers'];
const SUB_TABS = ['Spot', 'Futures', 'TradFi 🔥', 'Alpha'];

const LandingPage = () => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [activeMainTab, setActiveMainTab] = useState('Favorites');
    const [activeSubTab, setActiveSubTab] = useState('Futures');

    const [mainTabMeasurements, setMainTabMeasurements] = useState<{ [key: string]: { x: number, width: number } }>({});
    const indicatorPosition = useRef(new Animated.Value(0)).current;
    const indicatorWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const activeMeasurement = mainTabMeasurements[activeMainTab];
        if (activeMeasurement) {
            // Make the underline 50% of the tab's width
            const targetWidth = activeMeasurement.width * 0.5;
            // Center it under the tab
            const targetX = activeMeasurement.x + (activeMeasurement.width - targetWidth) / 2;

            Animated.parallel([
                Animated.spring(indicatorPosition, {
                    toValue: targetX,
                    useNativeDriver: false,
                    friction: 8,
                    tension: 50,
                }),
                Animated.spring(indicatorWidth, {
                    toValue: targetWidth,
                    useNativeDriver: false,
                    friction: 8,
                    tension: 50,
                }),
            ]).start();
        }
    }, [activeMainTab, mainTabMeasurements]);

    const getDisplayedData = () => {
        switch (activeMainTab) {
            case 'Favorites':
                return MOCK_CRYPTO_DATA;
            case 'Hot':
                return [MOCK_CRYPTO_DATA[0], MOCK_CRYPTO_DATA[1], MOCK_CRYPTO_DATA[2]];
            case 'New':
                return [MOCK_CRYPTO_DATA[3], MOCK_CRYPTO_DATA[4], MOCK_CRYPTO_DATA[0]];
            case 'Gainers':
                return [MOCK_CRYPTO_DATA[2], MOCK_CRYPTO_DATA[4]];
            case 'Losers':
                return [MOCK_CRYPTO_DATA[1], MOCK_CRYPTO_DATA[3]];
            default:
                return MOCK_CRYPTO_DATA;
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={[styles.avatar, { backgroundColor: colors.darkGrey }]}>
                <User color={colors.grey} size={20} />
            </View>
            <View style={[styles.searchContainer, { backgroundColor: '#161719' }]}>
                <Search color={colors.grey} size={18} />
                <Typography color={colors.grey} size={14} style={{ marginLeft: 8 }}>
                    WLD/USDT
                </Typography>
            </View>
        </View>
    );

    const renderBanner = () => (
        <View style={[styles.banner, {
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: '#111214',
            marginBottom: 16,
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
                <Typography color={colors.cyan} size={12} style={{ fontFamily: fonts.medium }}>Trade 400+</Typography>
                <Typography color={colors.white} size={28} style={{ fontFamily: fonts.bold, marginTop: 8 }}>Global</Typography>
                <Typography color={colors.cyan} size={28} style={{ fontFamily: fonts.bold }}>Assets</Typography>
                <Typography color={colors.darkShadeColorText} size={12} style={{ marginTop: 5, lineHeight: 18 }}>
                    Buy, sell and explore top{'\n'}crypto assets worldwide.
                </Typography>
                <CommonButton
                    title="Log In to Trade"
                    onPress={() => navigation.navigate('Login')}
                    style={{ width: 140, height: 40, marginTop: 12, }}
                    titleStyle={{ fontSize: 13, }}
                />
            </View>
            <FastImage source={ImageAssets.landingpagedemo}
                style={{ width: 195, height: 250, position: "absolute", right: 0, bottom: -35 }}
                resizeMode={FastImage.resizeMode.contain} />
        </View>
    );

    const renderTabs = () => (
        <View style={[styles.tabsWrapper, { backgroundColor: colors.black }]}>
            {/* Main Tabs */}
            <View style={[styles.mainTabsRow, { position: 'relative' }]}>
                {MAIN_TABS.map(tab => {
                    const isActive = activeMainTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveMainTab(tab)}
                            style={styles.mainTabItem}
                            onLayout={(e: LayoutChangeEvent) => {
                                const { x, width } = e.nativeEvent.layout;
                                setMainTabMeasurements(prev => ({ ...prev, [tab]: { x, width } }));
                            }}
                        >
                            <Typography color={isActive ? colors.white : colors.darkShadeColorText} size={15} style={{ fontFamily: isActive ? fonts.semiBold : fonts.medium }}>
                                {tab}
                            </Typography>
                        </TouchableOpacity>
                    );
                })}

                {Object.keys(mainTabMeasurements).length > 0 && (
                    <Animated.View style={[
                        styles.activeUnderline,
                        {
                            backgroundColor: colors.cyan,
                            width: indicatorWidth,
                            transform: [{ translateX: indicatorPosition }]
                        }
                    ]} />
                )}
            </View>

            {/* Sub Tabs */}
            <View style={styles.subTabsRow}>
                {SUB_TABS.map((tab, index) => {
                    const isActive = activeSubTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveSubTab(tab)}
                            style={[
                                styles.subTabItem,
                                isActive ? { backgroundColor: 'rgba(10, 168, 197, 0.15)' } : { backgroundColor: 'transparent' },
                            ]}
                        >
                            <Typography color={isActive ? colors.cyan : colors.darkShadeColorText} size={14} style={{ fontFamily: fonts.medium }}>
                                {tab}
                            </Typography>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    const renderCryptoItem = ({ item }: any) => (
        <View key={item.id} style={styles.cryptoRow}>
            <View style={styles.cryptoLeft}>
                <FastImage source={{ uri: item.icon }} style={styles.cryptoIcon} resizeMode="contain" />
                <View>
                    <Typography color={colors.white} size={15} style={{ fontFamily: fonts.bold, marginBottom: 2 }}>{item.symbol}</Typography>
                    <Typography color={colors.darkShadeColorText} size={13} style={{ fontFamily: fonts.medium }}>{item.name}</Typography>
                </View>
            </View>
            <View style={styles.cryptoMiddle}>
                <Typography color={colors.white} size={15} style={{ fontFamily: fonts.bold, marginBottom: 2 }}>{item.price}</Typography>
                <Typography color={colors.darkShadeColorText} size={13} style={{ fontFamily: fonts.medium }}>{item.priceUsd}</Typography>
            </View>
            <View style={styles.cryptoRight}>
                <View style={[styles.changeButton, { backgroundColor: '#2BC287' }]}>
                    <Typography color={colors.white} size={12} style={{ fontFamily: fonts.bold }}>{item.change}</Typography>
                </View>
            </View>
        </View>
    );

    const renderFooter = () => (
        <TouchableOpacity style={styles.footerLink}>
            <Typography color={colors.cyan} size={14} style={{ fontFamily: fonts.medium, textDecorationLine: "underline" }}>View More</Typography>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.black }]}>
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {renderHeader()}
                    {renderBanner()}

                    <View style={styles.listCard}>
                        {renderTabs()}
                        {getDisplayedData().map(item => renderCryptoItem({ item }))}
                        {renderFooter()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default LandingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#000000',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 20,
        marginLeft: 16,
        paddingHorizontal: 16,
    },
    banner: {
        flexDirection: 'row',
        margin: 16,
        borderRadius: 20,
        padding: 20,
        minHeight: 200,
        overflow: 'hidden',
        backgroundColor: "#08090B"
    },
    bannerLeft: {
        flex: 1,
        zIndex: 2,
    },
    tabsWrapper: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    mainTabsRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    mainTabItem: {
        marginRight: 14,
        position: 'relative',
        paddingBottom: 8,
    },
    activeUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 3,
        borderRadius: 2,
    },
    subTabsRow: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 10
    },
    subTabItem: {
        paddingVertical: 6,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    cryptoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    cryptoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cryptoIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    cryptoMiddle: {
        alignItems: 'flex-end',
        paddingRight: 16,
    },
    cryptoRight: {
        width: 75,
        alignItems: 'flex-end',
    },
    changeButton: {
        paddingHorizontal: 0,
        paddingVertical: 5,
        borderRadius: 4,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerLink: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    listCard: {
        marginHorizontal: 16,
        borderWidth: 2,
        borderColor: colors.inputBorderColor,
        borderRadius: 20,
        overflow: 'hidden',
    }
});