import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Typography } from './Typography';
import { fonts } from '../../theme/fonts';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface CommonButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  loading?: boolean;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  style,
  disabled,
  ...props
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.grey;
    switch (variant) {
      case 'primary': return colors.cyan;
      case 'secondary': return colors.darkGrey;
      case 'danger': return colors.red;
      case 'success': return colors.cyan;
      default: return colors.cyan;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.grey;
    if (variant === 'primary') return colors.white;
    if (variant === 'secondary') return colors.white;
    return colors.white;
  };

  return (
    <AnimatedTouchableOpacity
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'secondary' && { borderWidth: 1, borderColor: colors.grey },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Typography color={getTextColor()} align="center" style={{ fontFamily: fonts.regular, fontSize: 16 }}>
          {title}
        </Typography>
      )}
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48, // Reduced height
    borderRadius: 100,
    paddingHorizontal: 24,
  },
});
