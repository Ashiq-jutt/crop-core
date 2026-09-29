import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Add, ArrowDown2, Camera } from 'iconsax-react-native';

import { BottomSheet, Screen } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { Dash } from '../components/Dash';
import { FooterButton } from '../components/FooterButton';
import { accountColors } from '../components/tokens';
import { issueTypes } from '../data/help';

const PLACEHOLDER = '#494E59';

export function ReportIssuesScreen() {
  const [issue, setIssue] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [attached, setAttached] = useState(0);

  return (
    <Screen
      header={<AccountHeader title="Report Issues" />}
      footer={<FooterButton label="Submit Report" divider medium onPress={() => router.back()} />}
      contentStyle={styles.content}>
      <Text style={styles.label}>What Happened ?</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="What happened"
        onPress={() => setPickerOpen(true)}
        style={styles.box}>
        <Text style={[styles.value, !issue && styles.placeholder]}>{issue ?? 'E.g App Not Working'}</Text>
        <ArrowDown2 size={24} color={palette.neutral0} />
      </Pressable>

      <Text style={[styles.label, styles.labelSpaced]}>Description</Text>
      <View style={styles.box}>
        <TextInput
          accessibilityLabel="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Please Describe in Detail What happened"
          placeholderTextColor={PLACEHOLDER}
          style={styles.input}
        />
      </View>

      <View style={styles.upload}>
        <View style={styles.cameraDisc}>
          <Camera size={24} color={palette.neutral0} />
        </View>
        <Text style={styles.dropTitle}>Drag & Drop</Text>
        <Text style={styles.dropSub}>
          {attached > 0 ? `${attached} File Selected` : 'Select File and Upload Here'}
        </Text>
        <Dash style={styles.dash} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Browse file"
          onPress={() => setAttached((n) => n + 1)}
          style={styles.browse}>
          <Add size={20} color={palette.neutral0} />
          <Text style={styles.browseLabel}>Browse File</Text>
        </Pressable>
      </View>

      <BottomSheet visible={pickerOpen} onClose={() => setPickerOpen(false)} title="What Happened ?">
        <View style={styles.options}>
          {issueTypes.map((type) => (
            <Pressable
              key={type}
              accessibilityRole="radio"
              accessibilityState={{ checked: issue === type }}
              accessibilityLabel={type}
              onPress={() => {
                setIssue(type);
                setPickerOpen(false);
              }}
              style={[styles.option, issue === type && styles.optionActive]}>
              <Text style={styles.value}>{type}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 28, paddingBottom: 24 },
  label: { marginLeft: 4, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: '#363B41' },
  labelSpaced: { marginTop: 20 },
  box: {
    marginTop: 4,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: { flex: 1, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  placeholder: { color: PLACEHOLDER },
  input: {
    flex: 1,
    height: 48,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: palette.neutral0,
  },
  upload: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: accountColors.border,
    borderRadius: 12,
    padding: 11,
    alignItems: 'center',
  },
  cameraDisc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropTitle: { marginTop: 9, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  dropSub: { marginTop: 6, fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4, color: '#3C4146' },
  dash: { marginTop: 12 },
  browse: {
    marginTop: 16,
    alignSelf: 'stretch',
    height: 36,
    borderRadius: 8,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  browseLabel: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  options: { gap: 8 },
  option: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: palette.neutral95,
    borderWidth: 1,
    borderColor: palette.neutral95,
  },
  optionActive: { backgroundColor: palette.primary95, borderColor: colors.primary },
});
