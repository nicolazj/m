import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';

import agent from '../agent';
import history from '../router/history';
import qs from 'query-string';
import { Card, CardEnd, CardBody } from '../components/Card';
import { ArrowRight } from '../assets/icons';
import player from '../player';

interface Song {
  id: string;
  name: string;
  singer: string;
}
interface Album {
  id: string;
  name: string;
  singer: string;
  pic: string;
}
interface Singer {
  id: string;
  name: string;
  pic: string;
}
interface QuickResult {
  song: Song[];
  album: Album[];
  singer: Singer[];
}

function App(props: any) {
  const [q, setQ] = useState('');
  const [quickResult, setquickResult] = useState<QuickResult>({
    song: [],
    album: [],
    singer: [],
  });
  useEffect(() => {
    const { q } = qs.parse(props.location.search);
    if (q) {
      setQ(q.toString());
    }
  }, []);
  useEffect(() => {
    history.replace(`/search?q=${q}`);

    let canceled = false;
    const search = async (q: string) => {
      const data = await agent.search(q);
      if (!canceled) {
        setquickResult(data);
      }
    };
    q.length && search(q);
    return () => {
      canceled = true;
    };
  }, [q]);

  const handleInput = (e: any) => {
    setQ(e.nativeEvent ? e.nativeEvent.text : e.target.value);
  };
  const play = (song: Song) => {
    player.AddAndPlay({ vendor: 'qq', id: song.id, name: song.name });
  };
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput style={styles.input} value={q} onChange={handleInput} autoFocus />
      </View>
      <ScrollView style={styles.result}>
        {quickResult.song.map(song => (
          <Card key={song.id} onPress={() => play(song)}>
            <CardEnd>
              <Image source={{}} style={styles.image} />
            </CardEnd>
            <CardBody>
              <Text style={styles.text}>{song.name}</Text>
              <Text style={styles.subtext}>歌曲·{song.singer}</Text>
            </CardBody>
          </Card>
        ))}

        {quickResult.album.map(album => (
          <Card
            key={album.id}
            onPress={() => {
              history.push(`/album/${album.id}`);
            }}
          >
            <CardEnd>
              <Image source={{ uri: album.pic }} style={styles.image} />
            </CardEnd>
            <CardBody>
              <Text style={styles.text}>{album.name}</Text>
              <Text style={styles.subtext}>作品·{album.singer}</Text>
            </CardBody>
            <CardEnd>
              <View style={styles.icon}>
                <ArrowRight style={{ fill: 'white' }} />
              </View>
            </CardEnd>
          </Card>
        ))}

        {quickResult.singer.map(singer => (
          <Card
            key={singer.id}
            onPress={() => {
              history.push(`/artist/${singer.id}`);
            }}
          >
            <CardEnd>
              <Image source={{ uri: singer.pic }} style={styles.image} />
            </CardEnd>
            <CardBody>
              <Text style={styles.text}>{singer.name}</Text>
              <Text style={styles.subtext}>艺术家</Text>
            </CardBody>
            <CardEnd>
              <View style={styles.icon}>
                <ArrowRight style={{ fill: 'white' }} />
              </View>
            </CardEnd>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  search: {
    width: '100%',
    padding: 10,
  },
  result: {
    flex: 1,
    width: '100%',
  },
  input: {
    backgroundColor: '#282828',
    borderRadius: 3,
    width: '100%',
    height: 30,
    paddingLeft: 5,
    caretColor: '#1cb953',
    color: '#fff',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    margin: 5,
  },
  text: {
    color: '#fff',
  },
  subtext: {
    color: '#9c9c9c',
    fontSize: 12,
  },
  image: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default App;
