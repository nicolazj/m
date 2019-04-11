import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const Card: React.FC<TouchableOpacityProps> = ({ children, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export const CardEnd: React.FC = ({ children }) => <View style={styles.cardEnd}>{children}</View>;

export const CardBody: React.FC = ({ children }) => <View style={styles.cardBody}>{children}</View>;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
  },
  cardEnd: {
    padding: 5,
  },
  cardBody: { flex: 1, justifyContent: 'space-around' },
});
