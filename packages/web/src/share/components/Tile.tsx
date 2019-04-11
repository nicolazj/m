import React from 'react';
import {
  Text,
  Image,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { SText } from '../primitive';

export const Tile: React.FC<TouchableOpacityProps> = ({ children, onPress }) => (
  <TouchableOpacity style={styles.tile} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export const TileImg: React.FC<ImageProps> = props => <Image style={styles.tileImg} {...props} />;

export const TileTitle: React.FC = ({ children }) => (
  <Text style={[SText.base, SText.center]} ellipsizeMode="tail" numberOfLines={1}>
    {children}
  </Text>
);
export const TileSubTitle: React.FC = ({ children }) => (
  <Text style={[SText.base, SText.sub, SText.center]}>{children}</Text>
);
const styles = StyleSheet.create({
  tile: {
    margin: 10,
    width: 200,
  },
  tileImg: {
    width: 200,
    height: 200,
  },
});
