import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { CollabFooter } from '../components/CollabFooter';
import { PrimaryButton } from '../components/PrimaryButton';
import { images } from '../data/collaboration';

/** Figma 05 / 13 — shown after confirming a field-help or equipment-help request. */
export function RequestSentScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const trackId = type === 'equipment' ? 'tractor-pending' : 'irrigation-pending';

  return (
    <Screen
      scroll={false}
      contentStyle={styles.content}
      footer={
        <CollabFooter>
          <PrimaryButton
            label="Track Request"
            onPress={() => router.replace({ pathname: '/collaboration/request/[id]', params: { id: trackId } })}
          />
          <Pressable
            accessibilityRole="link"
            onPress={() => router.dismissTo('/collaboration')}
            style={styles.link}>
            <Text style={styles.linkText}>Go to Dashboard</Text>
          </Pressable>
        </CollabFooter>
      }>
      <Image source={images.requestSent} style={styles.art} contentFit="contain" />
      <View style={styles.titleRow}>
        <Text style={styles.title}>Request Sent 🌿</Text>
      </View>
      <Text style={styles.body}>
        Your request has been sent to nearby farmers.{'\n'}You’ll be notified when someone responds
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', paddingTop: 132 },
  art: { width: 256, height: 248 },
  titleRow: { marginTop: 19 },
  title: { fontFamily: fonts.semibold, fontSize: 22, lineHeight: 32, color: colors.textPrimary },
  body: {
    marginTop: 6,
    fontFamily: fonts.regular,
    fontSize: 14.2,
    lineHeight: 20,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  link: { marginTop: 18, alignItems: 'center', paddingBottom: 14 },
  linkText: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 22, color: colors.primary },
});
