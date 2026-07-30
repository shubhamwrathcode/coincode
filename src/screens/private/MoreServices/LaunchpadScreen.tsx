import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Filter, Users, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import { CommonButton } from '../../../components/common/CommonButton';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../../../components/common/ImageAssets';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const { width } = Dimensions.get('window');

const completeProjects = [
    { id: '1', title: 'KDK', icon: 'K', color: '#6A5ACD', price: '1 KDK = 0.35 USDT', participants: '5,412', end: '2025-12-21 08:00' },
    { id: '2', title: 'IMU', icon: 'I', color: '#1E90FF', price: '1 IMU = 0.01177 USDT', participants: '1', end: '2026-01-21 08:00' },
];

const faqs = [
    { question: 'What is Coincode Launchpad?', answer: 'Coincode Launchpad is a platform for token sales and exclusive rewards.' },
    { question: 'What tokens can I use to subscribe?', answer: 'You can use USDT, BTC, and other supported crypto assets.' },
    { question: 'Will my funds be locked after subscribing?', answer: 'Yes, your funds will be temporarily locked during the subscription period.' },
    { question: 'What tokens can I use to subscribe? ', answer: 'You can use USDT, BTC, and other supported crypto assets.' },
    { question: 'Will my funds be locked after subscribing? ', answer: 'Yes, your funds will be temporarily locked during the subscription period.' },
];

export const LaunchpadScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.black }]}>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>

                {/* Header Absolute */}
                <View style={[styles.headerAbsolute, { top: Math.max(insets.top, 10) }]}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft color={colors.white} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Filter color={colors.white} size={18} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.bannerContainer}>
                        <View
                        />

                        <View style={styles.bannerTextContainer}>
                            <Typography size={24} style={{ color: colors.white, fontFamily: fonts.bold, textAlign: 'center' }}>
                                Launchpad
                            </Typography>
                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, textAlign: 'center', marginTop: 8, paddingHorizontal: 40, lineHeight: 18 }}>
                                Participate in token sales, support innovative projects and earn exclusive rewards.
                            </Typography>

                            <View style={styles.bannerStatsRow}>
                                <View style={styles.bannerStatItem}>
                                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>$2.6B</Typography>
                                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>Total Raised</Typography>
                                </View>
                                <View style={styles.bannerStatItem}>
                                    <Typography size={18} style={{ color: colors.white, fontFamily: fonts.bold }}>110.09K</Typography>
                                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>Total Participants</Typography>
                                </View>
                            </View>
                        </View>

                        {/* Rocket Image space */}
                        <View style={{ height: 250, width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <FastImage
                                source={ImageAssets.launchpadBanner}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    {/* Overview */}
                    <View style={styles.section}>
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold, marginBottom: 16 }}>
                            Overview
                        </Typography>
                        <View style={styles.overviewRow}>
                            <View style={[styles.overviewCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }]}>
                                <View style={[styles.overviewIconBox, { backgroundColor: 'rgba(0,194,255,0.1)' }]}>
                                    <HelpCircle color={colors.cyan} size={16} />
                                </View>
                                <View>
                                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Total Allocated</Typography>
                                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>$2.56B</Typography>
                                </View>
                            </View>
                            <View style={[styles.overviewCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }]}>
                                <View style={[styles.overviewIconBox, { backgroundColor: 'rgba(0,194,255,0.1)' }]}>
                                    <Users color={colors.cyan} size={16} />
                                </View>
                                <View>
                                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Total Participants</Typography>
                                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>110.09K</Typography>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Complete Projects */}
                    <View style={[styles.section, { marginTop: 20 }]}>
                        <View style={styles.sectionHeader}>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold }}>Complete Projects</Typography>
                            <TouchableOpacity onPress={() => (navigation.navigate as any)('CompletedProjectsScreen')}>
                                <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium }}>View All &gt;</Typography>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
                            {completeProjects.map(proj => (
                                <View key={proj.id} style={[styles.projectCard, { borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }]}>
                                    <View style={[styles.projectLogo, { backgroundColor: proj.color }]}>
                                        <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>{proj.icon}</Typography>
                                    </View>
                                    <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold, marginTop: 12 }}>{proj.title}</Typography>

                                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 16 }}>Subscription Price</Typography>
                                    <Typography size={11} style={{ color: colors.white, fontFamily: fonts.semiBold, marginTop: 4 }}>{proj.price}</Typography>

                                    <View style={styles.projectStatRow}>
                                        <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>Participants</Typography>
                                        <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>{proj.participants}</Typography>
                                    </View>
                                    <View style={styles.projectStatRow}>
                                        <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular }}>End Time</Typography>
                                        <Typography size={10} style={{ color: colors.white, fontFamily: fonts.medium }}>{proj.end}</Typography>
                                    </View>

                                    <CommonButton title="View Details" onPress={() => (navigation.navigate as any)('ProjectDetailScreen')} style={{ marginTop: 20, }} />
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* FAQ */}
                    <View style={[styles.section, { marginTop: 20, paddingBottom: 60 }]}>
                        <View style={[styles.faqCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }]}>
                            <Typography size={16} style={{ color: colors.white, fontFamily: fonts.bold, marginBottom: 8, paddingHorizontal: 16, paddingTop: 16 }}>FAQ</Typography>

                            {faqs.map((faq, idx) => (
                                <View key={idx} style={[styles.faqItem, { borderBottomColor: idx === faqs.length - 1 ? 'transparent' : 'rgba(255,255,255,0.05)' }]}>
                                    <TouchableOpacity style={styles.faqHeader} onPress={() => toggleFaq(idx)}>
                                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium, flex: 1, lineHeight: 18 }}>{faq.question}</Typography>
                                        {expandedFaq === idx ? (
                                            <ChevronUp color={colors.grey} size={16} />
                                        ) : (
                                            <ChevronDown color={colors.grey} size={16} />
                                        )}
                                    </TouchableOpacity>
                                    {expandedFaq === idx && (
                                        <Typography size={11} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 12, lineHeight: 16 }}>
                                            {faq.answer}
                                        </Typography>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerAbsolute: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    bannerContainer: {
        width: '100%',
        paddingTop: 30,
        position: 'relative',
        minHeight: 20,
    },
    bannerTextContainer: {
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
    },
    bannerStatsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    bannerStatItem: {
        alignItems: 'center',
        marginHorizontal: 16,
    },
    section: {
        paddingHorizontal: 16,
    },
    overviewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    overviewCard: {
        width: (width - 40) / 2,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    overviewIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    projectCard: {
        width: 170,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginRight: 12,
    },
    projectLogo: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectStatRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    faqCard: {
        borderRadius: 16,
    },
    faqItem: {
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
