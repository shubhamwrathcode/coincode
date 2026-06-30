import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, LayoutChangeEvent } from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';

export interface TabItem {
  id: string;
  label: string;
}

interface CustomAuthTabProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  containerStyle?: object;
}

interface TabMeasurement {
  x: number;
  width: number;
}

export const CustomAuthTab: React.FC<CustomAuthTabProps> = ({ tabs, activeTab, onTabChange, containerStyle }) => {
  const { colors } = useTheme();
  
  const [measurements, setMeasurements] = useState<{ [key: string]: TabMeasurement }>({});
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const activeMeasurement = measurements[activeTab];
    if (activeMeasurement) {
      Animated.parallel([
        Animated.spring(indicatorPosition, {
          toValue: activeMeasurement.x,
          useNativeDriver: false,
          friction: 8,
          tension: 50,
        }),
        Animated.spring(indicatorWidth, {
          toValue: activeMeasurement.width,
          useNativeDriver: false,
          friction: 8,
          tension: 50,
        }),
      ]).start();
    }
  }, [activeTab, measurements]);

  const onTabLayout = (id: string, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setMeasurements((prev) => ({
      ...prev,
      [id]: { x, width },
    }));
  };

  return (
    <View style={[styles.tabsContainer, { borderBottomColor: colors.inputBorderColor }, containerStyle]}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onLayout={(e) => onTabLayout(tab.id, e)}
            onPress={() => onTabChange(tab.id)}
            style={[
              styles.tabButton,
              index < tabs.length - 1 ? styles.tabButtonMargin : null,
            ]}
          >
            <Typography color={isActive ? colors.white : colors.darkShadeColorText} style={styles.tabText}>
              {tab.label}
            </Typography>
          </TouchableOpacity>
        );
      })}
      
      {/* Animated Sliding Indicator */}
      {Object.keys(measurements).length > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            {
              backgroundColor: colors.cyan,
              width: indicatorWidth,
              transform: [{ translateX: indicatorPosition }],
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    marginBottom: 24,
    position: 'relative',
  },
  tabButton: {
    paddingBottom: 12,
  },
  tabButtonMargin: {
    marginRight: 32,
  },
  tabText: {
    fontFamily: fonts.medium,
  },
  indicator: {
    position: 'absolute',
    bottom: -1,
    height: 2,
    left: 0,
    borderRadius: 1,
  }
});
