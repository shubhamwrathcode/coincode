import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../components/common/Typography';
import { Screen } from '../../components/common/Screen';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';

export const MarketScreen = () => {
  const { colors } = useTheme();

  return (
    <Screen>
      <View style={{ padding: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography size={32} fontFamily={fonts.bold}>Market</Typography>
        <Typography color={colors.grey} fontFamily={fonts.medium}>Real-time data will appear here</Typography>
      </View>
    </Screen>
  );
};
