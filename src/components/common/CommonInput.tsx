import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';

interface CommonInputProps extends TextInputProps {
  containerStyle?: object;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const CommonInput: React.FC<CommonInputProps> = ({
  style,
  containerStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#08090B', }, containerStyle]}>
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <TextInput
        style={[
          styles.input,
          { color: colors.white, fontFamily: fonts.regular },
          style,
        ]}
        placeholderTextColor={colors.placeholderTextColor || colors.darkShadeColorText}
        {...props}
      />
      {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#151619',
    borderWidth: 1
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  iconContainer: {
    paddingHorizontal: 4,
  },
});
