import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DashedDivider } from '@/components/ui';
import { StatusChip } from '@/modules/fields/components/Chips';
import { font, ink } from '@/modules/fields/components/text';
import { palette } from '@/theme';

import type { DetectedIssue } from '../data/diagnosis';

/** Numbered detected issues with severity pills, separated by a dashed rule. */
export function IssueList({ issues, gap }: { issues: DetectedIssue[]; gap: [above: number, below: number] }) {
  return (
    <View>
      {issues.map((issue, i) => (
        <Fragment key={issue.id}>
          {i > 0 ? <DashedDivider style={{ marginTop: gap[0], marginBottom: gap[1] }} /> : null}
          <View style={styles.row}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{i + 1}</Text>
            </View>
            {/* The design nudges every row after the first 4pt right. */}
            <View style={[styles.flex, i > 0 && styles.nudged]}>
              <Text style={styles.title}>{issue.title}</Text>
              <Text style={styles.area}>{issue.area}</Text>
            </View>
            <StatusChip status={issue.severity} style={styles.pill} />
          </View>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  numberText: font('medium', 14.5, 20, ink.title),
  flex: { flex: 1 },
  nudged: { paddingLeft: 4 },
  title: font('medium', 14.5, 19, ink.title),
  area: { ...font('regular', 13, 17, ink.muted), marginTop: 1 },
  pill: { width: 82, paddingHorizontal: 0 },
});
