import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MarketScreen } from '../../screens/private/MarketScreen';
import { LoginScreen } from '../../screens/public/LoginScreen';
import { useTheme } from '../../theme/ThemeProvider';
import { View } from 'react-native';
import { Typography } from '../../components/common/Typography';
import { useAuthStore } from '../../store/authStore';
import { Dimensions, TouchableOpacity, StyleSheet, Animated as RNAnimated, Easing } from 'react-native';
import { Home, List, TrendingUp, CreditCard, User } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

const getIcon = (routeName: string, color: string, size: number) => {
  switch (routeName) {
    case 'Market': return <Home color={color} size={size} />;
    case 'Trade': return <List color={color} size={size} />;
    case 'Futures': return <TrendingUp color={color} size={size} />;
    case 'Wallet': return <CreditCard color={color} size={size} />;
    case 'Profile': return <User color={color} size={size} />;
    default: return <Home color={color} size={size} />;
  }
};

const TabItem = ({ isFocused, routeName, onPress, onLongPress }: any) => {
  const { colors } = useTheme();

  // Use standard React Native Animated
  const activeVal = React.useRef(new RNAnimated.Value(isFocused ? 1 : 0)).current;

  React.useEffect(() => {
    RNAnimated.timing(activeVal, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), // smooth ease-in-out
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const animatedWidth = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: [45, 125], // increased active tab width
  });

  const animatedColor = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(10,168,197,0)', 'rgba(10,168,197,0.15)'],
  });

  const textOpacity = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const textWidth = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 75], // slightly wider text container
  });

  const textMargin = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.touchable}>
      <RNAnimated.View style={[styles.pill, { width: animatedWidth, backgroundColor: animatedColor }]}>
        {getIcon(routeName, isFocused ? colors.cyan : colors.grey, 20)}
        <RNAnimated.Text style={[{ color: colors.cyan, fontWeight: '600', overflow: 'hidden' }, { opacity: textOpacity, width: textWidth, marginLeft: textMargin }]} numberOfLines={1}>
          {routeName}
        </RNAnimated.Text>
      </RNAnimated.View>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, { backgroundColor: colors.black, shadowColor: colors.black }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              isFocused={isFocused}
              routeName={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Typography size={24} style={{ fontWeight: '700' }}>{title}</Typography>
  </View>
);

const MainTabs = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'shift',
      }}
    >
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Trade">
        {() => <PlaceholderScreen title="Trade" />}
      </Tab.Screen>
      <Tab.Screen name="Futures">
        {() => <PlaceholderScreen title="Futures" />}
      </Tab.Screen>
      <Tab.Screen name="Wallet">
        {() => <PlaceholderScreen title="Wallet" />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <PlaceholderScreen title="Profile" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const { colors } = useTheme();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const navigationTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.black,
      card: colors.darkGrey,
      text: colors.white,
      border: colors.darkGrey,
      primary: colors.cyan,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 32,
    width: width - 20, // Less gap on the sides of the screen
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8, // Push icons towards the edges for more gap in between
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 22,
  },
});

