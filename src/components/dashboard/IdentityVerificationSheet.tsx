import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { CustomBottomSheet } from '../common/CustomBottomSheet';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../common/ImageAssets';
import { CommonButton } from '../common/CommonButton';
import { Check, FileText, Clock, ArrowRight } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

interface IdentityVerificationSheetProps {
    sheetRef: any;
}
export const IdentityVerificationSheet = ({ sheetRef }: IdentityVerificationSheetProps) => {
    const { colors } = useTheme();
    const navigation = useNavigation()
    return (
        <CustomBottomSheet
            sheetRef={sheetRef}
            height={560}
            showCloseIcon={true}
        >
            <View style={styles.container}>
                {/* Image */}
                <FastImage
                    source={ImageAssets.verifyKycModalImg}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                />

                {/* Title and Subtitle */}
                <Typography color={colors.white} size={20} style={{ fontFamily: fonts.semiBold, textAlign: 'center', marginTop: 4 }}>
                    Verify your identity
                </Typography>
                <Typography color={colors.cyan} size={18} style={{ fontFamily: fonts.semiBold, textAlign: 'center', marginTop: 0 }}>
                    to start trading
                </Typography>

                {/* Stepper Indicator */}
                <View style={styles.stepperContainer}>
                    <View style={styles.lineLeft} />
                    <View style={[styles.dotSmall, { backgroundColor: colors.cyan }]} />
                    <View style={styles.dotLine} />
                    <View style={[styles.dotActive, { borderColor: colors.cyan }]}>
                        <Check color={colors.cyan} size={10} strokeWidth={3} />
                    </View>
                    <View style={styles.dotLine} />
                    <View style={[styles.dotSmall, { backgroundColor: colors.cyan }]} />
                    <View style={styles.lineRight} />
                </View>

                {/* Info Cards */}
                <View style={styles.cardsContainer}>
                    <View style={styles.infoCard}>
                        <View style={styles.iconCircle}>
                            <FileText color={colors.cyan} size={20} />
                        </View>
                        <View style={styles.cardText}>
                            <Typography color={colors.white} size={15} style={{ fontFamily: fonts.semiBold }}>
                                Complete the verification
                            </Typography>
                            <Typography color={colors.darkShadeColorText} size={12} style={{ fontFamily: fonts.medium, marginTop: 4 }}>
                                by following the steps
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.iconCircle}>
                            <Clock color={colors.cyan} size={20} />
                        </View>
                        <View style={styles.cardText}>
                            <Typography color={colors.white} size={15} style={{ fontFamily: fonts.semiBold }}>
                                It only takes a few minutes
                            </Typography>
                            <Typography color={colors.darkShadeColorText} size={12} style={{ fontFamily: fonts.medium, marginTop: 4 }}>
                                to complete your verification
                            </Typography>
                        </View>
                    </View>
                </View>

                {/* Actions */}
                <CommonButton
                    title="Verify Now"
                    onPress={() => {
                        sheetRef.current?.close();
                        navigation.navigate('KycStep1');
                    }}
                    style={styles.verifyBtn}
                    rightIcon={<View style={styles.nextIconWrapper}><ArrowRight color={colors.white} size={14} /></View>}
                />

                <TouchableOpacity
                    style={styles.laterBtn}
                    activeOpacity={0.7}
                    onPress={() => sheetRef.current?.close()}
                >
                    <Typography color={colors.grey} size={14} style={{ fontFamily: fonts.medium }}>
                        Maybe Later
                    </Typography>
                </TouchableOpacity>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    image: {
        width: 290,
        height: 120,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
        width: '100%',
    },
    lineLeft: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginRight: 10,
    },
    lineRight: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginLeft: 10,
    },
    dotLine: {
        width: 12,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 4,
    },
    dotSmall: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#1C1C1E',
    },
    dotActive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsContainer: {
        width: '100%',
        gap: 10,
        marginBottom: 16,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.searchBoxBorderColor,
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.borderColor,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardText: {
        flex: 1,
    },
    verifyBtn: {
        width: '100%',
        height: 52,
        borderRadius: 26,
    },
    arrowCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    laterBtn: {
        marginTop: 12,
        paddingVertical: 10,
    },
    nextIconWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 4,
    },
});
