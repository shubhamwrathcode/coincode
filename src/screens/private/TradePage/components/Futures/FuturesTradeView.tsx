import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FuturesChart } from './FuturesChart';
import { FuturesOrderForm } from './FuturesOrderForm';
import { FuturesOrderBook } from './FuturesOrderBook';
import { FuturesPositions } from './FuturesPositions';

export const FuturesTradeView = () => {
    return (
        <View style={styles.container}>

            {/* Chart Area */}
            <FuturesChart />

            {/* Trading Section */}
            <View style={styles.tradeSection}>
                <View style={styles.formCol}>
                    <FuturesOrderForm />
                </View>
                <View style={styles.bookCol}>
                    <FuturesOrderBook />
                </View>
            </View>

            {/* Positions Section */}
            <FuturesPositions />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tradeSection: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginTop: 15,
    },
    formCol: {
        flex: 0.55,
    },
    bookCol: {
        flex: 0.45,
    },
});
