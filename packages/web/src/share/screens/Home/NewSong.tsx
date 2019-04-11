import React from 'react';
import { StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import agent from '../../agent';
import player from '../../player';
import { createResource } from '../../cache';
import { Tile, TileImg, TileTitle, TileSubTitle } from '../../components/Tile';
interface Song {
  id: string;
  name: string;
  singers: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
  };
}
interface Data {
  album: {
    id: string;
    name: string;
    singers: { id: string; name: string }[];
  }[];
  song: Song[];
}

const r = createResource(() => agent.newest.songs());
function NewSong() {
  const info: Data = r.read(1);
  const play = (song: Song) => {
    player.AddAndPlay({ vendor: 'qq', id: song.id, name: song.name });
  };
  return (
    <>
      <Text style={styles.title}>新歌</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {info.song.map(song => (
          <Tile key={song.id} onPress={() => play(song)}>
            <TileImg
              source={{
                uri: `//y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.id}.jpg`,
              }}
            />
            <TileTitle>{song.name}</TileTitle>
            <TileSubTitle>{song.singers.map((singer: any) => singer.name).join(',')}</TileSubTitle>
          </Tile>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    margin: 10,
  },
  playlist: {
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
  cover: {
    width: 180,
    height: 180,
  },
});

export default NewSong;
