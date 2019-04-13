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
  singer: {
    id: string;
    name: string;
  };
}

export interface T_Singer {
  id: string;
  name: string;
}
