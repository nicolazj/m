import axios from 'axios';
export default async (artistId: string) => {
  const url = `https://u.y.qq.com/cgi-bin/musicu.fcg`;

  const { data } = await axios.get(url, {
    params: {
      format: 'json',
      data: {
        singerAlbum: {
          method: 'get_singer_album',
          param: { singermid: artistId, order: 'time', begin: 0, num: 999, exstatus: 1 },
          module: 'music.web_singer_info_svr',
        },
      },
    },
  });

  const discs = data.singerAlbum.data.list.map((disc: any) => {
    const { album_mid: id, album_name: name, albumtype: type, desc } = disc;
    return {
      id,
      name,
      type,
      desc,
    };
  });

  return discs;
};
