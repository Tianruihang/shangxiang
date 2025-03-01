import website from '../config/website'

const keyName = website.key + '-';

export function setStorage(params = {}) {
  let {
    name,
    content,
  } = params;
  name = keyName + name
  let obj = {
    dataType: typeof (content),
    content: content,
    datetime: new Date().getTime()
  }
  // #ifdef H5
  localStorage.setItem(name, JSON.stringify(obj))
  // #endif
  // #ifdef MP-WEIXIN
  wx.setStorageSync(name, JSON.stringify(obj));
  // #endif
  // #ifdef MP-ALIPAY
  my.setStorageSync({ name, data: JSON.stringify(obj) });
  // #endif

  // #ifdef MP-BAIDU
  swan.setStorageSync(name, JSON.stringify(obj));
  // #endif

  // #ifdef MP-TOUTIAO
  tt.setStorageSync(name, JSON.stringify(obj));
  // #endif
}

export function getStorage(params = {}) {
  let {
    name,
    debug
  } = params;
  name = keyName + name
  let obj = '';
  // #ifdef H5
  obj = localStorage.getItem(name)
  // #endif
  // #ifdef MP-WEIXIN
  obj = wx.getStorageSync(name);
  // #endif
  // #ifdef MP-ALIPAY
  obj = my.getStorageSync({ name });
  // #endif
  // #ifdef MP-BAIDU
  obj = swan.getStorageSync(name);
  // #endif
  // #ifdef MP-TOUTIAO
  obj = tt.getStorageSync(name);
  // #endif
  if (obj) {
    obj = JSON.parse(obj)
    return debug ? obj : obj.content
  }
  return ''
}

export function removeStorage(params = {}) {
  let { name } = params
  name = keyName + name
  // #ifdef H5
  return localStorage.removeItem(name)
  // #endif
  // #ifdef MP-WEIXIN
  return wx.removeStorageSync(name)
  // #endif
  // #ifdef MP-ALIPAY
  return my.removeStorageSync({ name })
  // #endif
  // #ifdef MP-BAIDU
  return swan.removeStorageSync(name)
  // #endif
  // #ifdef MP-TOUTIAO
  return tt.removeStorageSync(name)
  // #endif
}