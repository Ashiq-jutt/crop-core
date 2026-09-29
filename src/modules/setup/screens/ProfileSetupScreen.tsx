import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Gps, Microphone2, TickCircle } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { SetupFooter } from '../components/SetupFooter';
import { SetupHeader } from '../components/SetupHeader';
import { SetupInput } from '../components/SetupInput';
import { SetupSteps } from '../components/SetupSteps';
import { profileDefaults, setupColors } from '../data/setup';

export function ProfileSetupScreen() {
  const [name, setName] = useState(profileDefaults.name);
  const [location, setLocation] = useState(profileDefaults.location);

  return (
    <Screen
      header={<SetupHeader title="Profile Setup" />}
      footer={<SetupFooter label="Continue" onPress={() => router.push('/setup/fields')} />}>
      <SetupSteps step={1} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change profile photo"
        style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
        <Image source={require('@assets/images/setup/profile-avatar.png')} style={styles.avatarImage} />
      </Pressable>

      <View style={styles.form}>
        <SetupInput
          label="Your name"
          value={name}
          onChangeText={setName}
          right={<Microphone2 size={24} color="#000000" />}
        />
        <SetupInput
          label="Mobile Number"
          value={profileDefaults.mobile}
          editable={false}
          right={<TickCircle size={24} color={setupColors.success} variant="Bold" />}
        />
        <SetupInput
          label="Location (Village/District)"
          value={location}
          onChangeText={setLocation}
          right={<Gps size={24} color="#000000" />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: { alignSelf: 'center', marginTop: 23 },
  avatarImage: { width: 103, height: 103 },
  pressed: { opacity: 0.8 },
  form: { gap: 16, paddingHorizontal: 16, paddingTop: 26, paddingBottom: 24 },
});
