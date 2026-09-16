import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { CommonInput } from './CommonInput';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeProvider';
import { getEmailDomainSuggestions } from '../../utils/emailDomainSuggest';

interface EmailInputWithSuggestionsProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: object;
  inputContainerStyle?: object;
}

export const EmailInputWithSuggestions: React.FC<EmailInputWithSuggestionsProps> = ({
  value,
  onChangeText,
  containerStyle,
  inputContainerStyle,
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const { colors } = useTheme();
  const [suggestVisible, setSuggestVisible] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = useMemo(() => getEmailDomainSuggestions(value), [value]);

  const clearBlurTimer = () => {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
      blurTimer.current = null;
    }
  };

  useEffect(() => () => clearBlurTimer(), []);

  const applyDomain = (domain: string) => {
    clearBlurTimer();
    const s = String(value || '');
    const at = s.indexOf('@');
    if (at < 0) return;
    onChangeText(`${s.slice(0, at)}@${domain}`);
    setSuggestVisible(false);
  };

  const handleChange = (text: string) => {
    onChangeText(text);
    const nextSuggestions = getEmailDomainSuggestions(text);
    setSuggestVisible(nextSuggestions.length > 0);
  };

  const showList = suggestVisible && suggestions.length > 0;

  return (
    <View style={[styles.wrap, containerStyle]}>
      <CommonInput
        {...inputProps}
        value={value}
        onChangeText={handleChange}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={[
          styles.input,
          showList && styles.inputWithList,
          inputContainerStyle,
        ]}
        onFocus={(e) => {
          clearBlurTimer();
          if (getEmailDomainSuggestions(value).length > 0) {
            setSuggestVisible(true);
          }
          onFocus?.(e);
        }}
        onBlur={(e) => {
          clearBlurTimer();
          blurTimer.current = setTimeout(() => {
            setSuggestVisible(false);
            blurTimer.current = null;
          }, 200);
          onBlur?.(e);
        }}
      />

      {showList ? (
        <View
          style={[
            styles.list,
            {
              backgroundColor: colors.inputBgColor,
              borderColor: colors.inputBorderColor,
            },
          ]}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            style={styles.listScroll}
          >
            {suggestions.map((domain) => (
              <TouchableOpacity
                key={domain}
                style={styles.row}
                activeOpacity={0.7}
                onPress={() => applyDomain(domain)}
              >
                <Typography color={colors.white} size={14}>
                  @{domain}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    zIndex: 10,
    width: '100%',
    marginBottom: 16,
  },
  input: {
    marginBottom: 0,
  },
  inputWithList: {
    marginBottom: 0,
  },
  list: {
    marginTop: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    maxHeight: 220,
    overflow: 'hidden',
  },
  listScroll: {
    maxHeight: 220,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
});
