import { Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ArrowRight2, Edit2, TickCircle } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { Dash } from '../components/Dash';
import { StatTiles } from '../components/StatTiles';
import { accountColors } from '../components/tokens';
import { currentPlan, farmStats, profileMenu, profileUser } from '../data/profile';

export function ProfileScreen() {
  return (
    <Screen edges={['top']} header={<AccountHeader title="Profile" showBack={false} />} contentStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.identity}>
          <Image source={profileUser.avatar} style={styles.avatar} accessibilityLabel={profileUser.name} />
          <View style={styles.identityText}>
            <Text style={styles.name} numberOfLines={1}>
              {profileUser.name}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              {profileUser.location}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
            onPress={() => router.push('/account/edit-profile')}
            style={styles.edit}>
            <Text style={styles.editLabel}>Edit</Text>
            <Edit2 size={16} color={palette.neutral0} />
          </Pressable>
        </View>

        <View style={styles.setupRow}>
          <Text style={styles.setupLabel}>Farm Setup</Text>
          <View style={styles.setupValue}>
            <Text style={styles.setupLabel}>{profileUser.farmSetup}</Text>
            <TickCircle size={18} color={colors.success} variant="Bold" />
          </View>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${profileUser.farmSetupProgress * 100}%` }]} />
        </View>

        <Dash style={styles.cardDash} />
        <StatTiles stats={farmStats} />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Current plan"
        onPress={() => router.push('/account/subscription')}
        style={styles.plan}>
        <View style={styles.planText}>
          <Text style={styles.planTitle}>{currentPlan.title}</Text>
          <Text style={styles.planPrice}>{currentPlan.price}</Text>
          <Text style={styles.planBilling}>{currentPlan.nextBilling}</Text>
        </View>
        <ArrowRight2 size={26} color={palette.neutral0} />
      </Pressable>

      <View style={styles.menu}>
        {profileMenu.map((item) => {
          const ItemIcon = item.icon;
          return (
            <Fragment key={item.id}>
              <Dash />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={item.title}
                onPress={() => router.push(item.href)}
                style={styles.row}>
                <View style={styles.disc}>
                  <ItemIcon size={24} color={palette.neutral0} />
                </View>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <ArrowRight2 size={24} color={palette.neutral0} />
              </Pressable>
            </Fragment>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Log out"
        onPress={() => router.replace('/login')}
        style={styles.logout}>
        <Text style={styles.logoutLabel}>Log Out</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Bottom padding keeps the last item clear of the floating tab bar + scan button.
  content: { paddingTop: 26, paddingHorizontal: 16, paddingBottom: 120 },
  card: {
    borderWidth: 1,
    borderColor: accountColors.border,
    borderRadius: 16,
    padding: 15,
  },
  identity: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  identityText: { flex: 1, marginLeft: 12, marginRight: 16 },
  name: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24, color: palette.neutral0 },
  location: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.5, color: palette.neutral0, marginTop: 6 },
  edit: {
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editLabel: { fontFamily: fonts.bold, fontSize: 12, lineHeight: 16, color: palette.neutral0 },
  setupRow: { marginTop: 14, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  setupValue: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  setupLabel: { fontFamily: fonts.outfit, fontSize: 15, lineHeight: 24, color: palette.neutral0 },
  track: { marginTop: 6, height: 12, borderRadius: 6, backgroundColor: palette.neutral90, overflow: 'hidden' },
  fill: { height: 12, borderRadius: 6, backgroundColor: colors.success },
  cardDash: { marginTop: 15, marginBottom: 16 },
  plan: {
    marginTop: 36,
    height: 96,
    borderRadius: 12,
    backgroundColor: palette.primary95,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  planText: { flex: 1 },
  planTitle: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  planPrice: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24, color: palette.neutral0, marginTop: 5 },
  planBilling: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, color: palette.neutral0 },
  menu: { marginTop: 15 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
  },
  disc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rowTitle: { flex: 1, fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24, color: palette.neutral0 },
  logout: { alignSelf: 'center', marginTop: 10, paddingHorizontal: 16 },
  logoutLabel: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24, color: accountColors.logout },
});
