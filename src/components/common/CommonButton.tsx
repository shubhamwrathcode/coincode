import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator, Animated, View, Easing } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Typography } from './Typography';
import { fonts } from '../../theme/fonts';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface CommonButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  loading?: boolean;
  shrinkOnLoad?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  titleStyle?: any;
  onPress?: (event: any) => void | Promise<any>;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  variant = 'primary',
  loading: externalLoading = false,
  shrinkOnLoad = false,
  style,
  disabled,
  leftIcon,
  rightIcon,
  titleStyle = {},
  onPress,
  ...props
}) => {
  const { colors } = useTheme();
  const animationValue = useRef(new Animated.Value(0)).current;
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = externalLoading || internalLoading;

  useEffect(() => {
    if (shrinkOnLoad) {
      Animated.timing(animationValue, {
        toValue: isLoading ? 1 : 0,
        duration: 500,
        easing: Easing.bezier(0.55, 0.1, 0.55, 1),
        useNativeDriver: false,
      }).start();
    }
  }, [isLoading, shrinkOnLoad]);

  const handlePress = async (e: any) => {
    if (!onPress) return;
    const result = onPress(e);
    if (result instanceof Promise) {
      try {
        setInternalLoading(true);
        await result;
      } finally {
        setInternalLoading(false);
      }
    }
  };

  const getBackgroundColor = () => {
    if (disabled) return colors.grey;
    switch (variant) {
      case 'primary': return colors.cyan;
      case 'secondary': return colors.darkGrey;
      case 'outline': return 'transparent';
      case 'danger': return colors.red;
      case 'success': return colors.cyan;
      default: return colors.cyan;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.grey;
    if (variant === 'primary') return colors.white;
    if (variant === 'secondary') return colors.white;
    if (variant === 'outline') return colors.white;
    return colors.white;
  };

  const animatedWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '15%'],
  });

  const animatedPadding = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  return (
    <AnimatedTouchableOpacity
      disabled={disabled || isLoading}
      onPress={handlePress}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        (variant === 'secondary' || variant === 'outline') && { borderWidth: 1, borderColor: colors.grey },
        shrinkOnLoad && { width: animatedWidth, paddingHorizontal: animatedPadding },
        style,
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {leftIcon && <View style={{ position: 'absolute', left: 16 }}>{leftIcon}</View>}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color={getTextColor()} align="center" style={{ fontFamily: fonts.semiBold, fontSize: 16, ...titleStyle }}>
              {title}
            </Typography>
            {rightIcon && <View style={{ marginLeft: 10 }}>{rightIcon}</View>}
          </View>
        </>
      )}
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 100,
    paddingHorizontal: 24,
  },
});
