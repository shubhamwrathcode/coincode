import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';

interface CommonInputProps extends TextInputProps {
  containerStyle?: object;
}

export const CommonInput: React.FC<CommonInputProps> = ({
  style,
  containerStyle,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.darkGrey }, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          { color: colors.white, fontFamily: fonts.regular },
          style,
        ]}
        placeholderTextColor={colors.grey}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
