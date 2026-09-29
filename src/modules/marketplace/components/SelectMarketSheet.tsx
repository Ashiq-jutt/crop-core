import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Location } from 'iconsax-react-native';

import { homeMarket, nearbyMarkets, radiusOptions } from '../data/rates';
import { PrimaryButton } from './FooterButton';
import { MarketSheet } from './MarketSheet';
import { Txt } from './Txt';
import { mk } from './tokens';

type SelectMarketSheetProps = {
  visible: boolean;
  selected: string[];
  onClose: () => void;
  onApply: (ids: string[]) => void;
};

/** Remount (change `key`) when opening so the picks start from `selected`. */
export function SelectMarketSheet({ visible, selected, onClose, onApply }: SelectMarketSheetProps) {
  const [picked, setPicked] = useState(selected);
  const [radius, setRadius] = useState(0);

  const toggle = (id: string) => setPicked((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  return (
    <MarketSheet visible={visible} onClose={onClose} title="Select Market" titleTop={40} dividerTop={71}>
      <View style={styles.yours}>
        <View style={styles.flex}>
          <Txt size={13} color="#575C66" lineHeight={16}>
            Your Market
          </Txt>
          <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={22} style={styles.home}>
            {homeMarket.name}
          </Txt>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Radius ${radiusOptions[radius]}, change`}
          onPress={() => setRadius((r) => (r + 1) % radiusOptions.length)}
          style={styles.radius}>
          <Txt size={12} weight="semibold" color="#FFFFFF" lineHeight={18}>
            {radiusOptions[radius]}
          </Txt>
          <Svg width={12} height={8} viewBox="0 0 12 8">
            <Path d="M1 1h10L6 7z" fill="#FFFFFF" stroke="#FFFFFF" strokeLinejoin="round" />
          </Svg>
        </Pressable>
      </View>
      <View style={styles.list}>
        {nearbyMarkets.map((m) => {
          const on = picked.includes(m.id);
          return (
            <Pressable
              key={m.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: on }}
              accessibilityLabel={m.name}
              onPress={() => toggle(m.id)}
              style={styles.option}>
              <View style={styles.pin}>
                <Location size={24} color="#181919" />
              </View>
              <View style={styles.flex}>
                <Txt size={14} weight="semibold" color={on ? '#E84B00' : mk.ink} lineHeight={20}>
                  {m.name}
                </Txt>
                <View style={styles.sub}>
                  <Txt size={13.5} color="#0C0D0F" lineHeight={18}>
                    {m.district}
                  </Txt>
                  <View style={styles.bar} />
                  <Txt size={13.5} color="#0C0D0F" lineHeight={18}>
                    {m.distance}
                  </Txt>
                </View>
              </View>
              <View style={[styles.radio, on && styles.radioOn]}>{on ? <View style={styles.dot} /> : null}</View>
            </Pressable>
          );
        })}
      </View>
      <PrimaryButton label="Select Market" weight="semibold" onPress={() => onApply(picked)} height={48} style={styles.button} />
    </MarketSheet>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  yours: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 17 },
  home: { marginTop: 4 },
  radius: {
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EB5C0A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  list: { marginTop: 17, gap: 8, paddingHorizontal: 16 },
  option: {
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E8EA',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
    paddingRight: 12,
    gap: 12,
  },
  pin: { width: 40, height: 40, borderRadius: 20, backgroundColor: mk.surface, alignItems: 'center', justifyContent: 'center' },
  sub: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  bar: { width: 1, height: 12, backgroundColor: '#C9CDD2', marginHorizontal: 6 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: mk.ink, alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: '#E94E01' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E94E01' },
  button: { marginTop: 15, marginHorizontal: 16 },
});
