import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { createResource } from '../../cache';
import agent from '../../agent';
import history from '../../router/history';
import { Tile, TileImg, TileTitle } from '../../components/Tile';
import { SText } from '../../primitive';

const R = createResource((q: string) => agent.artist(q).similar());

const SimilarArtists: React.FC<{ artistID: string }> = ({ artistID }) => {
  const artists = R.read(artistID);

  return (
    <View>
      <Text style={[SText.base, SText.h2, SText.center]}>相似歌手</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {artists.map((artist: any) => (
          <Tile key={artist.id} onPress={() => history.push(`/artist/${artist.id}`)}>
            <TileImg
              source={{
                uri: `//y.gtimg.cn/music/photo_new/T001R800x800M000${artist.id}.jpg`,
              }}
            />
            <TileTitle>{artist.name}</TileTitle>
          </Tile>
        ))}
      </ScrollView>
    </View>
  );
};

export default SimilarArtists;
