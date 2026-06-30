import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { Circle, CheckCircle2 } from 'lucide-react-native';

interface PasswordRulesProps {
    password: string;
    username?: string;
}

export const PasswordRules: React.FC<PasswordRulesProps> = ({ password, username = '' }) => {
    const { colors } = useTheme();

    const rules = [
        {
            text: "Cannot be all numbers",
            isValid: password.length > 0 && !/^\d+$/.test(password),
        },
        {
            text: "Cannot be all letters (case-sensitive)",
            isValid: password.length > 0 && !/^[a-zA-Z]+$/.test(password),
        },
        {
            text: "Minimum 8 characters required",
            isValid: password.length >= 8,
        },
        {
            text: "Cannot contain username",
            isValid: password.length > 0 ? (username ? !password.toLowerCase().includes(username.toLowerCase()) : true) : false,
        }
    ];

    return (
        <View style={styles.rulesContainer}>
            {rules.map((rule, index) => {
                const Icon = rule.isValid ? CheckCircle2 : Circle;
                const color = rule.isValid ? colors.cyan : colors.darkGrey;
                const textColor = rule.isValid ? colors.white : colors.darkShadeColorText;

                return (
                    <View key={index} style={styles.ruleItem}>
                        <Icon color={color} size={16} strokeWidth={2} />
                        <Typography color={textColor} size={13} style={styles.ruleText}>
                            {rule.text}
                        </Typography>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    rulesContainer: {
        marginTop: 10,
    },
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    ruleText: {
        marginLeft: 12,
        fontFamily: fonts.medium,
    },
});
