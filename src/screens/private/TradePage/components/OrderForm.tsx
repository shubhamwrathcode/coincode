import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';
import { ChevronDown, Plus, Minus, PlusCircle } from 'lucide-react-native';
import { PercentBar } from './PercentBar';
import { ToggleSwitch } from './ToggleSwitch';

export const OrderForm = () => {
  const { colors } = useTheme();
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState('Limit');
  const [percent, setPercent] = useState(0);
  const [tpSl, setTpSl] = useState(false);

  const isBuy = side === 'BUY';
  const actionColor = isBuy ? colors.green : colors.red;

  const renderInputRow = (label: string, value: string, placeholder: string) => (
    <View style={styles.inputSection}>
      <Typography size={11} style={{ color: colors.grey, marginBottom: 4 }}>{label}</Typography>
      <View style={[styles.inputRow, { backgroundColor: '#161719' }]}>
        <TouchableOpacity style={styles.iconBtn}><Minus color={colors.grey} size={16} /></TouchableOpacity>
        <TextInput
          style={[styles.input, { color: colors.white, fontFamily: fonts.medium }]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          textAlign="center"
        />
        <TouchableOpacity style={styles.iconBtn}><Plus color={colors.grey} size={16} /></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.segmentControl}>
        <TouchableOpacity
          style={[styles.segmentBtn, isBuy && { backgroundColor: colors.green }]}
          onPress={() => setSide('BUY')}
        >
          <Typography size={14} style={{ fontFamily: fonts.semiBold, color: isBuy ? '#FFF' : colors.grey }}>Buy</Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentBtn, !isBuy && { backgroundColor: colors.red }]}
          onPress={() => setSide('SELL')}
        >
          <Typography size={14} style={{ fontFamily: fonts.semiBold, color: !isBuy ? '#FFF' : colors.grey }}>Sell</Typography>
        </TouchableOpacity>
      </View>

      {/* Available Balance */}
      <View style={styles.rowBetween}>
        <Typography size={12} style={{ color: colors.grey }}>Available</Typography>
        <View style={styles.row}>
          <Typography size={12} style={{ fontFamily: fonts.semiBold, marginRight: 4 }}>0 USDT</Typography>
          <PlusCircle color={colors.black} fill="#00C853" size={14} />
        </View>
      </View>

      {/* Order Type Dropdown */}
      <TouchableOpacity style={[styles.dropdown, { backgroundColor: '#161719' }]}>
        <Typography size={13}>{orderType}</Typography>
        <ChevronDown color={colors.grey} size={14} />
      </TouchableOpacity>

      {/* Inputs */}
      {renderInputRow('Price (USDT)', '58,694.0', 'Price')}
      {renderInputRow('Amount (BTC)', '', 'Amount')}

      {/* Percent Bar */}
      <PercentBar percent={percent} color={actionColor} onPercentChange={setPercent} />

      {renderInputRow('Total (BTC)', '', 'Total')}

      {/* TP/SL & Max */}
      <View style={[styles.rowBetween, { marginTop: 5 }]}>
        <Typography size={12} style={{ color: colors.grey }}>TP/SL</Typography>
        <ToggleSwitch value={tpSl} onValueChange={setTpSl} />
      </View>

      <View style={[styles.rowBetween, { marginTop: 5, marginBottom: 10 }]}>
        <Typography size={12} style={{ color: colors.grey }}>Max</Typography>
        <Typography size={12} style={{ fontFamily: fonts.semiBold }}>0 USDT</Typography>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: actionColor }]}>
        <Typography size={14} style={{ fontFamily: fonts.semiBold, color: '#FFF' }}>
          {isBuy ? 'Buy BTC' : 'Sell BTC'}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: '#161719',
    borderRadius: 20,
    marginBottom: 15,
    padding: 3,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 18,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputSection: {
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 36,
  },
  iconBtn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 12,
  },
  toggle: {
    width: 32,
    height: 18,
    borderRadius: 9,
  },
  actionBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});
