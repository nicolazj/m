import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import agent from '../agent';
import { Card, CardBody, CardEnd } from '../components/Card';
import PlayButton from '../components/PlayButton';
import { Dot } from '../assets/icons';
import player from '../player';
import { SText } from '../primitive';
import { createResource } from '../cache';
interface Song {
  name: string;
  id: string;
}

const R = createResource((q: string) => agent.toplist(q));
function TopList({ match }: any) {
  const topListId = match.params.q;
  const songs = R.read(topListId);
  const play = (song: Song) => {
    player.setListAndPlay(
      songs.map((song: any) => ({
        vendor: 'qq',
        id: song.id,
        name: song.name,
      })),
      song.id
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.back}>
        <Image
          style={styles.bg}
          source={{
            uri: `//y.gtimg.cn/music/photo_new/T002R800x800M000${topListId}.jpg`,
          }}
        />
      </View>
      <View style={styles.play}>
        <PlayButton onPress={() => play(songs.songs[0])} />
      </View>
      {songs.map((song: any) => (
        <Card key={song.id} onPress={() => play(song)}>
          <CardEnd>
            <View style={styles.icon}>
              <Dot style={{ fill: 'white' }} />
            </View>
          </CardEnd>
          <CardBody>
            <Text style={[SText.base]}>{song.name}</Text>
            <Text style={[SText.base, SText.sub]}>
              {song.singers.map((singer: any) => singer.name).join(',')}
            </Text>
          </CardBody>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  back: {
    // position: 'absolute',
    height: 400,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  bg: {
    width: 300,
    height: 300,
  },
  play: {
    alignItems: 'center',
  },
  images: {
    width: 60,
    height: 60,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: '#fff',
  },
  icon: {
    height: 16,
    width: 16,
  },
});
export default TopList;
