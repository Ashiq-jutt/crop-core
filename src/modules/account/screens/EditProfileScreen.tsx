import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Gps, Microphone2, TickCircle } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { FooterButton } from '../components/FooterButton';
import { FormField } from '../components/FormField';
import { editProfile } from '../data/profile';

export function EditProfileScreen() {
  const [name, setName] = useState(editProfile.name);
  const [mobile, setMobile] = useState(editProfile.mobile);
  const [location, setLocation] = useState(editProfile.location);

  return (
    <Screen
      header={<AccountHeader title="Edit Profile" />}
      footer={<FooterButton label="Continue" divider onPress={() => router.back()} />}
      contentStyle={styles.content}>
      <View style={styles.avatarWrap}>
        <Image source={editProfile.avatar} style={styles.avatar} accessibilityLabel="Profile photo" />
        <Pressable accessibilityRole="button" accessibilityLabel="Change photo" style={styles.camera}>
          <Image source={editProfile.cameraBadge} style={styles.cameraImage} />
        </Pressable>
      </View>

      <View style={styles.form}>
        <FormField
          label="Your name"
          value={name}
          onChangeText={setName}
          strong
          autoCapitalize="words"
          right={
            <Pressable accessibilityRole="button" accessibilityLabel="Speak your name" hitSlop={8}>
              <Microphone2 size={24} color={palette.neutral0} />
            </Pressable>
          }
        />
        <FormField
          label="Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          strong
          keyboardType="phone-pad"
          right={<TickCircle size={20} color={colors.success} variant="Bold" />}
        />
        <FormField
          label="Location (Village/District)"
          value={location}
          onChangeText={setLocation}
          strong
          right={
            <Pressable accessibilityRole="button" accessibilityLabel="Use current location" hitSlop={8}>
              <Gps size={24} color={palette.neutral0} />
            </Pressable>
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 23, paddingBottom: 24 },
  avatarWrap: { alignSelf: 'center', width: 150, height: 150 },
  avatar: { width: 150, height: 150, borderRadius: 75 },
  camera: { position: 'absolute', right: 1, bottom: 1 },
  cameraImage: { width: 48.5, height: 48.5 },
  form: { marginTop: 27, gap: 16 },
});
