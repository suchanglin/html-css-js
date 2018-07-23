数据处理



let Util = {}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 洗牌函数
 * 修改的是arr的副本，对本数组不做影响
 * @param {array} arr arr
 */
Util.shuffle = (arr) => {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/**
 * 数组去重
 * @param {*} array 数组
 */
Util.dedupe = (array) => {
  return Array.from(new Set(array))
}

/**
 * 把二维数组拍平
 * @param {*} children 二位数组
 */
Util.simpleNormalizeChildren = (children) => {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

/**
 * 节流函数
 * @param {*} func 函数体
 * @param {*} delay 延时
 */
Util.debounce = (func, delay) => {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export default Util

-----------------------------------------------------------------------------------------------------------

dom相关



let Util = {}

/**
 * 给dom元素添加类名
 * @param {dom} el dom
 * @param {string} className 类名
 */
Util.addClass = (el, className) => {
  el.classList.add(className)
}

/**
 * 判断dom是否有这个类名
 * @param {dom} el dom对象
 * @param {string} className 类名
 */
Util.hasClass = (el, className) => {
  return el.classlist.contains(className)
}

/**
 * 设置或者获取dom元素的data-属性
 * @param {dom} el dom
 * @param {属性} name
 * @param {*} val
 */
Util.getData = (el, name, val) => {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

export default Util



--------------------------------------------------------------------------------------------------



判断是否



let Util = {}

/**
 * 判断是否是手机号
 * @param {string} str 手机号字符串
 */
Util.isMobile = (str) => {
  let chkReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/

  return str !== null && chkReg.test(str)
}

/**
 * 判断是否为iOS设备
 */
Util.isIos = () => {
  return Util.navigator.userAgent.indexOf('iPhone') > -1 || Util.navigator.userAgent.indexOf('Mac') > -1
}

/**
 * 判断是否为安卓设备
 */
Util.isAndroid = () => {
  return Util.navigator.userAgent.indexOf('Android') > -1 || Util.navigator.userAgent.indexOf('Linux') > -1
}


export default Util



