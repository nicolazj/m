import axios from 'axios';
import id from './id';
export interface Root {
  singerinfo: Singerinfo;
  code: number;
  ts: number;
}

export interface Singerinfo {
  data: Data;
  code: number;
}

export interface Data {
  singerid: number;
  singermid: string;
  singername: string;
  singerintro: string;
  mv_info: MvInfo;
  photos: Photo[];
  starshow: Starshow;
  columons: Columon[];
  musical_groups: any[];
  magzine: Magzine;
  similar_singers: SimilarSinger[];
}

export interface Columon {
  jumpurl: string;
  picurl: string;
  singerid: number;
  subtitle: string;
  subtitle2: string;
  title: string;
}

export interface Magzine {
  total: number;
  v_mgz: VMgz[];
}

export interface VMgz {
  zid: number;
  creator: number;
  creator_avatar: string;
  creator_nick: string;
  creator_viptype: number;
  creator_icon: string;
  title: string;
  front_pic: string;
  create_time: number;
  modify_time: number;
  level: number;
  censor_time: number;
  author: string;
  read_cnt: number;
  fav_cnt: number;
  media_list: MediaList;
  display_tag: string;
  display_tag_style: string;
  follow: number;
  fav: number;
  screator: string;
  display_msg: string;
}

export interface MediaList {
  v_media: VMedia[];
  first_type: number;
  first_display: string;
  all_valid: number;
}

export interface VMedia {
  type: number;
  subtype: number;
  id: number;
  mid: string;
  status: number;
  song: Song;
  mv: Mv;
}

export interface Mv {
  playvid: string;
}

export interface Song {
  flag: number;
}

export interface MvInfo {
  jumpurl: string;
  mvlist: Mvlist[];
}

export interface Mvlist {
  duration: number;
  id: number;
  name: string;
  picurl: string;
  play_cnt: number;
  title: string;
  uploaders: string;
  vid: string;
  singers: Singer[];
}

export interface Singer {
  id: number;
  mid: string;
  name: string;
  picurl: string;
}

export interface Photo {
  photo: string;
  smallphoto: string;
}

export interface SimilarSinger {
  country: string;
  singer_id: number;
  singer_mid: string;
  singer_name: string;
  area_id: number;
  country_id: number;
  other_name: string;
  authentication: number;
  has_production: number;
  trans_name: string;
}

export interface Starshow {
  starshow: number;
  singerid: number;
  showid: number;
  picurl: string;
  showname: string;
  hallname: string;
  showtime: string;
  jumpurl: string;
  price: string;
}

export default async (artistId: string) => {
  const singerid = await id(artistId);
  console.log('singerid', singerid);
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const { data } = await axios.get<Root>(url, {
    params: {
      format: 'json',
      outCharset: 'utf-8',
      data: {
        singerinfo: {
          module: 'music.mb_singer_svr',
          method: 'get_singer_intro',
          param: { singerid: parseInt(singerid, 10) },
        },
      },
    },
  });

  return {
    name: data.singerinfo.data.singername,
    intro: data.singerinfo.data.singerintro,
  };
};
