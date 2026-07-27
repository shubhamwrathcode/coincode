import React, { memo, useCallback, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, PanResponder, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Search, Bell, MoreHorizontal, Star, Activity, X, ChevronRight, Box, CheckCircle2, Clock } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { CustomBottomSheet } from '../../../components/common/CustomBottomSheet';

const { height } = Dimensions.get('window');

const TRENDING_COINS = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', price: '$62,342.11', isUp: true, color: '#F7931A' },
  { id: '2', name: 'Cardano', symbol: 'ADA', price: '$0.45', isUp: true, color: '#0033AD' },
  { id: '3', name: 'Dogecoin', symbol: 'DOGE', price: '$0.12', isUp: true, color: '#C2A633' },
  { id: '4', name: 'Ethereum', symbol: 'ETH', price: '$3,412.45', isUp: false, color: '#627EEA' },
  { id: '5', name: 'Fantom', symbol: 'FTM', price: '$0.65', isUp: false, color: '#13B5EC' },
  { id: '6', name: 'Litecoin', symbol: 'LTC', price: '$71.20', isUp: true, color: '#345D9D' },
  { id: '7', name: 'Polygon', symbol: 'MATIC', price: '$0.55', isUp: false, color: '#8247E5' },
  { id: '8', name: 'Polkadot', symbol: 'DOT', price: '$6.20', isUp: true, color: '#E6007A' },
  { id: '9', name: 'Shiba Inu', symbol: 'SHIB', price: '$0.00000017', isUp: false, color: '#E42C21' },
  { id: '10', name: 'Solana', symbol: 'SOL', price: '$152.35', isUp: false, color: '#9945FF' },
  { id: '11', name: 'Tether', symbol: 'USDT', price: '$1.00', isUp: true, color: '#26A17B' },
  { id: '12', name: 'Uniswap', symbol: 'UNI', price: '$9.45', isUp: true, color: '#FF007A' },
  { id: '13', name: 'USD Coin', symbol: 'USDC', price: '$1.00', isUp: false, color: '#2775CA' },
  { id: '14', name: 'XRP', symbol: 'XRP', price: '$0.48', isUp: false, color: '#23292F' },
];

const NETWORKS = [
  { id: '1', name: 'BSC', fullname: 'BNB Smart Chain - BEP20', block: '1 Block', minDeposit: '> 0.01 USDT', arrival: '~ 1 Minute', color: '#F3BA2F' },
  { id: '2', name: 'TRX', fullname: 'Tron - TRC20', block: '1 Block', minDeposit: '> 0.01 USDT', arrival: '~ 1 Minute', color: '#FF0013' },
  { id: '3', name: 'APT', fullname: 'Aptos', block: '1 Block', minDeposit: '> 0.01 USDT', arrival: '~ 1 Minute', color: '#111111' },
  { id: '4', name: 'ETH', fullname: 'Ethereum - ERC20', block: '1 Block', minDeposit: '> 0.01 USDT', arrival: '~ 1 Minute', color: '#627EEA' },
];

const ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];

const CoinItemComponent = memo(({ coin, renderCoinLogo, colors, onPress }: any) => (
  <TouchableOpacity style={styles.coinItem} onPress={onPress}>
    <View style={styles.coinLeft}>
      {renderCoinLogo(coin.symbol, coin.color)}
      <View style={styles.coinInfo}>
        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
          {coin.name}
        </Typography>
        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>
          {coin.symbol}
        </Typography>
      </View>
    </View>

    <View style={styles.coinMiddle}>
      <Activity color={coin.isUp ? colors.green : colors.red} size={24} strokeWidth={1.5} />
    </View>

    <View style={styles.coinRight}>
      <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginRight: 12 }}>
        {coin.price}
      </Typography>
      <Star color={colors.grey} size={14} />
    </View>
  </TouchableOpacity>
));

