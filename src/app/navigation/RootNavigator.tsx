import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/public/LoginScreen';
import { useTheme } from '../../theme/ThemeProvider';
import { Platform, View } from 'react-native';
import { Typography } from '../../components/common/Typography';
import { useAuthStore } from '../../store/authStore';
import { Dimensions, TouchableOpacity, StyleSheet, Animated as RNAnimated, Easing } from 'react-native';
import { Home } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../components/common/ImageAssets';
import SignupScreen from '../../screens/public/SignupScreen';
import AuthOtpVerify from '../../screens/public/AuthOtpVerify';
import SetPasswordScreen from '../../screens/public/SetPasswordScreen';
import LandingPage from '../../screens/public/LandingPage';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import KycStep1 from '../../screens/private/kyc/KycStep1';
import KycStep2 from '../../screens/private/kyc/KycStep2';
import KycStep3 from '../../screens/private/kyc/KycStep3';
import KycStep4 from '../../screens/private/kyc/KycStep4';
import KycStatus from '../../screens/private/kyc/KycStatus';
import { MarketScreen } from '../../screens/private/Market/MarketScreen';
import { TradeScreen } from '../../screens/private/TradePage/TradeScreen';
import { AssetsScreen } from '../../screens/private/Assets/AssetsScreen';
import { EarnScreen } from '../../screens/private/Earn/EarnScreen';
import { StakingDetailsScreen } from '../../screens/private/Earn/StakingDetailsScreen';

const { width } = Dimensions.get('window');

const getIcon = (routeName: string, color: string, size: number) => {
  switch (routeName) {
    case 'Home': return <Home color={color} size={size} />;
    case 'Market': return <FastImage source={ImageAssets.MarketIcon} style={{ width: size, height: size }} tintColor={color} resizeMode="contain" />;
    case 'Trade': return <FastImage source={ImageAssets.TradeIcon} style={{ width: size, height: size }} tintColor={color} resizeMode="contain" />;
    case 'Earn': return <FastImage source={ImageAssets.EarnIcon} style={{ width: size, height: size }} tintColor={color} resizeMode="contain" />;
    case 'Assets': return <FastImage source={ImageAssets.AssetsIcon} style={{ width: size, height: size }} tintColor={color} resizeMode="contain" />;
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
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const animatedWidth = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: [45, 110],
  });

  const animatedColor = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.cyan],
  });

  const textOpacity = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const textWidth = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 52],
  });

  const textMargin = activeVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.touchable}>
      <RNAnimated.View style={[styles.pill, { width: animatedWidth, backgroundColor: animatedColor }]}>
        {getIcon(routeName, isFocused ? colors.white : colors.grey, 22)}
        <RNAnimated.Text style={[{ color: colors.white, fontFamily: fonts.semiBold, overflow: 'hidden' }, { opacity: textOpacity, width: textWidth, marginLeft: textMargin }]} numberOfLines={1}>
          {routeName}
        </RNAnimated.Text>
      </RNAnimated.View>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.outerContainer, {
      paddingBottom: insets.bottom ? 5 : 5,
    }]}>
      {Platform.OS === 'ios' && (
        <BlurView
          style={[StyleSheet.absoluteFill, { borderTopLeftRadius: 20, borderTopRightRadius: 20 }]}
          blurType="light"
          blurAmount={15}
          overlayColor="transparent"
          reducedTransparencyFallbackColor="transparent"
        />
      )}
      <View style={[StyleSheet.absoluteFill, {
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: colors.inputBorderColor,
        borderWidth: 1,
        borderBottomWidth: 0,
      }]} />

      <View style={styles.container}>
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

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  AuthOtpVerify: undefined;
  SetPassword: undefined;
  MainTabs: undefined;
  LandingPage: undefined;
  KycStep1: undefined;
  KycStep2: undefined;
  KycStep3: undefined;
  KycStep4: undefined;
  KycStatus: { status: 'SUCCESS' | 'PENDING' | 'FAILED' };
  StakingDetails: { product: any };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

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
      <Tab.Screen name="Home" component={LandingPage} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Trade" component={TradeScreen} />
      <Tab.Screen name="Earn">
        {() => <PlaceholderScreen title="Earn" />}
      </Tab.Screen>
      <Tab.Screen name="Assets" component={AssetsScreen} />
    </Tab.Navigator>
  );
};

const GuestTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'shift',
      }}
    >
      <Tab.Screen name="Home" component={LandingPage} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Trade" component={TradeScreen} />
      <Tab.Screen name="Earn" component={EarnScreen} />
      <Tab.Screen name="Assets" component={AssetsScreen} />
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
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="LandingPage" component={GuestTabs} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="AuthOtpVerify" component={AuthOtpVerify} />
            <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
            <Stack.Screen name="StakingDetails" component={StakingDetailsScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="KycStep1" component={KycStep1} />
            <Stack.Screen name="KycStep2" component={KycStep2} />
            <Stack.Screen name="KycStep3" component={KycStep3} />
            <Stack.Screen name="KycStep4" component={KycStep4} />
            <Stack.Screen name="KycStatus" component={KycStatus} />
            <Stack.Screen name="StakingDetails" component={StakingDetailsScreen} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
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

