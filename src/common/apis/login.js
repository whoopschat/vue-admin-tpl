import { postAPI } from '../services/http'
import { setState } from '../services/state'
import router from '../services/router'

export const logout = () => {
  setState({ userToken: "", userInfo: {}, userLoggedIn: false })
}

export const login = (username, password) => {
  // TODO:这是MOCK登录，请更换为请求接口登录
  if (username == 'admin' && password == 'admin') {
    setState({
      userName: 'admin',
      userInfo: {},
      userToken: 'admin-token',
      userLoggedIn: true
    })
    router.push({ path: '/' })
    return Promise.resolve();
  }
  return postAPI('/admin/user/login', { username, password }).then(function (resp) {
    if (resp.ok) {
      setState({
        userName: username,
        userInfo: resp.data.info || {},
        userToken: resp.data.token,
        userLoggedIn: true
      })
      router.push({ path: '/' })
    }
    return resp
  })
}