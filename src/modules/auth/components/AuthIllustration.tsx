import { StyleSheet, View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = { source: ImageSource | number };

/** 148pt circular illustration placed 32pt below the app bar. */
export function AuthIllustration({ source }: Props) {
  return (
    <View style={styles.wrap}>
      <Image source={source} style={styles.image} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingTop: 32 },
  image: { width: 148, height: 148 },
});
