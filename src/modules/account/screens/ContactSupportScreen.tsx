import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Call, Sms, type Icon } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { accountColors } from '../components/tokens';
import { contactChannels } from '../data/help';

type ContactCardProps = { icon: Icon; label: string; value: string; onPress: () => void; tall?: boolean };

function ContactCard({ icon: IconCmp, label, value, onPress, tall }: ContactCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} ${value}`}
      onPress={onPress}
      style={[styles.card, tall && styles.cardTall]}>
      <View style={styles.disc}>
        <IconCmp size={24} color={colors.primary} variant="Bold" />
      </View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </Pressable>
  );
}

export function ContactSupportScreen() {
  const { email, phone } = contactChannels;
  return (
    <Screen header={<AccountHeader title="Contact Support" />} contentStyle={styles.content}>
      <ContactCard
        icon={Sms}
        label={email.label}
        value={email.value}
        onPress={() => Linking.openURL(`mailto:${email.value}`).catch(() => undefined)}
      />
      <ContactCard
        icon={Call}
        label={phone.label}
        value={phone.value}
        tall
        onPress={() => Linking.openURL(`tel:${phone.dial}`).catch(() => undefined)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24, gap: 24 },
  card: {
    height: 60,
    borderWidth: 1,
    borderColor: accountColors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // The "Customer Service" card is 12pt taller in the design, with its content top-aligned.
  cardTall: { height: 72, alignItems: 'flex-start', paddingTop: 15 },
  disc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.primary95,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  label: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4, color: '#545963' },
  value: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 22, color: palette.neutral0 },
});
