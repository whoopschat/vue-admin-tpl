import Vue from 'vue'
// element-ui
import Element from 'element-ui'
// packages
import UploadImage from './packages/UploadImage'
// style
import '@fortawesome/fontawesome-free/css/all.css'
import 'element-ui/lib/theme-chalk/index.css'
import './themes/all.css';

Vue.use(Element);
Vue.component('e-upload-img', UploadImage);

function _checkWebp() {
    try {
        return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
    } catch (err) {
        return false;
    }
}

const supportWebP = _checkWebp();

export function error(msg, duration = 1500) {
    Element.Message.error({
        message: msg,
        duration: duration
    })
}

export function success(msg, duration = 1500) {
    Element.Message.success({
        message: msg,
        duration: duration
    })
}

export function resizeImage(imageUrl, width, heigth) {
    if (!imageUrl) {
        return;
    }
    let oss_process;
    if (width > 0) {
        if (!oss_process) {
            oss_process = 'x-oss-process=image';
        }
        oss_process += `/resize,w_${width}`;
    }
    if (heigth > 0) {
        if (!oss_process) {
            oss_process = 'x-oss-process=image';
        }
        oss_process += `/resize,h_${heigth}`;
    }
    if (supportWebP) {
        if (!oss_process) {
            oss_process = 'x-oss-process=image';
        }
        oss_process += '/format,webp';
    }
    if (oss_process) {
        if (imageUrl.indexOf('?') >= 0) {
            return imageUrl += `&${oss_process}`;
        } else {
            return imageUrl += `?${oss_process}`;
        }
    }
    return imageUrl;
}

Vue.prototype.error = error;
Vue.prototype.success = success;
Vue.prototype.resizeImage = resizeImage;