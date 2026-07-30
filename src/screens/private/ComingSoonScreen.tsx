import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import LottieView from 'lottie-react-native';
import { Typography } from '../../components/common/Typography';
import { fonts } from '../../theme/fonts';
import { useTheme } from '../../theme/ThemeProvider';


const { width } = Dimensions.get('window');

export const ComingSoonScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ChevronLeft color={colors.white} size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <LottieView
                    source={require('../../assets/lottieIcon/comingSoon.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                />

                <Typography size={24} style={{ color: colors.cyan, fontFamily: fonts.bold, marginTop: 20 }}>
                    Coming Soon!
                </Typography>

                <Typography size={14} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 12, textAlign: 'center', paddingHorizontal: 40, lineHeight: 22 }}>
                    We're working hard to bring this feature to you. Stay tuned for updates!
                </Typography>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    lottie: {
        width: width * 0.7,
        height: width * 0.8,
        marginLeft: 50
    }
});
