import React, { useRef, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import { Typography } from '../../components/common/Typography';
import { Screen } from '../../components/common/Screen';
import { useTheme } from '../../theme/ThemeProvider';
import { CommonButton } from '../../components/common/CommonButton';
import { CommonInput } from '../../components/common/CommonInput';
import { useAuthStore } from '../../store/authStore';
import { fonts } from '../../theme/fonts';

export const LoginScreen = () => {
  const { colors } = useTheme();
  const login = useAuthStore((state) => state.login);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const handleLogin = () => {
    setIsLoggingIn(true);

    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.55, 0.1, 0.55, 1),
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      login();
    }, 3000);
  };

  const buttonWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '15%'],
  });

  const buttonPadding = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  return (
    <Screen>
      <View style={{ padding: 24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography size={32} style={{ fontFamily: fonts.bold, marginBottom: 16 }}>Welcome to CoinCode</Typography>
        <Typography color={colors.grey} style={{ fontFamily: fonts.regular, marginBottom: 40, textAlign: 'center' }}>
          Your ultimate crypto trading companion. Login to continue.
        </Typography>

        <View style={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>
          <CommonInput
            placeholder="Enter your email/Username"
            autoCapitalize="none"
          />

          <CommonInput
            placeholder="Password"
            secureTextEntry
          />

          <CommonButton
            title="Login to Account"
            onPress={handleLogin}
            loading={isLoggingIn}
            style={{
              width: buttonWidth,
              marginTop: 16,
              paddingHorizontal: buttonPadding,
            }}
          />
        </View>
      </View>
    </Screen>
  );
};
