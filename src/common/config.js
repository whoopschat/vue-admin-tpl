// env
let _env = process.env.VUE_APP_CURRENTMODE || 'qa';
// conf
let _conf = {
  qa: {
    PROD: false,
    API_SERVER: 'http://xxx.com'
  },
  pre: {
    PROD: false,
    API_SERVER: 'http://xxx.com'
  },
  prod: {
    PROD: true,
    API_SERVER: 'http://xxx.com'
  },
}

export function getEnv() {
  return _env;
}

export default _conf[_env];