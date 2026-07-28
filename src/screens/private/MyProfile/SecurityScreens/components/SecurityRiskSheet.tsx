import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { X, ChevronRight, Phone } from 'lucide-react-native';
import { CustomBottomSheet } from '../../../../../components/common/CustomBottomSheet';
import { Typography } from '../../../../../components/common/Typography';
import { useTheme } from '../../../../../theme/ThemeProvider';
import { fonts } from '../../../../../theme/fonts';
import { ImageAssets } from '../../../../../components/common/ImageAssets';

interface SecurityRiskSheetProps {
    sheetRef: any;
}

export const SecurityRiskSheet = ({ sheetRef }: SecurityRiskSheetProps) => {
    const { colors } = useTheme();
    const navigation = useNavigation<any>();

    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={550}
        >
            <View style={styles.container}>

                {/* Hero Graphic */}
                <View style={styles.heroContainer}>
                    <FastImage
                        source={ImageAssets.securityRiskIcon}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <Typography size={20} style={{ color: colors.white, fontFamily: fonts.bold }}>
                        Security Risk <Typography size={20} style={{ color: '#FF4C4C', fontFamily: fonts.bold }}>Warning</Typography>
                    </Typography>
                    <Typography size={13} style={{ color: colors.grey, fontFamily: fonts.regular, textAlign: 'center', marginTop: 12, lineHeight: 20, paddingHorizontal: 20 }}>
                        To enhance your account security, please activate at least one additional verification method.
                    </Typography>
                </View>

                {/* Options Container */}
                <View style={styles.optionsContainer}>
                    {/* Option 1: Google Authenticator */}
                    <TouchableOpacity style={styles.optionCard} activeOpacity={0.8}>
                        <View style={styles.iconWrapper}>
                            <FastImage source={ImageAssets.googleIcon} style={{ width: 22, height: 22 }} resizeMode="contain" />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Google Authenticator
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Secure your account with time-based verification codes.
                            </Typography>
                        </View>
                        <ChevronRight color={colors.grey} size={18} />
                    </TouchableOpacity>

                    {/* Option 2: Phone Number */}
                    <TouchableOpacity
                        style={styles.optionCard}
                        activeOpacity={0.8}
                        onPress={() => {
                            sheetRef.current?.close();
                            setTimeout(() => {
                                navigation.navigate('AddPhoneScreen');
                            }, 300);
                        }}
                    >
                        <View style={styles.iconWrapper}>
                            <Phone color={colors.cyan} size={20} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold, marginBottom: 4 }}>
                                Phone Number
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, lineHeight: 16 }}>
                                Verify your identity using SMS verification code.
                            </Typography>
                        </View>
                        <ChevronRight color={colors.grey} size={18} />
                    </TouchableOpacity>
                </View>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },

    heroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -10,
    },
    heroImage: {
        width: 280,
        height: 200,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    optionsContainer: {
        gap: 10,
    },
    optionCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    optionTextContainer: {
        flex: 1,
        paddingRight: 16,
    },
});
