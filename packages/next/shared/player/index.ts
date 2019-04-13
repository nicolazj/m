import Player from './player';

let player: Player | null = null;

if ((process as any).browser) {
  player = new Player();
  player.subscribe(p => {
    console.log(p);
  });
}

export default player;
