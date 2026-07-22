import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';

interface PercentBarProps {
  percent: number;
  color: string;
  onPercentChange?: (percent: number) => void;
  points?: number[];
  formatLabel?: (val: number) => string;
  min?: number;
  max?: number;
}

export const PercentBar = ({ 
  percent = 0, 
  color = '#06C168', 
  onPercentChange,
  points = [0, 25, 50, 75, 100],
  formatLabel = (val) => `${val}%`,
  min = 0,
  max = 100
}: PercentBarProps) => {
  const { colors } = useTheme();

  const fillPercentage = ((percent - min) / (max - min)) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: colors.darkGrey }]}>
        <View style={[styles.fill, { backgroundColor: color, width: `${Math.max(0, Math.min(100, fillPercentage))}%` }]} />
      </View>
      <View style={styles.dots}>
        {points.map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.dot,
              { backgroundColor: p <= percent ? color : colors.grey }
            ]}
            onPress={() => onPercentChange && onPercentChange(p)}
          />
        ))}
      </View>
      <View style={styles.labels}>
        {points.map((p) => (
          <Typography key={p} size={10} style={{ color: p <= percent ? color : colors.grey }}>
            {formatLabel(p)}
          </Typography>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 5,
  },
  track: {
    height: 2,
    width: '100%',
    position: 'absolute',
    top: 3,
  },
  fill: {
    height: '100%',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
