import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { useTheme } from '../../../../theme/ThemeProvider';
import { fonts } from '../../../../theme/fonts';
import { colors } from '../../../../theme/colors';

interface SliderProps {
    value: number;
    onValueChange: (value: number) => void;
    points: number[];
    min: number;
    max: number;
    color: string;
}

export const Slider = ({ value, onValueChange, points, min, max, color }: SliderProps) => {
    const { colors: themeColors } = useTheme();
    const [sliderWidth, setSliderWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPercent, setDragPercent] = useState(0);

    const initialPercentRef = useRef(0);

    useEffect(() => {
        if (!isDragging) {
            setDragPercent(((value - min) / (max - min)) * 100);
        }
    }, [value, min, max, isDragging]);

    const handleSnap = (percentChange: number) => {
        const newPercent = Math.max(0, Math.min(initialPercentRef.current + percentChange, 1));
        const calcValue = min + newPercent * (max - min);

        const closest = points.reduce((prev, curr) =>
            Math.abs(curr - calcValue) < Math.abs(prev - calcValue) ? curr : prev
        );
        onValueChange(closest);
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderGrant: (evt) => {
                setIsDragging(true);
                if (sliderWidth > 0) {
                    const x = Math.max(0, Math.min(evt.nativeEvent.locationX, sliderWidth));
                    const p = x / sliderWidth;
                    initialPercentRef.current = p;
                    setDragPercent(p * 100);
                    handleSnap(0);
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                if (sliderWidth === 0) return;
                const percentChange = gestureState.dx / sliderWidth;
                const newPercent = Math.max(0, Math.min(initialPercentRef.current + percentChange, 1));
                setDragPercent(newPercent * 100);
                handleSnap(percentChange);
            },
            onPanResponderRelease: () => {
                setIsDragging(false);
            },
            onPanResponderTerminate: () => {
                setIsDragging(false);
            },
        })
    ).current;

    return (
        <View
            style={styles.sliderContainer}
            onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        >
            <View style={styles.trackBackground}>
                <View style={[styles.trackFill, { width: `${dragPercent}%`, backgroundColor: color }]} />
            </View>

            <View style={[styles.thumb, { left: `${dragPercent}%`, backgroundColor: color }]} pointerEvents="none" />

            <View style={styles.dotsContainer}>
                {points.map((p) => {
                    const isSelectedOrPassed = p <= value;
                    const dotPercent = ((p - min) / (max - min)) * 100;
                    return (
                        <View key={p} style={[styles.dotWrapper, { left: `${dotPercent}%` }]}>
                            <Typography
                                size={10}
                                style={{
                                    color: isSelectedOrPassed ? color : themeColors.grey,
                                    fontFamily: fonts.medium
                                }}
                            >
                                {p}x
                            </Typography>
                        </View>
                    );
                })}
            </View>

            {/* Touch Overlay */}
            <View
                style={StyleSheet.absoluteFill}
                {...panResponder.panHandlers}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        position: 'relative',
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    trackBackground: {
        height: 3,
        backgroundColor: '#2A2C33',
        borderRadius: 2,
        width: '100%',
        position: 'absolute',
        top: 8,
    },
    trackFill: {
        height: '100%',
        borderRadius: 2,
    },
    thumb: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: colors.cyan,
        borderWidth: 2,
        borderColor: colors.white,
        position: 'absolute',
        top: 2.5,
        marginLeft: -7,
        zIndex: 10,
    },
    dotsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        top: 24,
        left: 0,
        right: 0,
    },
    dotWrapper: {
        position: 'absolute',
        alignItems: 'center',
        marginLeft: -10,
        width: 20,
    },
});
