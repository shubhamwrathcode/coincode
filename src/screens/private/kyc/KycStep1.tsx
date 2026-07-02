import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, LayoutChangeEvent, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, X, ChevronDown, Shield, ArrowRight, Check } from 'lucide-react-native';
import CountryPicker, { Country, CountryCode, DARK_THEME } from 'react-native-country-picker-modal';
import { CommonInput } from '../../../components/common/CommonInput';
import { KycProgressBar } from '../../../components/common/KycProgressBar';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { CommonButton } from '../../../components/common/CommonButton';
import { Screen } from '../../../components/common/Screen';
import Svg, { Rect } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { useTheme } from '../../../theme/ThemeProvider';

const AnimatedRect = Animated.createAnimatedComponent(Rect);


interface MethodCardProps {
    title: string;
    subtitle: string;
    icon: any;
    isSelected: boolean;
    onPress: () => void;
    colors: any;
}

const MethodCard = ({ title, subtitle, icon, isSelected, onPress, colors }: MethodCardProps) => {
    const progress = useSharedValue(isSelected ? 1 : 0);
    const [cardSize, setCardSize] = useState({ width: 340, height: 72 });
    useEffect(() => {
        progress.value = withTiming(isSelected ? 1 : 0, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease)
        });
    }, [isSelected]);

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setCardSize({ width, height });
    };

    const FIXED_TOTAL_LENGTH = 1000;

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: FIXED_TOTAL_LENGTH - (progress.value * FIXED_TOTAL_LENGTH)
        };
    });

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ marginTop: 10 }} onLayout={onLayout}>
            <View style={[styles.methodCard, { backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.12)' : '#111214' }]}>
                <View style={[
                    styles.methodIconWrapper,
                    isSelected ? { borderWidth: 1, borderColor: colors.cyan } : { borderWidth: 0 }
                ]}>
                    <FastImage
                        source={icon}
                        style={{ width: 22, height: 22 }}
                        resizeMode={FastImage.resizeMode.contain}
                        tintColor={isSelected ? colors.cyan : colors.grey}
                    />
                </View>
                <View style={styles.methodText}>
                    <Typography color={colors.white} size={15} style={{ fontFamily: fonts.semiBold }}>
                        {title}
                    </Typography>
                    <Typography color={colors.darkShadeColorText} size={12} style={{ fontFamily: fonts.medium, marginTop: 2 }}>
                        {subtitle}
                    </Typography>
                </View>
                {isSelected ? (
                    <View style={[styles.radioActive, { backgroundColor: colors.cyan }]}>
                        <Check color={colors.black} size={14} strokeWidth={3} />
                    </View>
                ) : (
                    <View style={styles.radioInactive} />
                )}
            </View>
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <Svg width={cardSize.width || 0} height={cardSize.height || 0}>
                    <AnimatedRect
                        x={1.5}
                        y={1.5}
                        width={Math.max(0, cardSize.width - 3)}
                        height={Math.max(0, cardSize.height - 3)}
                        rx={11}
                        ry={11}
                        stroke={colors.cyan}
                        strokeWidth={1.5}
                        fill="none"
                        strokeDasharray={`${FIXED_TOTAL_LENGTH} ${FIXED_TOTAL_LENGTH}`}
                        animatedProps={animatedProps}
                    />
                </Svg>
            </View>
        </TouchableOpacity>
    );
};

