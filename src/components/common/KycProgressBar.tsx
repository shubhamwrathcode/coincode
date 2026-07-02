import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface KycProgressBarProps {
    currentStep: number;
    totalSteps?: number;
}

export const KycProgressBar: React.FC<KycProgressBarProps> = ({ currentStep, totalSteps = 3 }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.progressContainer}>
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <View
                    key={step}
                    style={[
                        styles.progressSegment,
                        {
                            backgroundColor: step === currentStep ? colors.cyan : '#2A2A2E',
                            width: step === currentStep ? 80 : 40,
                        }
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressSegment: {
        height: 4,
        borderRadius: 2,
    },
});
