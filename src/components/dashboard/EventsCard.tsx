import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { ImageAssets } from '../common/ImageAssets';

const MOCK_EVENTS = [
    { id: '1', title: 'Connect Wallet & Unlock Crypto Trading', image: ImageAssets.event1 },
    { id: '2', title: 'Complete KYC & Get Bonus Rewards', image: ImageAssets.verifyIdentity },
    { id: '3', title: 'Deposit Crypto & Earn 10% APY', image: ImageAssets.landingpagedemo },
    { id: '4', title: 'Invite Friends & Share Prize Pool', image: ImageAssets.landingpagedemo },
    { id: '5', title: 'Trade Futures & Win BTC', image: ImageAssets.landingpagedemo },
    { id: '6', title: 'Exclusive Airdrop For New Users', image: ImageAssets.landingpagedemo },
];

const MULTIPLIER = 100;
const INFINITE_EVENTS = Array(MULTIPLIER).fill(MOCK_EVENTS).flat();
const START_INDEX = Math.floor(MULTIPLIER / 2) * MOCK_EVENTS.length;

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth;

export const EventsCard = () => {
    const { colors } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(START_INDEX);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                const nextIndex = prev + 1;
                if (nextIndex >= INFINITE_EVENTS.length) return prev;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const handleScrollEnd = (e: any) => {
        const newIndex = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
        setCurrentIndex(newIndex);
    };

    const getItemLayout = (_data: any, index: number) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
    });

    const renderItem = ({ item, index }: any) => {
        const realIndex = index % MOCK_EVENTS.length;
        return (
            <View style={{ width: screenWidth }}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <FastImage
                            source={item.image}
                            style={styles.image}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.headerRow}>
                            <Typography color={colors.cyan} size={12} style={{ fontFamily: fonts.semiBold }}>
                                Events
                            </Typography>
                            <View style={styles.badge}>
                                <Typography color={colors.white} size={10} style={{ fontFamily: fonts.medium }}>
                                    {realIndex + 1}/{MOCK_EVENTS.length}
                                </Typography>
                            </View>
                        </View>

                        <Typography color={colors.white} size={13} style={{ fontFamily: fonts.bold, marginTop: 8, lineHeight: 18, minHeight: 36 }}>
                            {item.title}
                        </Typography>

                        <View style={styles.footerRow}>
                            <View style={styles.pagination}>
                                {MOCK_EVENTS.map((_, dotIndex) => (
                                    <View
                                        key={dotIndex}
                                        style={[
                                            styles.dot,
                                            realIndex === dotIndex ? [styles.activeDot, { backgroundColor: colors.cyan }] : styles.inactiveDot
                                        ]}
                                    />
                                ))}
                            </View>

                            <TouchableOpacity style={[styles.joinButton, { borderColor: colors.cyan }]}>
                                <Typography color={colors.cyan} size={11} style={{ fontFamily: fonts.semiBold }}>
                                    Join Now
                                </Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View >
            <FlatList
                ref={flatListRef}
                data={INFINITE_EVENTS}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
                initialScrollIndex={START_INDEX}
                getItemLayout={getItemLayout}
                onScrollBeginDrag={() => { }}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        backgroundColor: '#0F1012',
        borderRadius: 20,
        marginHorizontal: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    imageContainer: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#1E2024',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        height: 6,
        borderRadius: 3,
    },
    activeDot: {
        width: 18,
    },
    inactiveDot: {
        width: 6,
        backgroundColor: '#2A2C31',
    },
    joinButton: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
});
