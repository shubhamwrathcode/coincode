import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { Typography } from '../../../../components/common/Typography';
import { fonts } from '../../../../theme/fonts';

const TABS = ['Spot', 'Margin', 'Futures'];

const TabItem = ({ tab, isActive, onPress, colors }: any) => {
  const animValue = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const textColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.grey, colors.cyan],
  });

  const indicatorOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const indicatorScaleX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      <Animated.Text style={{ fontFamily: fonts.semiBold, color: textColor, fontSize: 16 }}>
        {tab}
      </Animated.Text>
      <Animated.View
        style={[
          styles.activeIndicator,
          {
            backgroundColor: colors.cyan,
            opacity: indicatorOpacity,
            transform: [{ scaleX: indicatorScaleX }]
          }
        ]}
      />
    </TouchableOpacity>
  );
};

export const TradeHeader = ({ onBack }: { onBack?: () => void }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('Spot');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <ChevronLeft color={colors.white} size={28} strokeWidth={2.5} />
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TabItem
            key={tab}
            tab={tab}
            isActive={activeTab === tab}
            onPress={() => setActiveTab(tab)}
            colors={colors}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  tabsContainer: {
    alignItems: 'center',
  },
  tabItem: {
    marginRight: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 25,
    alignSelf: 'center',
    height: 3,
    borderRadius: 2,
  },
});
