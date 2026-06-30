import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { Typography } from './Typography';
import { ChevronDown } from 'lucide-react-native';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

interface PhoneInputProps extends TextInputProps {
  containerStyle?: object;
  onCountryChange?: (countryCode: string, callingCode: string) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  style,
  containerStyle,
  onCountryChange,
  ...props
}) => {
  const { colors } = useTheme();
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState<string>('91');
  const [flag, setFlag] = useState<string>('🇮🇳');
  const [visible, setVisible] = useState<boolean>(false);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    if (country.flag) {
      setFlag(country.flag);
    }
    if (onCountryChange) {
      onCountryChange(country.cca2, country.callingCode[0]);
    }
    setVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.inputBgColor, borderColor: colors.inputBorderColor, borderWidth: 1 }, containerStyle]}>
      {/* Country Code Section */}
      <TouchableOpacity
        style={styles.countryCodeContainer}
        onPress={() => setVisible(true)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.flagContainer}>
            <FastImage
              source={{ uri: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` }}
              style={{ width: 20, height: 20, borderRadius: 10 }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <Typography color={colors.white} style={styles.countryCodeText}>
            +{callingCode}
          </Typography>
          <ChevronDown color={colors.white} size={16} />
        </View>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={() => setVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.inputBgColor }} edges={['top', 'bottom']}>
          <CountryPicker
            withModal={false}
            onClose={() => setVisible(false)}
            onSelect={onSelect}
            withCallingCode
            withFilter
            withFlag
            withEmoji
            countryCode={countryCode}
            theme={{
              backgroundColor: colors.inputBgColor,
              onBackgroundTextColor: colors.white,
              fontFamily: fonts.regular,
              filterPlaceholderTextColor: colors.grey,
              primaryColorVariant: colors.darkGrey,
            }}
          />
        </SafeAreaView>
      </Modal>

      {/* Vertical Divider */}
      <View style={[styles.divider, { backgroundColor: colors.inputBorderColor }]} />

      {/* Input Section */}
      <TextInput
        style={[
          styles.input,
          { color: colors.white, fontFamily: fonts.regular },
          style,
        ]}
        placeholderTextColor={colors.placeholderTextColor || colors.darkShadeColorText}
        keyboardType="phone-pad"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
  },
  flagContainer: {
    marginRight: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontFamily: fonts.medium,
    marginRight: 4,
    fontSize: 15,
  },
  divider: {
    width: 1,
    height: 24,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
    paddingRight: 16,
  },
});
