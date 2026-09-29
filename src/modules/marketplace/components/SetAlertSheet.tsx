import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Notification } from 'iconsax-react-native';

import { fonts } from '@/theme';

import type { Crop } from '../data/rates';
import { CommodityCard } from './CommodityCard';
import { PrimaryButton } from './FooterButton';
import { MarketSheet } from './MarketSheet';
import { SegmentTabs } from './SegmentTabs';
import { Txt } from './Txt';
import { mk } from './tokens';

type Direction = 'above' | 'below';

const DIRECTIONS = [
  { id: 'above', label: 'Goes Above' },
  { id: 'below', label: 'Goes Below' },
] as const;

type SetAlertSheetProps = { crop: Crop | null; onClose: () => void };

export function SetAlertSheet({ crop, onClose }: SetAlertSheetProps) {
  const [direction, setDirection] = useState<Direction>('above');
  const [target, setTarget] = useState('$110');
  return (
    <MarketSheet visible={crop !== null} onClose={onClose} title="Set Prize Alert" titleTop={32} dividerTop={71}>
      {crop ? (
        <View>
          <CommodityCard crop={crop} style={styles.card} />
          <SegmentTabs options={DIRECTIONS} value={direction} onChange={setDirection} height={42} style={styles.tabs} />
          <Txt size={14} color="#2B2E33" lineHeight={20} style={styles.label}>
            Set Prize Target
          </Txt>
          <TextInput
            value={target}
            onChangeText={setTarget}
            keyboardType="numbers-and-punctuation"
            accessibilityLabel="Set Prize Target"
            style={styles.input}
          />
          <View style={styles.info}>
            <Notification size={24} color={mk.ink} />
            <Txt size={14} weight="semibold" color={mk.ink} lineHeight={20} style={styles.infoText}>
              {`You Are Notified When ${crop.name} Prize Goes ${direction === 'above' ? 'Above' : 'Below'} ${target}/kg`}
            </Txt>
          </View>
          <PrimaryButton label="Set Alert" weight="semibold" size={16.5} onPress={onClose} style={styles.button} />
        </View>
      ) : null}
    </MarketSheet>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 16 },
  tabs: { marginTop: 23 },
  label: { marginTop: 28, marginLeft: 20 },
  input: {
    marginTop: 6,
    marginHorizontal: 16,
    height: 40,
    borderRadius: 10,
    backgroundColor: mk.surface,
    paddingHorizontal: 16,
    fontFamily: fonts.semibold,
    fontSize: 14.5,
    color: mk.ink,
  },
  info: {
    marginTop: 22,
    marginHorizontal: 16,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#EEF6FC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 13,
    paddingRight: 12,
    gap: 12,
  },
  infoText: { flex: 1 },
  button: { marginTop: 14, marginHorizontal: 16 },
});
