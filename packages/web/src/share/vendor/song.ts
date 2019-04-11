export abstract class Song {
  abstract getURL(): string;
}

export abstract class SongQQ extends Song {
  private props: any;
  constructor(props: any) {
    super();
    this.props = props;
  }
  getURL() {
    return this.props.url;
  }
}

export abstract class SongNE extends Song {}
