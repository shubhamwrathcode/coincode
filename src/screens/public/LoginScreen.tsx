import React, { useRef, useState } from 'react';
import { View, Animated, Easing, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Typography } from '../../components/common/Typography';
import { Screen } from '../../components/common/Screen';
import { useTheme } from '../../theme/ThemeProvider';
import { CommonButton } from '../../components/common/CommonButton';
import { CommonInput } from '../../components/common/CommonInput';
import { PhoneInput } from '../../components/common/PhoneInput';
import { useAuthStore } from '../../store/authStore';
import { fonts } from '../../theme/fonts';
import { CustomAuthTab } from '../../components/common/CustomAuthTab';
import { EyeOff, Eye, ArrowRight } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../components/common/ImageAssets';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const login = useAuthStore((state) => state.login);
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        login();
        resolve(true);
      }, 2000);
    });
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Header Icons */}
        <View style={styles.headerContainer}>
          <FastImage
            source={ImageAssets.authUserImg}
            style={styles.headerIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
          <FastImage
            source={ImageAssets.authBellImg}
            style={styles.headerIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        {/* Welcome Section & Image */}
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeTextContainer}>
            <Typography size={26} style={styles.welcomeTitle}>Welcome Back</Typography>
            <Typography color={colors.darkShadeColorText} size={15} style={styles.welcomeSubtitle}>
              {` Log in to continue your \n journey`}
            </Typography>
          </View>
          <View style={styles.promoImageContainer}>
            <FastImage
              source={ImageAssets.loginPromoImg}
              style={styles.promoImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>

        {/* Custom Tabs */}
        <CustomAuthTab
          tabs={[
            { id: 'email', label: 'Email' },
            { id: 'phone', label: 'Phone' },
          ]}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as 'email' | 'phone')}
        />

        {/* Form Elements */}
        <View style={styles.formContainer}>
          {activeTab === 'email' ? (
            <CommonInput
              placeholder="Enter email address"
              autoCapitalize="none"
            />
          ) : (
            <PhoneInput
              placeholder="Enter Phone number"
            />
          )}

          <CommonInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye color={colors.darkShadeColorText} size={20} />
                ) : (
                  <EyeOff color={colors.darkShadeColorText} size={20} />
                )}
              </TouchableOpacity>
            }
          />

          <View style={styles.buttonWrapper}>
            <CommonButton
              title="Next"
              onPress={handleLogin} shrinkOnLoad
              rightIcon={<View style={styles.nextIconWrapper}><ArrowRight color={colors.white} size={14} /></View>}
              style={{
                marginTop: 8,
              }}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { backgroundColor: colors.inputBorderColor }]} />
            <Typography color={colors.grey} style={styles.dividerText}>Or</Typography>
            <View style={[styles.dividerLine, { backgroundColor: colors.inputBorderColor }]} />
          </View>

          {/* Social Buttons */}
          <CommonButton
            title="Continue with Google"
            variant="outline"
            leftIcon={
              <FastImage
                source={ImageAssets.googleIcon}
                style={styles.socialIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            }
            titleStyle={styles.socialButtonTitle}
            style={[styles.socialButton]}
          />
          <CommonButton
            title="Continue with Passkey"
            variant="outline"
            leftIcon={
              <FastImage
                source={ImageAssets.passkeyIcon}
                style={styles.socialIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            }
            titleStyle={styles.socialButtonTitle}
            style={[styles.socialButton]}
          />

          <TouchableOpacity style={styles.footerLinkContainer} onPress={() => {
            navigation.navigate('Signup')
          }}>
            <Typography color={colors.cyan} style={styles.footerLinkText} size={14}>
              Create a Coincode Account
            </Typography>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },
  headerIcon: {
    width: 38,
    height: 38,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
    marginTop: 10,
  },
  welcomeTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  welcomeTitle: {
    fontFamily: fonts.bold,
    marginBottom: 8,
    lineHeight: 30,
  },
  welcomeSubtitle: {
    lineHeight: 18,
  },
  promoImageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImage: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginRight: 10,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  nextIconWrapper: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialButtonTitle: {
    fontFamily: fonts.medium,
    color: '#D1D5DC',
  },
  socialButton: {
    backgroundColor: colors.inputBgColor, borderColor: colors.inputBorderColor, marginBottom: 15
  },
  footerLinkContainer: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  footerLinkText: {
    fontFamily: fonts.medium,
    textDecorationLine: 'underline',
  },
});
