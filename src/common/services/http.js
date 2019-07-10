import axios from 'axios'
import router from './router';
import config from '../config'
import { error } from '../comps';
import { getState } from './state'

axios.defaults.timeout = 5000;
axios.defaults.headers['Content-Type'] = 'application/json';

function _handleRequestOnStart(config) {
  for (let key in config.headers) {
    Object.assign(config.headers[key], {
      'Authorization': 'Bearer ' + getState('userToken')
    })
  }
  return config
}

function _handleRequestOnError(request) {
  error('无法连接到服务器');
  if (!config.PROD) {
    console.error('request:fail', request);
  }
  return Promise.resolve({ ok: false });
}

function _handleRequestOnResponse(resp) {
  if (!config.PROD) {
    console.log('request:ok', { url: resp.request.responseURL, data: resp })
  }
  let ok = false;
  if (resp.data.code == 401) {
    error('请先登录');
    router.push({ path: '/login' });
  } else if (resp.data.code != 0) {
    error(resp.data.err || resp.data.msg || '请求失败');
  } else {
    ok = true;
  }
  return Object.assign(resp.data, { ok })
}

axios.interceptors.request.use(_handleRequestOnStart, _handleRequestOnError)
axios.interceptors.response.use(_handleRequestOnResponse, _handleRequestOnError)

export const getAPI = (path, data, opts) => {
  return axios.get(`${config.API_SERVER}${path}`, Object.assign({}, opts, { params: data }))
}

export const postAPI = (path, params = {}, opts) => {
  return axios.post(`${config.API_SERVER}${path}`, JSON.stringify(params), opts)
}

export const putAPI = (path, params = {}, opts) => {
  return axios.put(`${config.API_SERVER}${path}`, JSON.stringify(params), opts)
}

export const deleteAPI = (path, opts) => {
  return axios.delete(`${config.API_SERVER}${path}`, opts)
}
