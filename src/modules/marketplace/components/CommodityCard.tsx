import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { homeMarket, type Crop } from '../data/rates';
import { ChangePill, CropHead, Dashed } from './RateParts';
import { Txt } from './Txt';
import { mk } from './tokens';

type CommodityCardProps = { crop: Crop; style?: StyleProp<ViewStyle> };

/** Market name, crop price with change pill and last-updated line (Set Alert sheet, Compare Market). */
export function CommodityCard({ crop, style }: CommodityCardProps) {
  return (
    <View style={[styles.card, style]}>
      <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={22}>
        {homeMarket.name}
      </Txt>
      <Txt size={12.5} color="#565A64" lineHeight={18} style={styles.km}>
        {homeMarket.distance}
      </Txt>
      <Dashed style={styles.dashed} />
      <View style={styles.row}>
        <CropHead crop={crop} />
        <ChangePill text={crop.change} up={crop.up} />
      </View>
      <Txt size={13} color="#353A3F" lineHeight={18} style={styles.updated}>
        {homeMarket.updated}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingTop: 13,
    paddingBottom: 10,
  },
  km: { marginTop: 3 },
  dashed: { marginTop: 11 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  updated: { marginTop: 14 },
});
