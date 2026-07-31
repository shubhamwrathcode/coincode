import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useToastStore } from '../../store/toastStore';
import { useTheme } from '../../theme/ThemeProvider';
import { CheckCircle, AlertCircle, Info } from 'lucide-react-native';
import { Typography } from './Typography';
import { fonts } from '../../theme/fonts';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from './ImageAssets';
import LottieView from 'lottie-react-native';

export const Toast = () => {
  const { visible, message, type, hideToast } = useToastStore();
  const { colors } = useTheme();

  // Animation values
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Slide out
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, hideToast, translateY, opacity]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return colors.green;
      case 'error': return colors.red;
      case 'info': return colors.cyan;
      default: return colors.cyan;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <LottieView
            source={require('../../assets/lottieIcon/successLottie.json')}
            autoPlay
            loop
            style={{ width: 35, height: 35 }}
          />
        );
      case 'error':
        return (
          <LottieView
            source={require('../../assets/lottieIcon/errorLottie.json')}
            autoPlay
            loop
            style={{ width: 30, height: 30 }}
          />
        );
      case 'info':
      default:
        return <FastImage source={ImageAssets.logo} style={{ width: 25, height: 25 }} resizeMode='contain' />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} pointerEvents="none">
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: '#08090B',
            opacity: opacity,
            transform: [{ translateY: translateY }],
            shadowColor: getBackgroundColor(),
          },
        ]}
      >
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        <Typography style={styles.messageText}>
          {message}
        </Typography>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    minWidth: '93%',
    maxWidth: '90%',
    elevation: 6,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#151619'
  },
  iconContainer: {
    marginRight: 12,
  },
  messageText: {
    color: '#FFFFFF',
    fontFamily: fonts.semiBold,
    fontSize: 14,
    flexShrink: 1,
  },
});
