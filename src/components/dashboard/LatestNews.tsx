import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../common/Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { Newspaper } from 'lucide-react-native';
import FastImage from 'react-native-fast-image';
import { ImageAssets } from '../common/ImageAssets';

const NEWS_DATA = [
    { id: '1', date: '05-25 04:05', title: 'Exclusive Soon Token Savings Promotions Launch' },
    { id: '2', date: '05-25 04:05', title: 'Exclusive Soon Token Savings Promotions Launch' },
    { id: '3', date: '05-25 04:05', title: 'Exclusive Soon Token Savings Promotions Launch' },
];

export const LatestNews = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <FastImage source={ImageAssets.newsImg} style={{ width: 20, height: 20, }} />
                    <Typography color={colors.white} size={15} style={{ fontFamily: fonts.semiBold, marginLeft: 8 }}>
                        Latest News
                    </Typography>
                </View>
                <TouchableOpacity>
                    <Typography color={colors.cyan} size={13} style={{ fontFamily: fonts.medium }}>
                        View All {'→'}
                    </Typography>
                </TouchableOpacity>
            </View>

            {/* List */}
            <View style={styles.list}>
                {NEWS_DATA.map((news) => (
                    <TouchableOpacity key={news.id} style={styles.newsItem}>
                        <Typography color={colors.darkShadeColorText} size={12} style={{ fontFamily: fonts.regular }}>
                            {news.date}
                        </Typography>
                        <Typography color={colors.white} size={12} style={{ fontFamily: fonts.regular, flex: 1, marginLeft: 12 }} numberOfLines={1}>
                            {news.title}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        gap: 16,
    },
    newsItem: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
