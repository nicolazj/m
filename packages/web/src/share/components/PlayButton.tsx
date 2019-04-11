import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SText } from '../primitive';

export const PlayButton: React.FC<TouchableOpacityProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.play} onPress={onPress}>
    <Text style={[SText.base, SText.center]}>播放</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  play: {
    backgroundColor: '#1cb953',
    width: 200,
    borderRadius: 100,
    padding: 10,
  },
});

export default PlayButton;
