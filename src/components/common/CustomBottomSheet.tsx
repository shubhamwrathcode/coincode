import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { X } from 'lucide-react-native';
import { BlurView } from '@react-native-community/blur';

interface CustomBottomSheetProps {
    sheetRef: any;
    height?: number;
    children: ReactNode;
    title?: string;
    onClose?: () => void;
    showCloseIcon?: boolean;
    dragOnContent?: boolean;
}

export const CustomBottomSheet = ({
    sheetRef,
    height = 300,
    children,
    title,
    onClose,
    showCloseIcon = true,
    dragOnContent = false
}: CustomBottomSheetProps) => {
    const { colors } = useTheme();

    const handleClose = () => {
        sheetRef.current?.close();
        if (onClose) onClose();
    };

    return (
        <RBSheet
            ref={sheetRef}
            height={height}
            openDuration={250}
            closeDuration={250}
            draggable={true}
            dragOnContent={dragOnContent}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.7)"
                },
                draggableIcon: {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    width: 40,
                    marginTop: 10,
                },
                container: {
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                }
            }}
        >
            <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={20}
                reducedTransparencyFallbackColor="#111214"
            />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(10, 11, 14, 0.7)' }]} />
            <View style={{ flex: 1, }}>
                {/* Header */}
                {(title || showCloseIcon) && (
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            {title && (
                                <Typography color={colors.white} size={18} style={{ fontFamily: fonts.bold }}>
                                    {title}
                                </Typography>
                            )}
                        </View>
                        {/* {showCloseIcon && (
                            <TouchableOpacity onPress={handleClose} style={[styles.closeBtn, { backgroundColor: '#1C1C1E' }]}>
                                <X color={colors.grey} size={20} />
                            </TouchableOpacity>
                        )} */}
                    </View>
                )}

                {/* Content */}
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </RBSheet>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    titleContainer: {
        flex: 1,
    },
    closeBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    }
});
