import Vue from 'vue'
import Vuex from 'vuex'
import state from '../datas/state'
import { getEnv } from '../config';

Vue.use(Vuex);

let _state = null;
let _stateName = 'vue-admin';
let _key = "";

function _read() {
  let realKey = `${_stateName}-${getEnv()}-${_key}`;
  try {
    let localState = JSON.parse(localStorage.getItem(realKey));
    if (localState) {
      return Object.assign({}, state || {}, localState);
    }
  } catch (error) {
  }
  return state
}

function _write() {
  if (!_state) {
    return;
  }
  let realKey = `${_stateName}-${getEnv()}-${_key}`;
  localStorage.setItem(realKey, JSON.stringify(_state));
}

export function initState(key) {
  if (_state) {
    return _state;
  }
  _key = key;
  let store = new Vuex.Store({ state: _read(state) })
  store.watch((state) => state, () => { _write() }, { deep: true })
  _state = store.state;
  return _state;
}

export function setState(state) {
  if (!_state) {
    return;
  }
  Object.assign(_state, state || {});
  _write();
}

export function getState(key, def) {
  if (!_state) {
    return def;
  }
  let instant = _state;
  if (key) {
    let keys = key.split('.');
    while (keys.length > 0) {
      instant = instant[keys.shift()];
    }
  }
  return instant || def;
}