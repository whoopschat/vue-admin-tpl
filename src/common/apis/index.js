import { getAPI, postAPI } from '../services/http'

export const getList = (path, params) => {
  return getAPI(`/admin/${path}/list`, params);
}

export const postAdd = (path, item) => {
  return postAPI(`/admin/${path}/add`, item)
}

export const postUpdate = (path, id, item) => {
  return postAPI(`/admin/${path}/update/${id}`, item)
}

export const postDel = (path, id) => {
  return postAPI(`/admin/${path}/delete/${id}`)
}