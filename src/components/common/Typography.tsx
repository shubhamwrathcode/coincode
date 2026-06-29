import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

import { fonts } from '../../theme/fonts';

interface TypographyProps extends TextProps {
  color?: string;
  size?: number;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontFamily?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  color,
  size = 16,
  align = 'left',
  fontFamily = fonts.regular,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        { color: color || colors.white, textAlign: align, fontSize: size, fontFamily: fontFamily },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
