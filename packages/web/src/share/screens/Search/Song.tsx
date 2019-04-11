import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import agent from '../../agent';
import audio from '../../audio';

function SongSearch({ match }: any) {
  const [songs, setSongs] = useState<{
    song: { list: { songname: string; songmid: string }[] };
  }>({ song: { list: [] } });

  useEffect(() => {
    let canceled = false;

    const getSong = async (q: string) => {
      const data = await agent.songSearch(q);
      if (!canceled) {
        setSongs(data);
      }
    };
    getSong(match.params.q);
    return () => {
      canceled = true;
    };
  }, []);
  const play = (mid: string) => {};
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text>album</Text>
        {songs.song &&
          songs.song.list.map(song => (
            <View key={song.songmid}>
              <Text>{song.songname}</Text>
              <Button title="play" onPress={() => play(song.songmid)} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    width: 60,
    height: 60,
  },
  container: {
    flex: 1,
  },
});
export default SongSearch;
