import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';

interface PercentBarProps {
  percent: number;
  color: string;
  onPercentChange?: (percent: number) => void;
}

export const PercentBar = ({ percent = 0, color = '#06C168', onPercentChange }: PercentBarProps) => {
  const { colors } = useTheme();

  const percents = [0, 25, 50, 75, 100];

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: colors.darkGrey }]}>
        <View style={[styles.fill, { backgroundColor: color, width: `${percent}%` }]} />
      </View>
      <View style={styles.dots}>
        {percents.map((p) => (
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
        {percents.map((p) => (
          <Typography key={p} size={10} style={{ color: colors.grey }}>
            {p}%
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
