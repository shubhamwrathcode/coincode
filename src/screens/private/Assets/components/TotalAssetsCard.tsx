import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Eye, EyeOff } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';

interface TotalAssetsCardProps {
  title?: string;
  btcAmount?: string;
  usdAmount?: string;
  pnlAmount?: string;
  pnlPercentage?: string;
  imageSource: any;
  topRightBadge?: React.ReactNode;
}

export const TotalAssetsCard = ({
  title = 'Total Assets',
  btcAmount = '0.00',
  usdAmount = '0.00',
  pnlAmount = '0.00',
  pnlPercentage = '0.00%',
  imageSource,
  topRightBadge,
}: TotalAssetsCardProps) => {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <LinearGradient
      colors={['rgba(0, 255, 255, 0.08)', '#141518', '#141518']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 0.8 }}
      style={[styles.card, { borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 }]}
    >
      {topRightBadge && (
        <View style={styles.topRightBadgeContainer}>
          {topRightBadge}
        </View>
      )}
      <View style={styles.cardContent}>
        <Typography size={14} style={{ color: colors.grey, marginBottom: 8 }}>
          {title}
        </Typography>

        <View style={styles.balanceRow}>
          <Typography size={28} style={{ fontFamily: fonts.semiBold, marginRight: 10 }}>
            {isVisible ? btcAmount : '******'}
          </Typography>
          <Typography size={16} style={{ fontFamily: fonts.semiBold, color: colors.grey, marginRight: 10 }}>
            BTC
          </Typography>
          <TouchableOpacity onPress={toggleVisibility} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            {isVisible ? <Eye color={colors.grey} size={18} /> : <EyeOff color={colors.grey} size={18} />}
          </TouchableOpacity>
        </View>

        <Typography size={14} style={{ color: colors.grey, marginBottom: 15 }}>
          ≈ ${isVisible ? usdAmount : '******'} USD
        </Typography>

        <View style={styles.pnlRow}>
          <Typography size={13} style={{ color: colors.grey, marginRight: 8 }}>
            Today's PnL
          </Typography>
          <TouchableOpacity onPress={toggleVisibility} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={{ marginRight: 8 }}>
            {isVisible ? <Eye color={colors.grey} size={14} /> : <EyeOff color={colors.grey} size={14} />}
          </TouchableOpacity>
          <Typography size={13} style={{ fontFamily: fonts.semiBold, marginRight: 8 }}>
            ${isVisible ? pnlAmount : '******'}
          </Typography>
          <Typography size={13} style={{ fontFamily: fonts.semiBold, color: colors.green }}>
            {isVisible ? pnlPercentage : '******'}
          </Typography>
        </View>
      </View>

      <FastImage
        source={imageSource}
        style={styles.walletImage}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardContent: {
    zIndex: 2,
    width: '70%',
  },
  topRightBadgeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 3,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pnlRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletImage: {
    position: 'absolute',
    right: -40,
    bottom: -35,
    width: 220,
    height: 220,
    zIndex: 1,
  },
});
