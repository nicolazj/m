import React, { useContext, useEffect, useState, Suspense } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';
import agent from '../../agent';
import history from '../../router/history';
import { createResource } from '../../cache';
import { Tile, TileImg, TileTitle, TileSubTitle } from '../../components/Tile';
import { SText } from '../../primitive';
interface Song {
  id: string;
  name: string;
  singers: {
    id: string;
    name: string;
  };
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

const R = createResource(() => agent.newest.album());
function NewSong() {
  const info: Data = R.read(1);

  return (
    <>
      <Text style={styles.title}>新专辑</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {info.album.map(d => (
          <Tile key={d.id} style={styles.playlist} onPress={() => history.push(`/album/${d.id}`)}>
            <TileImg
              source={{
                uri: `//y.gtimg.cn/music/photo_new/T002R300x300M000${d.id}.jpg?max_age=2592000`,
              }}
            />
            <TileTitle>{d.name}</TileTitle>
            <TileSubTitle>{d.singers.map(singer => singer.name).join(',')}</TileSubTitle>
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
  cover: {
    width: '100%',
    height: '100%',
  },
});

export default NewSong;
