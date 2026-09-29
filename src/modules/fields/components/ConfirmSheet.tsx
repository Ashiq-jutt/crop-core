import { StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';

import { ActionButton } from './ActionButton';
import { FieldSheet } from './FieldSheet';
import { font, ink } from './text';

type ConfirmSheetProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  icon: ImageSourcePropType;
  iconSize: number;
  heading: string;
  body: string;
  primary: { label: string; onPress: () => void };
  secondary: { label: string; onPress: () => void };
};

/** Icon + message + two side-by-side actions ("Area Conflict", "Unassigned Area"). */
export function ConfirmSheet({ visible, onClose, title, icon, iconSize, heading, body, primary, secondary }: ConfirmSheetProps) {
  return (
    <FieldSheet visible={visible} onClose={onClose} title={title}>
      <View style={styles.body}>
        <Image source={icon} style={{ width: iconSize, height: iconSize }} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.text}>{body}</Text>
      </View>
      <View style={styles.actions}>
        <ActionButton label={primary.label} onPress={primary.onPress} height={50} style={styles.flex} labelStyle={styles.label} />
        <ActionButton
          label={secondary.label}
          onPress={secondary.onPress}
          variant="outlinePrimary"
          height={50}
          style={styles.flex}
          labelStyle={styles.label}
        />
      </View>
    </FieldSheet>
  );
}

const styles = StyleSheet.create({
  body: { alignItems: 'center', paddingTop: 16 },
  heading: { ...font('medium', 14.5, 22, ink.title), marginTop: 15, textAlign: 'center' },
  text: { ...font('regular', 14.5, 20, ink.body), textAlign: 'center' },
  actions: { flexDirection: 'row', gap: 6, marginTop: 30, marginHorizontal: -1 },
  flex: { flex: 1 },
  label: font('medium', 17, 24),
});
