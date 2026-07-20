import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';

export const TradeActionButtons = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Typography size={13} style={{ fontFamily: fonts.semiBold }}>Deposit</Typography>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Typography size={13} style={{ fontFamily: fonts.semiBold }}>Convert</Typography>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Typography size={13} style={{ fontFamily: fonts.semiBold }}>Transfer</Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
    gap: 10,
  },
  btn: {
    flex: 1,
    backgroundColor: '#161719',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
});
