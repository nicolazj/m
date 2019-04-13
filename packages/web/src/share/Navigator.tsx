import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';

import Player from './components/Player';
import TabNav from './components/TabNav';
import { Route, Router } from './router';
import history from './router/history';
import Album from './screens/Album';
import Artist from './screens/Artist';
import Home from './screens/Home';
import Search from './screens/Search';
import SearchAlbum from './screens/Search/Album';
import SearchSong from './screens/Search/Song';
import TopList from './screens/TopList';

const AppNavigator = () => (
  <Router history={history}>
    <View style={styles.container}>
      <Suspense fallback={null}>
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/artist/:id" component={Artist} />
        <Route path="/album/:id" component={Album} />
        <Route path="/search/song/:q" component={SearchSong} />
        <Route path="/search/album/:q" component={SearchAlbum} />
        <Route path="/toplist/:q" component={TopList} />
      </Suspense>
    </View>
    <Player />
    <TabNav />
  </Router>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
export default AppNavigator;
