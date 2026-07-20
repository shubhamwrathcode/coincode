import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
}

export const ToggleSwitch = ({ value, onValueChange }: ToggleSwitchProps) => {
  const { colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 16],
  });

  const backgroundColor = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.darkGrey, colors.cyan],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onValueChange(!value)}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 32,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
  },
  thumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
