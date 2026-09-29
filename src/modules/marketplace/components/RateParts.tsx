import { useState } from 'react';
import { Image, Pressable, StyleSheet, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { ArrowDown2, Notification } from 'iconsax-react-native';

import type { Crop } from '../data/rates';
import { TrendArrow } from './TrendArrow';
import { Txt } from './Txt';
import { mk } from './tokens';

/** 1pt dashed rule (2 on / 2 off), drawn with SVG so the dash rhythm matches Figma. */
export function Dashed({ style, color = '#E6E8EA' }: { style?: StyleProp<ViewStyle>; color?: string }) {
  const [width, setWidth] = useState(0);
  return (
    <View style={[styles.dashed, style]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <Svg width={width} height={1}>
        <Line x1={0} y1={0.5} x2={width} y2={0.5} stroke={color} strokeWidth={1} strokeDasharray="2 2" />
      </Svg>
    </View>
  );
}

type DropdownProps = { options: string[]; style?: StyleProp<ViewStyle> };

/** Grey select pill; each tap advances to the next option. */
export function Dropdown({ options, style }: DropdownProps) {
  const [index, setIndex] = useState(0);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${options[index]}, change`}
      onPress={() => setIndex((i) => (i + 1) % options.length)}
      style={[styles.dropdown, style]}>
      <Txt size={13} color={mk.ink} lineHeight={18}>
        {options[index]}
      </Txt>
      <ArrowDown2 size={16} color={mk.ink} />
    </Pressable>
  );
}

export function DropdownRow({ left, right }: { left: string[]; right: string[] }) {
  return (
    <View style={styles.dropRow}>
      <Dropdown options={left} style={styles.flex} />
      <Dropdown options={right} style={styles.flex} />
    </View>
  );
}

type ChangeProps = { text: string; up: boolean; size?: number };

/** Trend arrow + percentage in green (up) or red (down). */
export function ChangeText({ text, up, size = 15 }: ChangeProps) {
  const color = up ? mk.green : mk.red;
  return (
    <View style={styles.change}>
      <TrendArrow up={up} color={color} />
      <Txt size={size} weight="medium" color={color} lineHeight={20}>
        {text}
      </Txt>
    </View>
  );
}

export function ChangePill({ text, up, height = 36, width = 77 }: ChangeProps & { height?: number; width?: number }) {
  return (
    <View style={[styles.pill, { height, width }, !up && styles.pillDown]}>
      <ChangeText text={text} up={up} size={14.5} />
    </View>
  );
}

export function BellButton({ size, onPress }: { size: number; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Set price alert"
      onPress={onPress}
      style={[styles.bell, { width: size, height: size, borderRadius: size / 2 }]}>
      <Notification size={24} color={mk.ink} />
    </Pressable>
  );
}

export function CropAvatar({ source, size }: { source: ImageSourcePropType; size: number }) {
  return <Image source={source} style={{ width: size, height: size }} />;
}

type CropHeadProps = { crop: Crop; inlineChange?: boolean };

/** Crop disc, name and price; the change sits inline (rates list) or in a pill (detail cards). */
export function CropHead({ crop, inlineChange }: CropHeadProps) {
  return (
    <View style={styles.cropHead}>
      <CropAvatar source={crop.icon} size={48} />
      <View style={styles.cropText}>
        <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={22}>
          {crop.name}
        </Txt>
        <View style={styles.priceRow}>
          <Txt size={15.5} color="#121315" lineHeight={20}>
            {crop.price}
          </Txt>
          {inlineChange ? (
            <>
              <View style={styles.bar} />
              <ChangeText text={crop.change} up={crop.up} />
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
}

/** Yesterday / Weekly Avg / Monthly Avg row with thin vertical separators. */
export function StatTriple({ crop }: { crop: Crop }) {
  const cells = [
    { label: 'Yesterday', value: crop.yesterday },
    { label: 'Weekly/Avg', value: crop.weekly },
    { label: 'Monthly/Avg', value: crop.monthly },
  ];
  return (
    <View style={styles.stats}>
      {cells.map((c, i) => [
        i > 0 ? <View key={`sep-${c.label}`} style={styles.statSep} /> : null,
        <View key={c.label} style={styles.stat}>
          <Txt size={12.5} color="#565A64" lineHeight={18}>
            {c.label}
          </Txt>
          <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20}>
            {c.value}
          </Txt>
        </View>,
      ])}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dashed: { height: 1, alignSelf: 'stretch', overflow: 'hidden' },
  dropRow: { flexDirection: 'row', gap: 17, paddingHorizontal: 16 },
  dropdown: {
    height: 40,
    borderRadius: 12,
    backgroundColor: mk.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 11,
    paddingRight: 13,
  },
  change: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pill: { borderRadius: 12, backgroundColor: mk.gainSurface, alignItems: 'center', justifyContent: 'center' },
  pillDown: { backgroundColor: mk.loseSurface },
  bell: { backgroundColor: mk.surface, alignItems: 'center', justifyContent: 'center' },
  cropHead: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cropText: { marginLeft: 16, gap: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  bar: { width: 1, height: 16, backgroundColor: '#E3E5E8', marginHorizontal: 8 },
  stats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 },
  statSep: { width: 2, height: 20, backgroundColor: '#383C42' },
  stat: { alignItems: 'center', gap: 1 },
});
