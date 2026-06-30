import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';

interface CommonOtpInputProps {
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
  containerStyle?: ViewStyle;
  autoFocus?: boolean;
}

export const CommonOtpInput: React.FC<CommonOtpInputProps> = ({ onTextChange, onFilled, containerStyle, autoFocus = false }) => {
  const { colors } = useTheme();

  return (
    <OtpInput
      numberOfDigits={6}
      focusColor={colors.cyan}
      autoFocus={autoFocus}
      hideStick={true}
      blurOnFilled={true}
      disabled={false}
      type="numeric"
      secureTextEntry={false}
      onTextChange={onTextChange}
      onFilled={onFilled}
      textInputProps={{
        accessibilityLabel: "One-Time Password",
      }}
      theme={{
        containerStyle: StyleSheet.flatten([styles.container, containerStyle]),
        pinCodeContainerStyle: StyleSheet.flatten([styles.pinCodeContainer, { backgroundColor: colors.inputBgColor, borderColor: colors.inputBorderColor }]),
        pinCodeTextStyle: StyleSheet.flatten([styles.pinCodeText, { color: colors.white }]),
        focusedPinCodeContainerStyle: StyleSheet.flatten([styles.activePinCodeContainer, { borderColor: colors.cyan }]),
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pinCodeContainer: {
    width: 48,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
  },
  activePinCodeContainer: {
    borderWidth: 1.5,
  },
  pinCodeText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },
});
