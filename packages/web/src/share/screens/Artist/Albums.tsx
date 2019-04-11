import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import agent from '../../agent';
import { createResource } from '../../cache';
import { Card, CardBody, CardEnd } from '../../components/Card';
import history from '../../router/history';
import { SText } from '../../primitive';
import { Tile, TileImg, TileTitle } from '../../components/Tile';

const R = createResource((q: string) => agent.artist(q).albums());

const Albums: React.FC<{ artistID: string }> = ({ artistID }) => {
  const albums = R.read(artistID);

  return (
    <View>
      <Text style={[SText.base, SText.h2, SText.center]}>专辑</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {albums.map((album: any) => (
          <Tile key={album.id} onPress={() => history.push(`/album/${album.id}`)}>
            <TileImg
              source={{
                uri: `https://y.gtimg.cn/music/photo_new/T002R800x800M000${album.id}.jpg`,
              }}
            />
            <TileTitle>{album.name}</TileTitle>
          </Tile>
        ))}
      </ScrollView>
    </View>
  );
};

export default Albums;
