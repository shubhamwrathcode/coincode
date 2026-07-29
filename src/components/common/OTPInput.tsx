import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable, Platform, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { fonts } from '../../theme/fonts';
import { Typography } from './Typography';

interface OTPInputProps {
    length?: number;
    value: string;
    onChangeText: (val: string) => void;
    onSendPress?: () => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value, onChangeText, onSendPress }) => {
    const { colors } = useTheme();
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const [otpArray, setOtpArray] = useState<string[]>(Array(length).fill(''));

    // Sync from prop `value` to internal `otpArray` when `value` changes from outside
    useEffect(() => {
        const strippedValue = otpArray.join('');
        if (value !== strippedValue) {
             const newArray = Array(length).fill('');
             for (let i = 0; i < value.length && i < length; i++) {
                 newArray[i] = value[i];
             }
             setOtpArray(newArray);
        }
    }, [value, length]);

    const handleChange = (text: string, index: number) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        
        // Handle paste of full string
        if (cleaned.length > 1) {
            const newValue = cleaned.substring(0, length);
            const newArray = Array(length).fill('');
            for (let i = 0; i < newValue.length && i < length; i++) {
                newArray[i] = newValue[i];
            }
            setOtpArray(newArray);
            onChangeText(newValue);
            
            if (newValue.length === length) {
                inputRefs.current[length - 1]?.focus();
            } else {
                inputRefs.current[newValue.length]?.focus();
            }
            return;
        }

        const newOtpArray = [...otpArray];
        
        if (cleaned === '') {
            // Deleted
            newOtpArray[index] = '';
            setOtpArray(newOtpArray);
            onChangeText(newOtpArray.join(''));
        } else {
            // Typed a single char
            newOtpArray[index] = cleaned;
            setOtpArray(newOtpArray);
            onChangeText(newOtpArray.join(''));
            
            // Move to next input automatically
            if (index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            // If the box is already empty and we press backspace, go to the previous box
            if (!otpArray[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
                
                // Also clear the previous box
                const newOtpArray = [...otpArray];
                newOtpArray[index - 1] = '';
                setOtpArray(newOtpArray);
                onChangeText(newOtpArray.join(''));
            }
        }
    };

    const renderBoxes = () => {
        const boxes = [];
        for (let i = 0; i < length; i++) {
            const char = otpArray[i] || '';
            const isActive = focusedIndex === i;
            const isLast = i === length - 1;

            boxes.push(
                <TextInput
                    key={i}
                    ref={(ref) => { inputRefs.current[i] = ref; }}
                    value={char}
                    onChangeText={(text) => handleChange(text, i)}
                    onKeyPress={(e) => handleKeyPress(e, i)}
                    onFocus={() => setFocusedIndex(i)}
                    onBlur={() => setFocusedIndex(null)}
                    maxLength={Platform.OS === 'android' ? undefined : 1}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    selectTextOnFocus
                    style={[
                        styles.box,
                        { 
                            borderColor: isActive ? colors.cyan : '#151619', 
                            backgroundColor: '#08090B',
                            color: colors.white,
                            fontFamily: fonts.medium,
                            marginRight: isLast ? 0 : 8,
                        }
                    ]}
                />
            );
        }
        return boxes;
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxesContainer}>
                {renderBoxes()}
            </View>
            
            {onSendPress && (
                <Pressable onPress={onSendPress} style={styles.sendBtn}>
                    <Typography size={14} style={{ color: colors.cyan, fontFamily: fonts.semiBold }}>
                        Send
                    </Typography>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxesContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 12,
    },
    box: {
        flex: 1,
        minWidth: 0,
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        paddingHorizontal: 0,
    },
    sendBtn: {
        paddingVertical: 12,
        paddingLeft: 8,
        flexShrink: 0,
    }
});
