import React from 'react';
import { ViewProps, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  return (
    <View 
        style={[
            { 
                flex: 1, 
                backgroundColor: colors.black,
            }, 
            useSafeArea && {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            },
            style
        ]}
        {...props}
    >
      <View style={styles.container}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
