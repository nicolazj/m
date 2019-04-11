import React, { useEffect, useState, ReactType } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSpring, animated } from 'react-spring/native';
import player from '../player';
import { Play, Pause } from '../assets/icons';

function createSpringAnimatedComponent<T extends ReactType<any>>(component: T) {
  return (animated(component) as unknown) as T;
}

const AnimatedView = createSpringAnimatedComponent(View);

const Player = () => {
  const [playerState, setPlayerState] = useState(player.state);

  useEffect(() => {
    player.subscribe(p => {
      setPlayerState({ ...p });
    });
  }, []);

  const { progress, playing, list, cur } = playerState;
  const style: any = useSpring({ height: cur > -1 ? 40 : 0, from: { height: 0 } });

  return (
    <AnimatedView style={[styles.container, style]}>
      <View style={styles.progressbar}>
        <View style={[{ width: `${progress * 100}%` }, styles.progress]} />
      </View>

      <View style={styles.bar}>
        <View />
        <View>
          <Text style={styles.text}>{cur > -1 && list[cur].name}</Text>
        </View>
        <TouchableOpacity style={styles.control} onPress={() => player.pause()}>
          {playing ? <Pause /> : <Play />}
        </TouchableOpacity>
      </View>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#282828',
  },
  progressbar: {
    backgroundColor: '#333',
  },
  progress: {
    height: 2,
    backgroundColor: '#666',
  },
  bar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
  },
  control: {
    width: 24,
    height: 24,
  },
  text: {
    color: '#fff',
  },
});

export default Player;
