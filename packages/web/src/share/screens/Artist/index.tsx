import React, { Suspense } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import Albums from './Albums';
import Songs from './Songs';
import SimilarArtists from './SimilarArtists';

function Artist({ match }: any) {
  const artistID = match.params.id;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cover}>
        <Image
          style={styles.bg}
          source={{
            uri: `//y.gtimg.cn/music/photo_new/T001R800x800M000${artistID}.jpg`,
          }}
        />
      </View>
      <Suspense fallback={null}>
        <Songs artistID={artistID} />
        <Albums artistID={artistID} />
        <SimilarArtists artistID={artistID} />
      </Suspense>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cover: {
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
});
export default Artist;
