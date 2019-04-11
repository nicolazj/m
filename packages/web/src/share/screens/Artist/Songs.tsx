import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import agent from '../../agent';
import { createResource } from '../../cache';
import { Card, CardBody, CardEnd } from '../../components/Card';
import { Dot } from '../../assets/icons';
import player from '../../player';
import { SText } from '../../primitive';

const R = createResource((q: string) => agent.artist(q).songs());

const Songs: React.FC<{ artistID: string }> = ({ artistID }) => {
  const songs = R.read(artistID);
  const play = (song: any) => {
    player.AddAndPlay({ vendor: 'qq', id: song.id, name: song.name });
  };
  return (
    <View>
      <Text style={[SText.base, SText.h2, SText.center]}>热门歌曲</Text>
      {songs.map((song: any) => (
        <Card key={song.id} onPress={() => play(song)}>
          <CardEnd>
            <View style={styles.icon}>
              <Dot style={{ fill: 'white' }} />
            </View>
          </CardEnd>
          <CardBody>
            <Text style={[SText.base]}>{song.name}</Text>
          </CardBody>
        </Card>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 300,
  },
  images: {
    width: 60,
    height: 60,
  },
  container: {
    flex: 1,
    width: '100%',
  },

  icon: {
    height: 16,
    width: 16,
  },
});
export default Songs;
