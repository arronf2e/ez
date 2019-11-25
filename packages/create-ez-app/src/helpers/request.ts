import axios from 'axios';

export function request(url: string) {
  return axios.get(url).then(data => {
    return data.data;
  });
}
