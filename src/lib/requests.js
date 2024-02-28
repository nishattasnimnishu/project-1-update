import http from './http';
import {LOGIN_URL, UP_KEY} from './const';

const LoginRequest = ({username, password}) => {
  http.postData(LOGIN_URL, {username, password});
};
const createFormData = (photo, body = {}) => {
  var formdata = new FormData();
  formdata.append('key', '00001f594f4d2a4e7b213aad37bc2597');
  formdata.append('media', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });
  // formdata.append('media', photo.uri, photo.fileName);

  return {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };
};
export {LoginRequest, createFormData};
