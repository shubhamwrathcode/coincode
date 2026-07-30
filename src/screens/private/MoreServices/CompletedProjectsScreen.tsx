import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Filter, Calendar, Users } from 'lucide-react-native';
import { Typography } from '../../../components/common/Typography';
import { useTheme } from '../../../theme/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import { CommonButton } from '../../../components/common/CommonButton';

const { width } = Dimensions.get('window');

const completedProjectsData = [
    {
        id: '1',
        title: 'IMU',
        icon: 'IMU',
        color: '#1E90FF',
        status: ['Completed'],
        date: '2026-01-21 13:30',
        allocation: '212,404,419 IMU',
        priceLine1: '1 IMU = 0.01177 USDT',
        priceLine2: '0.01177 GUSD',
        participants: '5,453'
    },
    {
        id: '2',
        title: 'KDK',
        icon: 'KDK',
        color: '#6A5ACD',
        status: ['Initial', 'Completed'],
        date: '2025-12-21 13:30',
        allocation: '3,000,000 KDK',
        priceLine1: '1 KDK = 0.35 USDT',
        priceLine2: '0.35 GUSD',
        participants: '6,934'
    },
    {
        id: '3',
        title: 'XPL',
        icon: 'XPL',
        color: '#9400D3',
        status: ['Completed'],
        date: '2026-09-25 15:30',
        allocation: '3,000,000 XPL',
        priceLine1: '1 XPL = 0.35 USDT',
        priceLine2: '',
        participants: '7,553'
    },
    {
        id: '4',
        title: 'IMU',
        icon: 'IMU',
        color: '#1E90FF',
        status: ['Completed'],
        date: '2026-01-21 13:30',
        allocation: '212,404,419 IMU',
        priceLine1: '1 IMU = 0.01177 USDT',
        priceLine2: '0.01177 GUSD',
        participants: '5,453'
    },
];

const ProjectCard = memo(({ proj }: { proj: any }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <View style={[styles.projectCard, { borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }]}>

            {/* Card Header */}
            <View style={styles.cardHeader}>
                <View style={[styles.projectLogo, { backgroundColor: proj.color }]}>
                    <Typography size={12} style={{ color: colors.white, fontFamily: fonts.bold }}>{proj.icon}</Typography>
                </View>

                <View style={styles.headerRight}>
                    <View style={styles.titleRow}>
                        <Typography size={16} style={{ color: colors.white, fontFamily: fonts.semiBold, marginRight: 8 }}>{proj.title}</Typography>
                        {proj.status.map((status: string) => {
                            const isCompleted = status === 'Completed';
                            return (
                                <View key={status} style={[styles.statusTag, { backgroundColor: isCompleted ? 'rgba(0,255,100,0.1)' : 'rgba(100,100,255,0.1)' }]}>
                                    <Typography size={10} style={{ color: isCompleted ? '#00FF64' : '#8A8AFF', fontFamily: fonts.medium }}>{status}</Typography>
                                </View>
                            )
                        })}
                    </View>
                    <View style={styles.dateRow}>
                        <Calendar color={colors.grey} size={12} style={{ marginRight: 4 }} />
                        <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.medium }}>{proj.date}</Typography>
                    </View>
                </View>
            </View>

            <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.05)' }]} />

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
                <View style={styles.detailCol}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Total Allocation</Typography>
                    <Typography size={14} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{proj.allocation}</Typography>
                </View>
                <View style={styles.detailCol}>
                    <Typography size={10} style={{ color: colors.grey, fontFamily: fonts.regular, marginBottom: 4 }}>Subscription Price</Typography>
                    <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold }}>{proj.priceLine1}</Typography>
                    {proj.priceLine2 ? (
                        <Typography size={12} style={{ color: colors.white, fontFamily: fonts.semiBold, marginTop: 2 }}>{proj.priceLine2}</Typography>
                    ) : null}
                </View>
            </View>

            {/* Participants */}
            <View style={styles.participantsRow}>
                <Users color={colors.grey} size={12} style={{ marginRight: 4 }} />
                <Typography size={12} style={{ color: colors.white, fontFamily: fonts.medium }}>
                    {proj.participants} <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular }}>Participants</Typography>
                </Typography>
            </View>

            <CommonButton title="View Details" onPress={() => (navigation.navigate as any)('ProjectDetailScreen')} style={{ marginTop: 20 }} />
        </View>
    );
});

export const CompletedProjectsScreen = () => {
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
                    <TouchableOpacity style={styles.iconBtn}>
                        <Filter color={colors.white} size={18} />
                    </TouchableOpacity>
                </View>

                {/* Page Title */}
                <View style={styles.pageTitleContainer}>
                    <Typography size={22} style={{ color: colors.white, fontFamily: fonts.semiBold }}>
                        Completed Projects
                    </Typography>
                    <Typography size={12} style={{ color: colors.grey, fontFamily: fonts.regular, marginTop: 4 }}>
                        Track your successfully completed projects
                    </Typography>
                </View>

                <FlatList
                    data={completedProjectsData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <ProjectCard proj={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                />
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
    pageTitleContainer: {
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 16,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    projectCard: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    projectLogo: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    headerRight: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statusTag: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 6,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 16,
    },
    detailsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailCol: {
        flex: 1,
    },
    participantsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    }
});
