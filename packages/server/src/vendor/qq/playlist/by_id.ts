import axios from 'axios';

export interface Root {
  code: number;
  subcode: number;
  accessed_plaza_cache: number;
  accessed_favbase: number;
  login: string;
  cdnum: number;
  cdlist: Cdlist[];
  realcdnum: number;
}

export interface Cdlist {
  disstid: string;
  dirid: number;
  dir_show: number;
  coveradurl: string;
  dissid: number;
  login: string;
  uin: string;
  encrypt_uin: string;
  owndir: number;
  dissname: string;
  logo: string;
  pic_mid: string;
  album_pic_mid: string;
  pic_dpi: number;
  isAd: number;
  desc: string;
  ctime: number;
  mtime: number;
  headurl: string;
  ifpicurl: string;
  nick: string;
  nickname: string;
  type: number;
  singerid: number;
  singermid: string;
  isvip: number;
  isdj: number;
  tags: Tag[];
  songnum: number;
  songids: string;
  songtypes: string;
  disstype: number;
  dir_pic_url2: string;
  song_update_time: number;
  song_update_num: number;
  total_song_num: number;
  song_begin: number;
  cur_song_num: number;
  songlist: Songlist[];
  visitnum: number;
  cmtnum: number;
  buynum: number;
  scoreavage: string;
  scoreusercount: number;
}

export interface Songlist {
  albumdesc: string;
  albumid: number;
  albummid: string;
  albumname: string;
  alertid: number;
  belongCD: number;
  cdIdx: number;
  interval: number;
  isonly: number;
  label: string;
  msgid: number;
  pay: Pay;
  preview: Preview;
  rate: number;
  singer: Singer[];
  size128: number;
  size320: number;
  size5_1: number;
  sizeape: number;
  sizeflac: number;
  sizeogg: number;
  songid: number;
  songmid: string;
  songname: string;
  songorig: string;
  songtype: number;
  strMediaMid: string;
  stream: number;
  switch: number;
  type: number;
  vid: string;
}

export interface Pay {
  payalbum: number;
  payalbumprice: number;
  paydownload: number;
  payinfo: number;
  payplay: number;
  paytrackmouth: number;
  paytrackprice: number;
  timefree: number;
}

export interface Preview {
  trybegin: number;
  tryend: number;
  trysize: number;
}

export interface Singer {
  id: number;
  mid: string;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
  pid: number;
}

export default async (playlistId: String) => {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

  const { data } = await axios.get<Root>(url, {
    params: {
      type: 1,
      json: 1,
      utf8: 1,
      disstid: playlistId,
      format: 'json',
      outCharset: 'utf-8',
      needNewCode: 1,
    },
    headers: {
      Referer: 'https://y.qq.com/portal/playlist.html',
    },
  });

  const cdlist = data.cdlist[0];

  return {
    desc: cdlist.desc,
    id: cdlist.disstid,
    name: cdlist.dissname,
    pic: cdlist.logo,
    songs: cdlist.songlist.map(song => ({
      id: song.songmid,
      name: song.songname,
      album: {
        id: song.albummid,
        name: song.albumname,
      },
      singers: song.singer.map(singer => ({
        id: singer.mid,
        name: singer.name,
      })),
    })),
  };
};
