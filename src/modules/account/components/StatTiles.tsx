import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '@/theme';

import type { FarmStat } from '../data/profile';

type StatTilesProps = { stats: FarmStat[] };

export function StatTiles({ stats }: StatTilesProps) {
  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <View key={stat.id} style={[styles.tile, { backgroundColor: stat.background }]}>
          <Text style={[styles.value, { color: stat.color }]}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  tile: { flex: 1, height: 60, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  value: { fontFamily: fonts.outfit, fontSize: 16, lineHeight: 22 },
  label: { marginTop: 3, fontFamily: fonts.outfit, fontSize: 13, lineHeight: 18, color: '#5B606A' },
});
