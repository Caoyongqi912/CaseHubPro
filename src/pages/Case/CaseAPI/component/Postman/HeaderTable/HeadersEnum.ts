import { API } from '@/api';

const HeadersEnum: API.IObjGet = {
  Host: { text: 'Host', label: 'Host' },
  Accept: { text: 'Accept', label: 'Accept' },
  Authorization: { text: 'Authorization', label: 'Authorization' },
  Connection: { text: 'Connection', label: 'Connection' },
  Cookie: { text: 'Cookie', label: 'Cookie' },
  From: { text: 'From', label: 'From' },
  Referer: { text: 'Referer', label: 'Referer' },
  UserAgent: { text: 'User-Agent', label: 'User-Agent' },
};

export default HeadersEnum;
