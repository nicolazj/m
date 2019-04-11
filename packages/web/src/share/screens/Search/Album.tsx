import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import agent from '../../agent';
import { Link } from '../../router';

function albumSearch({ match }: any) {
  const [songs, setSongs] = useState<{
    album: { list: { albumName: string; albumMID: string }[] };
  }>({ album: { list: [] } });

  useEffect(() => {
    let canceled = false;

    const getalbum = async (q: string) => {
      const data = await agent.albumSearch(q);
      if (!canceled) {
        setSongs(data);
      }
    };
    getalbum(match.params.q);
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text>album</Text>
        {songs.album &&
          songs.album.list.map(album => (
            <View key={album.albumMID}>
              <Link to={`/album/${album.albumMID}`}>
                <Text>{album.albumName}</Text>
              </Link>
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
export default albumSearch;
