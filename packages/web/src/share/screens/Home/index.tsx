import React, { Suspense } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import NewSong from './NewSong';
import NewAlbum from './NewAlbum';

function Home() {
  return (
    <ScrollView style={styles.container}>
      <Suspense fallback={null}>
        <NewSong />
      </Suspense>

      <Suspense fallback={null}>
        <NewAlbum />
      </Suspense>
    </ScrollView>
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

export default Home;
