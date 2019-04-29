import Player from './player';

let player: Player | undefined = undefined;

function getPlayer() {
  return player ? player : (player = new Player());
}

export default getPlayer;
