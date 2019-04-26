import { isClient } from '../constants';
import Player from './player';

let player: Player | null = null;

if (isClient) {
  player = new Player();
  player.subscribe(p => {
    // console.log(p);
  });
}

export default player;
