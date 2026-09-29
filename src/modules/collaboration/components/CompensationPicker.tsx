import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { compensationOptions, type CompensationId } from '../data/collaboration';
import { CompensationCard } from './CompensationCard';

/** "Return the Favor" / "Paid Help" choice; the amount field belongs to Paid Help. */
export function CompensationPicker() {
  const [value, setValue] = useState<CompensationId>('paid');
  const [amount, setAmount] = useState('');
  return (
    <View style={styles.stack}>
      {compensationOptions.map((o) => (
        <CompensationCard
          key={o.id}
          title={o.title}
          description={o.description}
          selected={value === o.id}
          onPress={() => setValue(o.id)}
          amount={o.id === 'paid' ? { value: amount, onChangeText: setAmount } : undefined}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 8 },
});
