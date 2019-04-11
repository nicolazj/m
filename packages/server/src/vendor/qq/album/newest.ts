import axios from 'axios';

export interface Root {
  category: RootCategory;
  focus: Focus;
  new_album: NewAlbum;
  new_album_tag: NewAlbumTag;
  new_song: NewSong;
  playlist: Playlist;
  recomPlaylist: RecomPlaylist;
  toplist: RootToplist;
  code: number;
  ts: number;
}

export interface RootCategory {
  data: CategoryData;
  code: number;
}

export interface CategoryData {
  category: CategoryElement[];
}

export interface CategoryElement {
  group_id: number;
  group_name: string;
  items: Item[];
}

export interface Item {
  item_id: number;
  item_name: string;
  item_desc: string;
  item_new: number;
  item_hot: number;
  show_type: number;
  is_parent: number;
  reimgurl: string;
  item_share_pic: string;
  show_detail: number;
  group_id: number;
}

export interface Focus {
  data: FocusData;
  code: number;
}

export interface FocusData {
  content: Content[];
  id: number;
  sub_cube: any[];
  title: string;
}

export interface Content {
  cover: string;
  id: number;
  jump_info: JumpInfo;
  listen_num: number;
  pic_info: PicInfo;
  report: string;
  sub_title: string;
  title: string;
  type: number;
}

export interface JumpInfo {
  id: number;
  mid: string;
  url: string;
}

export interface PicInfo {
  mid: string;
  url: string;
  urlex1: string;
  urlex2: string;
}

export interface NewAlbum {
  data: NewAlbumData;
  code: number;
}

export interface NewAlbumData {
  albums: AlbumElement[];
  ret_msg: string;
  total: number;
}

export interface AlbumElement {
  area: number;
  company: Company;
  ex: CompanyEx;
  ex_status: number;
  genre: number;
  id: number;
  index: string;
  language: number;
  mid: string;
  movie: string;
  name: string;
  pay: AlbumPay;
  photo: AlbumPhoto;
  release_time: Date;
  singers: AlbumSinger[];
  status: number;
  tag: string;
  tmetags: string;
  trans_name: string;
  type: number;
}

export interface Company {
  ex: CompanyEx;
  id: number;
  name: string;
}

export interface CompanyEx {
  desc: string;
}

export interface AlbumPay {
  payment_album_type: number;
  payment_beg: string;
  payment_discount: number;
  payment_discount_beg: number;
  payment_discount_end: number;
  payment_end: string;
  payment_total: number;
}

export interface AlbumPhoto {
  gaus_pic: string;
  has_photo: number;
}

export interface AlbumSinger {
  area: number;
  birthday: string;
  company: Company;
  country: number;
  enter: number;
  ex: SingerEx;
  foreign_name: string;
  genre: number;
  grade: number;
  id: number;
  identity: number;
  instrument: number;
  mid: string;
  name: string;
  opt_grade: number;
  origin: number;
  photo: SingerPhoto;
  type: number;
}

export interface SingerEx {
  desc: string;
  tag: string;
  wiki: string;
}

export interface SingerPhoto {
  big_photo_flag: string;
  has_photo: number;
  magic_rgb: number;
  photo_cnt: number;
}

export interface NewAlbumTag {
  data: NewAlbumTagData;
  code: number;
}

export interface NewAlbumTagData {
  area: Area[];
}

export interface Area {
  id: number;
  name: string;
  tjreport: string;
}

export interface NewSong {
  data: NewSongData;
  code: number;
}

export interface NewSongData {
  lan: string;
  lanlist: Lanlist[];
  ret_msg: string;
  songlist: Songlist[];
}

export interface Lanlist {
  lan: string;
  name: string;
  tjreport: string;
  type: number;
}

export interface Songlist {
  action: { [key: string]: number };
  album: SonglistAlbum;
  bpm: number;
  data_type: number;
  file: File;
  fnote: number;
  genre: number;
  id: number;
  index_album: number;
  index_cd: number;
  interval: number;
  isonly: number;
  ksong: Ksong;
  label: string;
  language: number;
  mid: string;
  modify_stamp: number;
  mv: Mv;
  name: string;
  pay: SonglistPay;
  singer: SonglistSinger[];
  status: number;
  subtitle: string;
  time_public: Date;
  title: string;
  trace: string;
  type: number;
  url: string;
  version: number;
  volume: Volume;
}

export interface SonglistAlbum {
  id: number;
  mid: string;
  name: string;
  subtitle: string;
  time_public: Date;
  title: string;
}

export interface File {
  b_30s: number;
  e_30s: number;
  hires_bitdepth: number;
  hires_sample: number;
  media_mid: string;
  size_128mp3: number;
  size_192aac: number;
  size_192ogg: number;
  size_24aac: number;
  size_320mp3: number;
  size_48aac: number;
  size_96aac: number;
  size_ape: number;
  size_dts: number;
  size_flac: number;
  size_hires: number;
  size_try: number;
  try_begin: number;
  try_end: number;
  url: string;
}

