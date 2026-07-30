import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Share2, Bookmark, Rocket, Play, Square, Gift, Check, Clock } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';

const { width } = Dimensions.get('window');

const timelineEvents = [
    { id: '1', title: 'Warm Up', date: '2026-01-14 13:30:00', status: 'Completed', icon: Rocket, active: true },
    { id: '2', title: 'Subscription Starts', date: '2026-01-18 13:30:00', status: 'Upcoming', icon: Play, active: false },
    { id: '3', title: 'Subscription Ends', date: '2026-01-21 13:30:00', status: 'Upcoming', icon: Square, active: false },
    { id: '4', title: 'Distribution', date: '2026-01-22 19:00:00', status: 'Upcoming', icon: Gift, active: false },
];

export const ProjectDetailScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: colors.black }]}>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>
                
                {/* Header */}
                <View style={[styles.header, { marginTop: 10 }]}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft color={colors.white} size={24} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.iconBtn, { marginRight: 12 }]}>
                            <Share2 color={colors.white} size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Bookmark color={colors.white} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    {/* Top Details Card */}
                    <View style={[styles.topCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.15)' }]}>
                        
                        {/* Glowing Logo */}
                        <View style={styles.logoContainer}>
                            <View style={[styles.glowBackground, { backgroundColor: 'rgba(0,122,255,0.3)' }]} />
                            <LinearGradient
                                colors={['#007AFF', '#00C6FF']}
                                style={styles.logoCircle}
                            >
                                <Typography size={24} style={{ color: colors.white, fontFamily: fonts.bold }}>IMU</Typography>
                            </LinearGradient>
                        </View>

                        <View style={styles.titleRow}>
                            <Typography size={22} style={{ color: colors.white, fontFamily: fonts.bold }}>GUSD</Typography>
                            <Typography size={12} style={{ color: colors.cyan, fontFamily: fonts.medium }}>1 IMU = 0.01177 GUSD</Typography>
                        </View>

                        <View style={styles.grid}>
                            <View style={[styles.gridItem, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Allocation</Typography>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>63,721,325.7 IMU</Typography>
                            </View>
                            <View style={[styles.gridItem, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Commitment</Typography>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>44,069,455.12 GUSD</Typography>
                            </View>
                            <View style={[styles.gridItem, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Number of Participants</Typography>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>1,495</Typography>
                            </View>
                            <View style={[styles.gridItem, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                                <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Cap per Subscriber</Typography>
                                <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold }}>637,213.26 IMU</Typography>
                            </View>
                        </View>
                    </View>

                    {/* Timeline Divider */}
                    <View style={styles.timelineDividerRow}>
                        <View style={[styles.timelineDividerLine, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.bold, marginHorizontal: 12 }}>Event Timeline</Typography>
                        <View style={[styles.timelineDividerLine, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                    </View>

                    {/* Timeline Section */}
                    <View style={styles.timelineContainer}>
                        {timelineEvents.map((event, index) => {
                            const IconComponent = event.icon;
                            const isLast = index === timelineEvents.length - 1;
                            const isCompleted = event.status === 'Completed';

                            return (
                                <View key={event.id} style={styles.timelineItemRow}>
                                    
                                    {/* Timeline Line & Icon */}
                                    <View style={styles.timelineIconCol}>
                                        <View style={[
                                            styles.timelineIconBg, 
                                            { backgroundColor: event.active ? colors.cyan : 'rgba(255,255,255,0.05)' }
                                        ]}>
                                            <IconComponent color={event.active ? colors.white : colors.cyan} size={16} />
                                        </View>
                                        
                                        {!isLast && (
                                            <View style={[styles.timelineVerticalLine, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                                        )}
                                    </View>

                                    {/* Content */}
                                    <View style={styles.timelineContentRow}>
                                        <View style={{ flex: 1 }}>
                                            <Typography size={14} style={{ color: colors.white, fontFamily: fonts.bold, marginBottom: 4 }}>{event.title}</Typography>
                                            <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>{event.date}</Typography>
                                        </View>

                                        {/* Status Badge */}
                                        <View style={[
                                            styles.statusBadge, 
                                            { 
                                                backgroundColor: isCompleted ? 'rgba(0,255,100,0.1)' : 'rgba(255,255,255,0.05)',
                                                borderColor: isCompleted ? 'rgba(0,255,100,0.3)' : 'transparent',
                                                borderWidth: isCompleted ? 1 : 0
                                            }
                                        ]}>
                                            {isCompleted ? (
                                                <Check color="#00FF64" size={12} style={{ marginRight: 4 }} />
                                            ) : (
                                                <Clock color={colors.grey} size={12} style={{ marginRight: 4 }} />
                                            )}
                                            <Typography size={10} style={{ 
                                                color: isCompleted ? '#00FF64' : colors.white, 
                                                fontFamily: fonts.medium 
                                            }}>{event.status}</Typography>
                                        </View>
                                    </View>

                                </View>
                            );
                        })}
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
    header: {
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
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
    },
    topCard: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        paddingTop: 20,
        alignItems: 'center',
        position: 'relative',
    },
    logoContainer: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    glowBackground: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        opacity: 0.6,
        filter: [{ blur: 20 }] as any, 
        // Note: blur might not work universally on RN, but opacity creates a soft backdrop
    },
    logoCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    titleRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 16,
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    gridItem: {
        width: '48%',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    timelineDividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    timelineDividerLine: {
        flex: 1,
        height: 1,
    },
    timelineContainer: {
        paddingHorizontal: 8,
    },
    timelineItemRow: {
        flexDirection: 'row',
        minHeight: 64,
    },
    timelineIconCol: {
        alignItems: 'center',
        width: 40,
        marginRight: 16,
    },
    timelineIconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    timelineVerticalLine: {
        width: 2,
        flex: 1,
        marginTop: -4,
        marginBottom: -4,
        zIndex: 1,
    },
    timelineContentRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    }
});
