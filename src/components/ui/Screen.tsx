import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors } from '@/theme';

type ScreenProps = {
  children: ReactNode;
  /** Sticky header rendered above the scroll area (e.g. AppBar). */
  header?: ReactNode;
  /** Sticky footer rendered below the scroll area (e.g. primary CTA). */
  footer?: ReactNode;
  scroll?: boolean;
  edges?: Edge[];
  background?: string;
  statusBarStyle?: 'dark' | 'light';
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  header,
  footer,
  scroll = true,
  edges = ['top', 'bottom'],
  background = colors.background,
  statusBarStyle = 'dark',
  contentStyle,
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.root, { backgroundColor: background }]}>
      <StatusBar style={statusBarStyle} />
      {header}
      {scroll ? (
        <ScrollView
          style={styles.root}
          contentContainerStyle={contentStyle}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.root, contentStyle]}>{children}</View>
      )}
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
