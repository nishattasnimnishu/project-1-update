import Axios from 'axios';
import {UP_KEY} from './const';
const http = {
  getData: (url, token = null) =>
    Axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }),
  postData: (url, data) => Axios.post(url, data),
  postDataToken: (url, data, token) =>
    Axios.post(url, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }),
  postDataImage: (url, data, token) =>
    Axios.post(
      url,
      {...data, key: UP_KEY},
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;',
        },
      },
    ),
  patchData: (url, data, token) =>
    Axios.patch(url, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }),
  deleteData: (url, token) =>
    Axios.delete(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }),
};

export default http;
