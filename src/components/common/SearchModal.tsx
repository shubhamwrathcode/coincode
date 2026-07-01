import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, X, ChevronLeft, Star, TrendingUp } from 'lucide-react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    FadeInUp,
    interpolate,
    Extrapolation,
    Easing,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import Svg, { Polyline, Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import { FlashList } from '@shopify/flash-list';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SearchModalProps {
    isVisible: boolean;
    onClose: () => void;
    originLayout?: { x: number; y: number; width: number; height: number };
}

const springConfig = {
    damping: 18,
    stiffness: 120,
    mass: 0.8,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
};

const TOP_SEARCHES = [
    { id: '1', name: 'Bitcoin', symbol: 'BTC', price: '$43,114.57', isUp: true, icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029' },
    { id: '2', name: 'Ethereum', symbol: 'ETH', price: '$43,114.57', isUp: true, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029' },
    { id: '3', name: 'Tether', symbol: 'USDT', price: '$1.000', isUp: false, icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=029' },
    { id: '4', name: 'BNB', symbol: 'BNB', price: '$1.000', isUp: false, icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029' },
    { id: '5', name: 'Cardano', symbol: 'ADA', price: '$43,114.57', isUp: true, icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png?v=029' },
    { id: '6', name: 'Dogecoin', symbol: 'DOGE', price: '$1.000', isUp: false, icon: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=029' },
    { id: '7', name: 'Shiba Inu', symbol: 'SHIB', price: '$43,114.57', isUp: true, icon: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=029' },
    { id: '8', name: 'Solana', symbol: 'SOL', price: '$1.000', isUp: false, icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=029' },
    { id: '9', name: 'USD COIN', symbol: 'USDC', price: '$43,114.57', isUp: true, icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029' },
];

const Sparkline = ({ isUp, color }: { isUp: boolean; color: string }) => {
    const points = isUp
        ? "0,20 10,15 20,18 30,5 40,10 50,2"
        : "0,5 10,10 20,7 30,20 40,15 50,22";

    // Close the path for the filled polygon shadow (bottom right to bottom left)
    const polygonPoints = `${points} 50,25 0,25`;
    const gradientId = `grad_${isUp ? 'up' : 'down'}`;

    return (
        <Svg height="25" width="50" viewBox="0 0 50 25">
            <Defs>
                <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={color} stopOpacity="0.4" />
                    <Stop offset="1" stopColor={color} stopOpacity="0" />
                </LinearGradient>
            </Defs>
            <Polygon
                points={polygonPoints}
                fill={`url(#${gradientId})`}
            />
            <Polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export const SearchModal = ({ isVisible, onClose, originLayout }: SearchModalProps) => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<TextInput>(null);
    const [isRendered, setIsRendered] = useState(false);

    const progress = useSharedValue(0);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const handleCloseComplete = () => {
        setIsRendered(false);
    };

    useEffect(() => {
        if (isVisible) {
            setIsRendered(true);
            progress.value = withSpring(1, springConfig, (finished) => {
                if (finished) {
                    runOnJS(focusInput)();
                }
            });
        } else {
            setSearchQuery('');
            inputRef.current?.blur();
            progress.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.cubic) }, (finished) => {
                if (finished) {
                    runOnJS(handleCloseComplete)();
                }
            });
        }
    }, [isVisible]);

    const handleClose = () => {
        onClose();
    };

    const layout = originLayout || { x: 0, y: 0, width: SCREEN_WIDTH, height: 40 };

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            top: interpolate(progress.value, [0, 1], [layout.y, 0], Extrapolation.CLAMP),
            left: interpolate(progress.value, [0, 1], [layout.x, 0], Extrapolation.CLAMP),
            width: interpolate(progress.value, [0, 1], [layout.width, SCREEN_WIDTH], Extrapolation.CLAMP),
            height: interpolate(progress.value, [0, 1], [layout.height, SCREEN_HEIGHT], Extrapolation.CLAMP),
            borderRadius: interpolate(progress.value, [0, 1], [20, 0], Extrapolation.CLAMP),
            backgroundColor: colors.black,
        };
    });

    const animatedContentStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(progress.value, [0.6, 1], [0, 1], Extrapolation.CLAMP),
            paddingTop: Math.max(insets.top, 20) + 10,
        };
    });

    const animatedBackdropStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
        };
    });

    if (!isRendered) return null;

    return (
        <Modal
            visible={isRendered}
            animationType="none"
            transparent={true}
            onRequestClose={handleClose}
        >
            <Animated.View style={[StyleSheet.absoluteFill, animatedBackdropStyle]}>
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="dark"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="rgba(0,0,0,0.8)"
                />
            </Animated.View>

            <Animated.View style={[styles.absoluteContainer, animatedContainerStyle]}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <Animated.View style={[styles.header, animatedContentStyle]}>
                        <TouchableOpacity onPress={handleClose} style={[styles.iconBtn, { borderColor: 'rgba(255,255,255,0.1)' }]}>
                            <ChevronLeft color={colors.white} size={22} />
                        </TouchableOpacity>

                        <View style={[styles.searchContainer, { backgroundColor: '#1C1C1E', borderColor: 'rgba(255,255,255,0.1)' }]}>
                            <Search color={colors.grey} size={18} />
                            <TextInput
                                ref={inputRef}
                                style={[styles.input, { color: colors.white, fontFamily: fonts.medium }]}
                                placeholder="Search for market"
                                placeholderTextColor={colors.grey}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
                                    <X color={colors.grey} size={16} />
                                </TouchableOpacity>
                            )}
                        </View>

                        <TouchableOpacity style={[styles.iconBtn, { borderColor: 'rgba(255,255,255,0.1)' }]}>
                            <Star color={colors.grey} size={20} />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Content */}
                    {isVisible && (
                        <Animated.View style={[styles.content, { flex: 1 }]} entering={FadeInUp.delay(100).springify()}>
                            <View style={styles.titleRow}>
                                <View>
                                    <Typography color={colors.white} size={15} style={{ fontFamily: fonts.bold }}>
                                        Top Searches
                                    </Typography>
                                    <Typography color={colors.darkShadeColorText} size={12} style={{ fontFamily: fonts.regular, marginTop: 2 }}>
                                        Explore the most searched crypto
                                    </Typography>
                                </View>
                                <TouchableOpacity style={[styles.trendBtn, { backgroundColor: '#1C1C1E', borderColor: 'rgba(255,255,255,0.1)' }]}>
                                    <TrendingUp color={colors.cyan} size={16} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1 }}>
                                <FlashList
                                    data={TOP_SEARCHES}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                    keyboardDismissMode="on-drag"
                                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
                                    renderItem={({ item: coin, index }) => (
                                        <Animated.View entering={FadeInUp.delay(200 + (index * 40)).springify()}>
                                            <TouchableOpacity style={[styles.coinRow, { backgroundColor: '#131315', borderColor: 'rgba(255,255,255,0.1)' }]}>
                                                <View style={styles.coinLeft}>
                                                    <FastImage source={{ uri: coin.icon }} style={styles.coinIcon} />
                                                    <View>
                                                        <Typography color={colors.white} size={14} style={{ fontFamily: fonts.semiBold }}>
                                                            {coin.name}
                                                        </Typography>
                                                        <Typography color={colors.darkShadeColorText} size={11} style={{ fontFamily: fonts.medium, marginTop: 2 }}>
                                                            {coin.symbol}
                                                        </Typography>
                                                    </View>
                                                </View>
                                                <View style={styles.coinRight}>
                                                    <Typography color={colors.white} size={13} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                                        {coin.price}
                                                    </Typography>
                                                    <Sparkline isUp={coin.isUp} color={coin.isUp ? '#22C55E' : '#EF4444'} />
                                                </View>
                                            </TouchableOpacity>
                                        </Animated.View>
                                    )}
                                />
                            </View>
                        </Animated.View>
                    )}
                </KeyboardAvoidingView>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    absoluteContainer: {
        position: 'absolute',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 10,
        gap: 12,
    },
    iconBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 42,
        borderRadius: 21,
        paddingHorizontal: 16,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 8,
        fontSize: 15,
        paddingVertical: 0,
    },
    content: {
        paddingTop: 10,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    trendBtn: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    coinRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
    },
    coinLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    coinIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    coinRight: {
        alignItems: 'flex-end',
    }
});
