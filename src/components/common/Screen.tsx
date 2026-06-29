import React from 'react';
import { SafeAreaView, ViewProps, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface ScreenProps extends ViewProps {
  useSafeArea?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  useSafeArea = true,
  ...props
}) => {
  const { colors } = useTheme();

  const Container = useSafeArea ? SafeAreaView : View;

  return (
    <Container style={[styles.container, { backgroundColor: colors.black }, style]} {...props}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
