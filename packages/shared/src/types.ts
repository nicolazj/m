export interface T_QQCred {
  guid: string;
  vkey: string;
}

export interface T_Song {
  id: string;
  name: string;
  singers: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
  };
}

export interface T_Album {
  id: string;
  name: string;
  desc: string;
  releaseAt: string;
  songs: T_Song[];
  singer: {
    id: string;
    name: string;
  };
}

export interface T_Singer {
  id: string;
  name: string;
}

export interface T_Playlist {
  id: string;
  name: string;
  pic: string;
}

export interface T_Lyric {
  lines: { time: number; text: string }[];
}

export interface T_SearchResult {
  songs: T_Song[];
  albums: T_Album[];
  singers: T_Singer[];
  playlists: T_Playlist[];
}

export interface T_Track {
  vendor: string;
  song: T_Song;
}

export interface T_PlayerStatus {
  playing: boolean;
  duration: number;
  currentTime: number;
  list: T_Song[];
  cur: number;
}
