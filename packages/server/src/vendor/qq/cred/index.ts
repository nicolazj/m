import axios from 'axios';
import { parse } from 'url';
import { Cred } from '@m/shared/dist/types';

const refreshURL = 'https://app.jike.ruguoapp.com/1.0/app_auth_tokens.refresh';
const deviceID = 'C6430101-B131-4E38-999F-2FFAEE06FCA7';
const URL =
  'https://app.jike.ruguoapp.com/1.0/mediaMeta/interactive?id=5c9fb40d253e6d0011ceeb17&type=ORIGINAL_POST';
const refreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMUQ4T3EzWDZ2VDhJWmpjTGpjaTBRNjN4dmhtQVNZVks1T01xSld4cjlqUkhhOCtQc1wvWkNvQlVTQjlKa2x4N0c0VnBCOVlDRmVSSzdtb25wVXlHUEIwMldId3ZjbEpqdU44K0N0NHg1UzNySUlGN29QaUhRRnI1TlhXM0ZtOEZkMmo2MmgwUXBvUTZsdFNQeUdJZ1ViNkFEYXNLVTh3WHJXVEZqXC9mdVwvZkdjTFp4MkU0MWs2WFk1SmdXZksrb082NFg3RXdWUVJJWXRoOG50TVBlSmNrM1B2N2lYUXQrQlplTHdwTktIZ1Fvcz0iLCJ2IjozLCJpdiI6IjZkWUFwZ1h0dlhcLzZuSzc0MFZTaTd3PT0iLCJpYXQiOjE1NTQxODM0ODkuNTI3fQ.k20Lgm5G4_3VzMi-mo2KL3AeJSaB-pVUoPqwnQDNK3U';

export default async () => {
  const result = await axios.post(refreshURL, null, {
    headers: {
      'x-jike-refresh-token': refreshToken,
      'x-jike-device-id': deviceID,
    },
  });

  const token = result.data['x-jike-access-token'];
  const { data } = await axios.post(
    URL,
    {
      func: 'fallback',
    },
    {
      headers: {
        'x-jike-access-token': token,
        'x-jike-device-id': deviceID,
      },
    }
  );
  const {
    query: { guid, vkey },
  } = parse(data.url, true);
  return { guid, vkey } as Cred;
};
