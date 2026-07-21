import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { CandlestickChart, LineChart } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../../components/common/ImageAssets';
import { MarketPairsSheet } from './MarketPairsSheet';

interface TradePairInfoProps {
  activeMode?: 'candles' | 'line';
  onModeChange?: (mode: 'candles' | 'line') => void;
}

export const TradePairInfo = ({ activeMode, onModeChange }: TradePairInfoProps) => {
  const { colors } = useTheme();
  const [internalActiveIcon, setInternalActiveIcon] = useState<'candles' | 'line'>('line');
  const [activePair, setActivePair] = useState('BTC/USDT');
  const sheetRef = useRef<any>(null);

  const activeIcon = activeMode !== undefined ? activeMode : internalActiveIcon;
  const setActiveIcon = onModeChange || setInternalActiveIcon;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.pairRow} onPress={() => sheetRef.current?.open()}>
          <Typography size={22} style={{ fontFamily: fonts.semiBold }}>{activePair}</Typography>
        </TouchableOpacity>
        <Typography size={12} style={{ color: colors.red, fontFamily: fonts.medium, marginTop: 4 }}>-1.05%</Typography>
      </View>

      <View style={styles.right}>
        <View style={styles.badgeContainer}>
          <View style={styles.mmBadge}>
            <Typography size={10} style={{ color: colors.green, fontFamily: fonts.medium }}>MM</Typography>
          </View>
          <Typography size={11} style={{ color: colors.green, fontFamily: fonts.medium, marginTop: 4 }}>0.00%</Typography>
        </View>

        <View style={styles.iconGroup}>
          <TouchableOpacity
            style={[styles.iconWrapper, activeIcon === 'candles' && styles.activeIconWrapper]}
            onPress={() => setActiveIcon('candles')}
          >
            <FastImage source={ImageAssets.candleIcon} style={{ width: 18, height: 18 }}
              resizeMode='contain' tintColor={activeIcon === 'candles' ? colors.white : colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconWrapper, activeIcon === 'line' && styles.activeIconWrapper]}
            onPress={() => setActiveIcon('line')}
          >
            <LineChart color={activeIcon === 'line' ? colors.white : colors.grey} size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <MarketPairsSheet 
        sheetRef={sheetRef} 
        onSelect={(pair) => setActivePair(`${pair}/USDT`)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  left: {
    justifyContent: 'center',
  },
  pairRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  mmBadge: {
    backgroundColor: '#002E15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  iconGroup: {
    flexDirection: 'row',
    backgroundColor: '#111214',
    borderRadius: 22,
    padding: 3,
  },
  iconWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconWrapper: {
    backgroundColor: '#35373F',
  }
});
