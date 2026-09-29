import { Image, StyleSheet, View } from 'react-native';

import { ratingSummary, type Review } from '../data/productDetail';
import { StarIcon } from './StarIcon';
import { Txt } from './Txt';
import { mk } from './tokens';

const TRACK = 75;

export function RatingSummary() {
  return (
    <View style={styles.summary}>
      <View style={styles.average}>
        <Txt size={24} color={mk.ink} lineHeight={34}>
          {ratingSummary.average}
        </Txt>
        <Image source={ratingSummary.starsImage} style={styles.stars} accessibilityLabel="4.5 out of 5 stars" />
        <Txt size={13} color="#232629" lineHeight={18} style={styles.total}>
          {ratingSummary.total}
        </Txt>
      </View>
      <View style={[styles.bars, styles.barsCol]}>
        {ratingSummary.bars.map((b) => (
          <View key={b.star} style={[styles.barRow, { marginLeft: b.shift }]}>
            <Txt size={14} color={mk.ink} lineHeight={18} style={styles.barStar}>
              {b.star}
            </Txt>
            <StarIcon size={12} color={mk.ink} />
            <View style={styles.track}>
              <View style={[styles.fill, { width: b.fill }]} />
            </View>
            <Txt size={14} color={mk.ink} lineHeight={18}>
              {b.count}
            </Txt>
          </View>
        ))}
      </View>
    </View>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Image source={review.avatar} style={styles.avatar} accessibilityLabel={review.name} />
        <View style={styles.who}>
          <Txt size={16.5} color={mk.ink} lineHeight={22}>
            {review.name}
          </Txt>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <StarIcon key={n} size={15} color={n <= review.stars ? mk.orange : '#E3E5E8'} />
            ))}
          </View>
        </View>
        <Txt size={13} color="#232629" lineHeight={18}>
          {review.ago}
        </Txt>
      </View>
      <View style={styles.divider} />
      <View style={styles.chip}>
        <Txt size={13} color={mk.ink} lineHeight={18}>
          {review.chip}
        </Txt>
      </View>
      <Txt size={13} color="#232629" lineHeight={17} style={styles.text}>
        {review.text}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginHorizontal: 16,
    height: 128,
    borderRadius: 16,
    backgroundColor: mk.surface,
    flexDirection: 'row',
    alignItems: 'center',
  },
  average: { width: 137, alignItems: 'center' },
  barsCol: { marginLeft: 17 },
  stars: { width: 77, height: 14, marginTop: 7 },
  total: { marginTop: 7 },
  bars: { gap: 2 },
  barRow: { height: 18, flexDirection: 'row', alignItems: 'center' },
  barStar: { width: 10 },
  track: { width: TRACK, height: 4, borderRadius: 2, backgroundColor: '#E3E5E8', marginLeft: 19, marginRight: 12 },
  fill: { height: 4, borderRadius: 2, backgroundColor: mk.orange },
  card: {
    marginHorizontal: 16,
    height: 196,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 16,
    paddingHorizontal: 11,
  },
  head: { height: 89, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 65, marginLeft: 10, alignSelf: 'flex-start', marginTop: 10.5 },
  who: { flex: 1, marginLeft: 26, gap: 6 },
  starRow: { flexDirection: 'row', gap: 9 },
  divider: { height: 1, backgroundColor: mk.border },
  chip: {
    alignSelf: 'flex-start',
    height: 34,
    marginTop: 15,
    paddingHorizontal: 11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: mk.orange,
    backgroundColor: mk.orangeSurface,
    justifyContent: 'center',
  },
  text: { marginTop: 10 },
});
