import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, X, ArrowRight, Upload } from 'lucide-react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Typography } from '../../../components/common/Typography';
import { fonts } from '../../../theme/fonts';
import { CommonButton } from '../../../components/common/CommonButton';
import { Screen } from '../../../components/common/Screen';
import { CommonInput } from '../../../components/common/CommonInput';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';
import { KycProgressBar } from '../../../components/common/KycProgressBar';

const KycStep2 = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const route = useRoute<any>();

    const documentType = route.params?.documentType || 'id_card';
    const docLabels: Record<string, string> = {
        pan_card: 'PAN Card',
        id_card: 'ID Card',
        passport: 'Passport',
        drivers_licence: "Driver's Licence"
    };

    const docName = docLabels[documentType] || 'Identity Document';
    const isPanCard = documentType === 'pan_card';

    return (
        <Screen>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.mainScroll} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                            <ChevronLeft color={colors.white} size={20} />
                        </TouchableOpacity>

                        <KycProgressBar currentStep={2} totalSteps={4} />
                        <View></View>
                    </View>

                    <View style={styles.scrollContent}>
                        {/* Main Graphic */}
                        <View style={styles.graphicContainer}>
                            <FastImage
                                source={ImageAssets.docCheckImg}
                                style={styles.mainImage}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>

                        {/* Title */}
                        <Typography color={colors.white} size={16} style={{ fontFamily: fonts.bold, marginBottom: 16, paddingHorizontal: 16 }}>
                            {docName}
                        </Typography>

                        {/* Form Card */}
                        <View style={styles.formCard}>
                            {/* Doc Input */}
                            <Typography color={colors.white} size={13} style={{ fontFamily: fonts.medium, marginBottom: 8 }}>
                                {docName} Number*
                            </Typography>
                            <CommonInput
                                placeholder={isPanCard ? 'XYZ' : 'Enter Number'}
                            />

                            {/* Re-enter Doc Input */}
                            <Typography color={colors.white} size={13} style={{ fontFamily: fonts.medium, marginBottom: 8 }}>
                                Re-Enter {docName} Number*
                            </Typography>
                            <CommonInput
                                placeholder={isPanCard ? 'XYZ' : 'Re-Enter Number'}
                            />

                            {/* Upload File */}
                            <Typography color={colors.white} size={13} style={{ fontFamily: fonts.medium, marginBottom: 4 }}>
                                Upload Item File
                            </Typography>
                            <Typography color={colors.grey} size={11} style={{ fontFamily: fonts.regular, marginBottom: 12 }}>
                                (Only JPEG, PNG & JPG formats and file size upto 5MB are supported)
                            </Typography>

                            {isPanCard ? (
                                <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
                                    <Upload color={colors.cyan} size={24} style={{ marginBottom: 8 }} />
                                    <Typography color={colors.grey} size={13} style={{ fontFamily: fonts.medium }}>
                                        Upload Image
                                    </Typography>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.uploadRow}>
                                    <TouchableOpacity style={styles.uploadBoxHalf} activeOpacity={0.7}>
                                        <Upload color={colors.cyan} size={24} style={{ marginBottom: 8 }} />
                                        <Typography color={colors.grey} size={13} style={{ fontFamily: fonts.medium }}>
                                            Front Side
                                        </Typography>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.uploadBoxHalf} activeOpacity={0.7}>
                                        <Upload color={colors.cyan} size={24} style={{ marginBottom: 8 }} />
                                        <Typography color={colors.grey} size={13} style={{ fontFamily: fonts.medium }}>
                                            Back Side
                                        </Typography>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <CommonButton
                            title="Next"
                            onPress={() => navigation.navigate('KycStep3' as never)}
                            style={{ width: '100%' }}
                            rightIcon={<View style={styles.nextIconWrapper}><ArrowRight color={colors.white} size={14} /></View>}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
};

export default KycStep2;

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
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressSegment: {
        height: 4,
        borderRadius: 2,
    },
    scrollContent: {
        paddingHorizontal: 12,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },
    graphicContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        width: '100%',
    },
    mainImage: {
        width: 260,
        height: 150,
    },
    formCard: {
        backgroundColor: 'transparent',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#1C1C1E',
    },

    uploadBox: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#06B6D4',
        borderStyle: 'dashed',
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    uploadBoxHalf: {
        flex: 1,
        height: 120,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#06B6D4',
        borderStyle: 'dashed',
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 20,
        backgroundColor: '#08090B',
        marginTop: 'auto',
    },
    nextIconWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 4,
    },
});