const KycStep1 = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState('pan_card');

    // Country Picker State
    const [countryCode, setCountryCode] = useState<CountryCode>('IN');
    const [countryName, setCountryName] = useState('India');
    const [flagEmoji, setFlagEmoji] = useState('🇮🇳');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);

    const onSelectCountry = (country: Country) => {
        setCountryCode(country.cca2);
        setCountryName(typeof country.name === 'string' ? country.name : (country.name as any)?.en || 'Unknown');
        if (country.flag) {
            setFlagEmoji(country.flag);
        }
        setIsCountryPickerVisible(false);
    };

    return (
        <Screen>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.mainScroll} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                        <ChevronLeft color={colors.white} size={20} />
                    </TouchableOpacity>

                    <KycProgressBar currentStep={1} totalSteps={4} />

                    <View></View>
                </View>

                <View style={styles.scrollContent}>
                    {/* Title */}
                    <Typography color={colors.white} size={22} style={{ fontFamily: fonts.semiBold, marginBottom: 4 }}>
                        Personal Particulars
                    </Typography>
                    <Typography color={colors.darkShadeColorText} size={13} style={{ fontFamily: fonts.medium, marginBottom: 20 }}>
                        Step 1 of 3
                    </Typography>

                    {/* Country Selection */}
                    <Typography color={colors.darkShadeColorText} size={13} style={{ fontFamily: fonts.semiBold, marginBottom: 8 }}>
                        Country / Region
                    </Typography>
                    <TouchableOpacity style={styles.countryBtn} activeOpacity={0.7} onPress={() => setIsCountryPickerVisible(true)}>
                        <View style={styles.countryLeft}>
                            <View style={styles.flagContainer}>
                                <FastImage
                                    source={{ uri: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` }}
                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                            <Typography color={colors.white} size={15} style={{ fontFamily: fonts.semiBold }}>
                                {countryName}
                            </Typography>
                        </View>
                        <ChevronDown color={colors.grey} size={20} />
                    </TouchableOpacity>

                    {/* Country Picker Modal */}
                    <Modal visible={isCountryPickerVisible} animationType="slide" transparent={false} onRequestClose={() => setIsCountryPickerVisible(false)}>
                        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }} edges={['top', 'bottom']}>
                            <CountryPicker
                                withModal={false}
                                onClose={() => setIsCountryPickerVisible(false)}
                                onSelect={onSelectCountry}
                                withFilter
                                withFlag
                                withEmoji
                                countryCode={countryCode}
                                theme={{
                                    backgroundColor: colors.black,
                                    onBackgroundTextColor: colors.white,
                                    fontFamily: fonts.regular,
                                    filterPlaceholderTextColor: colors.grey,
                                    primaryColorVariant: colors.darkGrey,
                                }}
                            />
                        </SafeAreaView>
                    </Modal>

                    {/* Verification Methods */}
                    <View style={styles.methodHeader}>
                        <Shield color={colors.cyan} size={16} strokeWidth={2.5} />
                        <Typography color={colors.white} size={15} style={{ fontFamily: fonts.bold, marginLeft: 8 }}>
                            How would you like to get verified?
                        </Typography>
                    </View>
                    <Typography color={colors.darkShadeColorText} size={12} style={{ fontFamily: fonts.medium, marginBottom: 16, lineHeight: 18 }}>
                        Choose your preferred method to complete your verification quickly and securely.
                    </Typography>

                    <MethodCard
                        title="PAN Card"
                        subtitle="Verify using your PAN card"
                        icon={ImageAssets.IDCardIcon}
                        isSelected={selectedMethod === 'pan_card'}
                        onPress={() => setSelectedMethod('pan_card')}
                        colors={colors}
                    />

                    <MethodCard
                        title="ID Card"
                        subtitle="Verify using your ID card"
                        icon={ImageAssets.IDCardIcon}
                        isSelected={selectedMethod === 'id_card'}
                        onPress={() => setSelectedMethod('id_card')}
                        colors={colors}
                    />

                    <MethodCard
                        title="Passport"
                        subtitle="Verify using your passport"
                        icon={ImageAssets.PassportIcon}
                        isSelected={selectedMethod === 'passport'}
                        onPress={() => setSelectedMethod('passport')}
                        colors={colors}
                    />

                    <MethodCard
                        title="Driver's Licence"
                        subtitle="Verify using your driver's licence"
                        icon={ImageAssets.LicenceIcon}
                        isSelected={selectedMethod === 'drivers_licence'}
                        onPress={() => setSelectedMethod('drivers_licence')}
                        colors={colors}
                    />
                </View>

                <View style={styles.footer}>
                    <CommonButton
                        title="Next"
                        onPress={() => (navigation as any).navigate('KycStep2', { documentType: selectedMethod })}
                        style={{ width: '100%' }}
                        rightIcon={<View style={styles.nextIconWrapper}><ArrowRight color={colors.white} size={14} /></View>}
                    />
                </View>
            </ScrollView>
        </Screen>
    );
};

export default KycStep1;

const styles = StyleSheet.create({
    mainScroll: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
    },
    headerBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    countryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#111214',
        borderWidth: 1,
        borderColor: '#252525',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 24,
    },
    countryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: '#1C1C1E',
    },
    methodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#252525',
        borderRadius: 12,
        padding: 14,
    },
    methodIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    methodText: {
        flex: 1,
    },
    radioActive: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInactive: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#202023',
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 20,
        backgroundColor: '#08090B',
    },
    nextIconWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 4,
    },
});

