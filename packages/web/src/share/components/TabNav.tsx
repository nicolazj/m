import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Home, Search } from '../assets/icons';
import { Link } from '../router';
function TabNav() {
  return (
    <View style={styles.container}>
      <Link
        style={{ flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'column' }}
        to="/"
      >
        <View style={styles.icon}>
          <Home />
        </View>
        <Text style={styles.text}>Home</Text>
      </Link>
      <Link
        style={{ flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'column' }}
        to="/search"
      >
        <View style={styles.icon}>
          <Search />
        </View>
        <Text style={styles.text}>Search</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#282828',
    borderTopColor: '#000',
    borderTopWidth: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default TabNav;
