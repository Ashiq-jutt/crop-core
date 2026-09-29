import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';

import type { MenuEntry } from '../data/help';
import { AccountHeader } from './AccountHeader';
import { MenuCard } from './MenuCard';

type MenuListScreenProps = { title: string; items: MenuEntry[] };

/** Layout shared by "Help & Support" and "Legal & About": a stack of bordered menu cards. */
export function MenuListScreen({ title, items }: MenuListScreenProps) {
  return (
    <Screen header={<AccountHeader title={title} />} contentStyle={styles.content}>
      <View style={styles.list}>
        {items.map((item) => (
          <MenuCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            lightTitle={item.lightTitle}
            onPress={() => router.push(item.href)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  list: { gap: 16 },
});