export const SelectCoinScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const action = (route.params as any)?.action;
  const flatListRef = useRef<FlatList>(null);
  const containerMetrics = useRef({ top: 0, height: 0 });
  const alphabetContainerRef = useRef<View>(null);
  const sheetRef = useRef<any>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const openSheet = useCallback(() => {
    sheetRef.current?.open();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const firstItem = viewableItems[0].item;
      if (firstItem && firstItem.name) {
        setActiveLetter(firstItem.name[0].toUpperCase());
      }
    }
  }).current;

  const measureContainer = useCallback(() => {
    alphabetContainerRef.current?.measure((x, y, w, h, px, py) => {
      containerMetrics.current = { top: py, height: h };
    });
  }, []);

  const handleAlphabetScroll = useCallback((pageY: number) => {
    const { top, height } = containerMetrics.current;
    if (height === 0 || top === 0) return;

    const yRelative = pageY - top;
    const letterHeight = height / ALPHABETS.length;
    let index = Math.floor(yRelative / letterHeight);

    if (index < 0) index = 0;
    if (index >= ALPHABETS.length) index = ALPHABETS.length - 1;

    const letter = ALPHABETS[index];
    setActiveLetter(letter);

    const targetIndex = TRENDING_COINS.findIndex(c => c.name.toUpperCase().startsWith(letter));
    if (targetIndex !== -1 && flatListRef.current) {
      try {
        flatListRef.current.scrollToIndex({ index: targetIndex, animated: false, viewPosition: 0 });
      } catch (e) {
        // Ignore if out of bounds
      }
    }
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt) => handleAlphabetScroll(evt.nativeEvent.pageY),
      onPanResponderMove: (evt) => handleAlphabetScroll(evt.nativeEvent.pageY),
    })
  ).current;

  const renderCoinLogo = useCallback((symbol: string, color: string) => {
    return (
      <View style={[styles.coinLogo, { backgroundColor: color }]}>
        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>
          {symbol[0]}
        </Typography>
      </View>
    );
  }, [colors]);

  const renderItem = useCallback(({ item }: any) => (
    <CoinItemComponent coin={item} renderCoinLogo={renderCoinLogo} colors={colors} onPress={openSheet} />
  ), [colors, renderCoinLogo, openSheet]);

  const renderHeader = () => (
    <View style={{ paddingBottom: 8 }}>
      {/* Recent Section */}
      <View style={styles.sectionHeader}>
        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
          Recent
        </Typography>
        <TouchableOpacity>
          <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
            Clear All
          </Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.recentRow}>
        {/* USDT Recent Tag */}
        <TouchableOpacity style={[styles.recentTag, { borderColor: 'rgba(0, 255, 127, 0.4)' }]}>
          <LinearGradient
            colors={['rgba(0, 255, 127, 0.15)', 'rgba(0, 0, 0, 0)']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          {renderCoinLogo('USDT', '#26A17B')}
          <View style={styles.recentTextWrapper}>
            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>USDT</Typography>
            <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>Tether</Typography>
          </View>
          <TouchableOpacity style={{ padding: 4, marginLeft: 4 }}>
            <X color={colors.grey} size={14} />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* BTC Recent Tag */}
        <TouchableOpacity style={[styles.recentTag, { borderColor: 'rgba(247, 147, 26, 0.4)' }]}>
          <LinearGradient
            colors={['rgba(247, 147, 26, 0.15)', 'rgba(0, 0, 0, 0)']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          {renderCoinLogo('BTC', '#F7931A')}
          <View style={styles.recentTextWrapper}>
            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>BTC</Typography>
            <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>Bitcoin</Typography>
          </View>
          <TouchableOpacity style={{ padding: 4, marginLeft: 4 }}>
            <X color={colors.grey} size={14} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Trending Coins Section */}
      <View style={[styles.sectionHeader, { marginTop: 20, paddingRight: 24 }]}>
        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
          Trending Coins
        </Typography>
        <TouchableOpacity>
          <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium }}>
            View All
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconBtn, { marginLeft: 0 }]}>
          <FastImage source={ImageAssets.backButtonImg} style={{ width: 35, height: 35 }} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Search color={colors.white} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell color={colors.white} size={20} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Typography size={23} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
          Select Coins
        </Typography>
        <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
          Choose from your favourite coins
        </Typography>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputWrapper}>
          <Search color={colors.grey} size={18} style={{ marginLeft: 12, marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: colors.white, fontFamily: fonts.regular }]}
            placeholder="Search for market"
            placeholderTextColor={colors.grey}
          />
        </View>
        <TouchableOpacity style={styles.moreBtn}>
          <MoreHorizontal color={colors.white} size={18} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={TRENDING_COINS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.coinList}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
          }, 100);
        }}
      />

      {/* Alphabet Scroll */}
      <View
        ref={alphabetContainerRef}
        style={styles.alphabetColumn}
        onLayout={measureContainer}
        {...panResponder.panHandlers}
      >
        {ALPHABETS.map((letter) => {
          const isActive = activeLetter === letter;
          return (
            <View key={letter} style={styles.alphabetBtn} pointerEvents="none">
              <Typography size={10} style={{ color: isActive ? colors.cyan : colors.grey, fontFamily: fonts.semiBold }}>
                {letter}
              </Typography>
            </View>
          );
        })}
      </View>

      <CustomBottomSheet sheetRef={sheetRef} height={height * 0.8}>
        <View style={styles.sheetHeader}>
          <View>
            <Typography size={20} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
              Choose Network
            </Typography>
            <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
              Select a network to continue
            </Typography>
          </View>

        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          {NETWORKS.map((net) => (
            <TouchableOpacity 
              key={net.id} 
              style={styles.networkCard}
              onPress={() => {
                sheetRef.current?.close();
                if (action === 'withdrawal') {
                  navigation.navigate('WithdrawalAddress' as never);
                } else {
                  navigation.navigate('DepositQrCode' as never);
                }
              }}
            >
              <View style={styles.networkCardTop}>
                {renderCoinLogo(net.name, net.color)}
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                    {net.name}
                  </Typography>
                  <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 2 }}>
                    {net.fullname}
                  </Typography>
                </View>
                <View style={styles.networkChevron}>
                  <ChevronRight color={colors.grey} size={16} />
                </View>
              </View>

              <View style={styles.networkCardBottom}>
                <View style={styles.networkInfoItem}>
                  <View style={styles.iconCircle}>
                    <FastImage source={ImageAssets.blockIcon} resizeMode='contain' style={{ width: 12, height: 12 }} />
                  </View>
                  <View style={{ marginLeft: 6 }}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>Block</Typography>
                    <Typography size={12} style={{ color: colors.white, fontFamily: fonts.medium }}>{net.block}</Typography>
                  </View>
                </View>
                <View style={styles.networkInfoItem}>
                  <View style={styles.iconCircle}>
                    <FastImage source={ImageAssets.minDepositIcon} resizeMode='contain' style={{ width: 12, height: 12 }} />
                  </View>
                  <View style={{ marginLeft: 6 }}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>Min. Deposit</Typography>
                    <Typography size={12} style={{ color: colors.white, fontFamily: fonts.medium }}>{net.minDeposit}</Typography>
                  </View>
                </View>
                <View style={styles.networkInfoItem}>
                  <View style={styles.iconCircle}>
                    <Clock color={colors.cyan} size={12} />
                  </View>
                  <View style={{ marginLeft: 6 }}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>Est. Arrival</Typography>
                    <Typography size={12} style={{ color: colors.white, fontFamily: fonts.medium }}>{net.arrival}</Typography>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CustomBottomSheet>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    padding: 4,
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3366',
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  moreBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  recentRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  recentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingRight: 4,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  coinLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTextWrapper: {
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'center',
  },
  coinList: {
    paddingRight: 24, // Space for alphabet scroll
  },
  coinItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  coinLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  coinInfo: {
    marginLeft: 12,
  },
  coinMiddle: {
    width: '25%',
    alignItems: 'center',
  },
  coinRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
    justifyContent: 'flex-end',
  },
  alphabetColumn: {
    position: 'absolute',
    right: 0,
    top: height * 0.35,
    bottom: 20,
    width: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  alphabetBtn: {
    paddingVertical: 2,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  networkCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  networkCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingBottom: 12,
    marginBottom: 12,
  },
  networkChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  networkCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  networkInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
