import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Notification, SearchNormal1 } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { currentUser } from '../data/home';

export function HomeHeader() {
  return (
    <View style={styles.row}>
      <Image source={currentUser.avatar} style={styles.avatar} />
      <View style={styles.greeting}>
        <AppText style={styles.hello} color="#ACB4B9">
          Hello 👋
        </AppText>
        <AppText style={styles.name} color={colors.textPrimary}>
          {currentUser.name}
        </AppText>
      </View>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" accessibilityLabel="Search" hitSlop={8}>
          <SearchNormal1 size={24} color={colors.textPrimary} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={8}
          onPress={() => router.push('/account/notifications')}>
          <Notification size={24} color={colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  greeting: { flex: 1, gap: 4 },
  hello: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 20 },
  name: { fontFamily: fonts.bold, fontSize: 18, lineHeight: 24 },
  actions: { flexDirection: 'row', gap: 16 },
});