export interface Ksong {
  id: number;
  mid: string;
}

export interface Mv {
  id: number;
  name: string;
  title: string;
  vid: string;
}

export interface SonglistPay {
  pay_down: number;
  pay_month: number;
  pay_play: number;
  pay_status: number;
  price_album: number;
  price_track: number;
  time_free: number;
}

export interface SonglistSinger {
  id: number;
  mid: string;
  name: string;
  title: string;
  type: number;
  uin: number;
}

export interface Volume {
  gain: number;
  lra: number;
  peak: number;
}

export interface Playlist {
  data: PlaylistData;
  code: number;
}

export interface PlaylistData {
  total: number;
  v_playlist: VPlaylist[];
}

export interface VPlaylist {
  access_num: number;
  album_pic_mid: string;
  censor_remark: any[];
  censor_status: number;
  censor_time: number;
  commit_time: number;
  cover_mid: string;
  cover_url_big: string;
  cover_url_medium: string;
  cover_url_small: string;
  create_time: number;
  creator_info: CreatorInfo;
  creator_uin: number;
  desc: string;
  dirid: number;
  fav_num: number;
  modify_time: number;
  pic_mid: string;
  rcmdcontent: string;
  rcmdtemplate: string;
  score: number;
  song_ids: number[];
  song_types: number[];
  tag_ids: number[];
  tag_names: any[];
  tid: number;
  title: string;
  tjreport: string;
}

export interface CreatorInfo {
  avatar: string;
  is_dj: number;
  nick: string;
  taoge_avatar: string;
  taoge_nick: string;
  uin: number;
  vip_type: number;
}

export interface RecomPlaylist {
  data: RecomPlaylistData;
  code: number;
}

export interface RecomPlaylistData {
  page: number;
  v_hot: VHot[];
}

export interface VHot {
  album_pic_mid: string;
  content_id: number;
  cover: string;
  creator: number;
  edge_mark: string;
  id: number;
  is_dj: boolean;
  is_vip: boolean;
  jump_url: string;
  listen_num: number;
  pic_mid: PicMid;
  rcmdcontent: string;
  rcmdtemplate: string;
  rcmdtype: number;
  singerid: number;
  title: string;
  tjreport: string;
  type: number;
  username: string;
}

export enum PicMid {
  Empty = '',
  The002JezgG1YPbm5 = '002jezgG1yPbm5',
  The004Xsmhh1GedMZ = '004Xsmhh1gedMZ',
}

export interface RootToplist {
  data: ToplistData;
  code: number;
}

export interface ToplistData {
  group: Group[];
}

export interface Group {
  groupId: number;
  groupName: string;
  toplist: ToplistElement[];
  type: number;
}

export interface ToplistElement {
  topId: number;
  recType: number;
  topType: number;
  updateType: number;
  title: string;
  titleDetail: string;
  titleShare: string;
  titleSub: string;
  intro: string;
  cornerMark: number;
  period: string;
  updateTime: string;
  history: History;
  listenNum: number;
  totalNum: number;
  song: Song[];
  headPicUrl: string;
  frontPicUrl: string;
  mbFrontPicUrl: string;
  mbHeadPicUrl: string;
  pcSubTopIds: number[];
  pcSubTopTitles: string[];
  subTopIds: any[];
  adJumpUrl: string;
  h5JumpUrl: string;
  h5JumpKey: string;
  h5JumpParam: string;
  tjreport: string;
  rt: number;
}

export interface History {
  year: number[];
  subPeriod: Array<number[]>;
}

export interface Song {
  rank: number;
  rankType: number;
  rankValue: string;
  recType: number;
  songId: number;
  vid: string;
  albumMid: string;
  title: string;
  singerName: string;
  singerMid: string;
}

export default async () => {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const areas = [1, 2, 3, 4, 5, 6];
  const data = await Promise.all(
    areas.map(area =>
      axios.get<Root>(url, {
        params: {
          format: 'json',
          outCharset: 'utf-8',
          data: {
            new_album: {
              module: 'newalbum.NewAlbumServer',
              method: 'get_new_album_info',
              param: { area, sin: 0, num: 5 },
            },
          },
        },
      })
    )
  );
  function flatten<T>(arr: T[][]): T[] {
    return ([] as T[]).concat(...arr);
  }
  const r = data.map(({ data }) => {
    return data.new_album.data.albums.map(album => ({
      id: album.mid,
      name: album.name,
      singers: album.singers.map(singer => ({
        id: singer.mid,
        name: singer.name,
      })),
    }));
  });
  return {
    album: flatten(r),
  };
};
