export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
export function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 */
export function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * isPlainObject(new Foo)
 * // => false
 *
 * isPlainObject([1, 2, 3])
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * isPlainObject(Object.create(null))
 * // => true
 */
export function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

function ext(target, source) {
  if (isObject(source) && isObject(target)) {
    for (let key in source) {
      let item = source[key];

      if (isObject(item)) {
        if (isPlainObject(item) && !isPlainObject(target[key])) {
          target[key] = {};
        } else if (Array.isArray(item) && !Array.isArray(target[key])) {
          target[key] = [];
        }

        ext(target[key], item);
      } else {
        target[key] = item;
      }
    }
  }

  return target;
}

export function cloneDeep(obj) {
  if (!isObject(obj)) return obj;

  let result;

  if (Array.isArray(obj)) {
    result = [];

    obj.forEach((item) => {
      result.push(cloneDeep(item));
    });
    return result;
  }

  return ext({}, obj);
}

export function flatDeep(data, rel = []) {
  if (!data) {
    return rel;
  }
  if (!Array.isArray(data)) {
    rel.push(data);
    return rel;
  }
  data.map((item) => {
    if (Array.isArray(item)) {
      return flatDeep(item, rel);
    } else {
      return rel.push(item);
    }
  });
  return rel;
}

/**
 * 追加url参数
 * @param {string} url url参数
 * @param {string|object} key 名字或者对象
 * @param {string} value 值
 * @return {string} 返回新的url
 * @example
 * util.appendQuery('lechebang.com', 'id', 3);
 * util.appendQuery('lechebang.com?key=value', { cityId:2,cityName: '北京'});
 */
export function appendQuery(url, key, value) {
  var options = key;

  if (typeof options == "string") {
    options = {};
    options[key] = value;
  }

  options = param(options);

  if (url.includes("?")) {
    url += "&" + options;
  } else {
    url += "?" + options;
  }

  return url;
}

// 处理查询参数对象, 如果需要拼接在url参数里面，需要自行调用encodeURIComponent(util.param({k: 'v'}))
export function param(query, isEncode = true) {
  let params = [];

  for (let i in query) {
    let value = query[i];

    if (isPlainObject(value)) {
      value = JSON.stringify(value);
    }

    params.push(`${i}=${isEncode ? encodeURIComponent(value) : value}`);
  }

  return params.join("&");
}
// define([], function() {
//   /**
//    * 版本号比较
//    * @param {string} v1 版本号
//    * @param {string} operator  操作符，'>', '>=', '<=', '==', '!='
//    * @param {string} v2 版本号
//    * @return {boolean}
//    * @example
//    * util.compareVersion('1.3.2', '>', '1.2');
//    * util.compareVersion('1.3.2', '>=', '1.2');
//    * util.compareVersion('1.3.2', '==', '1.2');
//    * util.compareVersion('1.3.2', '!=', '1.2');
//    */
//   function compareVersion(v1, operator, v2) {
//     v1 = v1.split('.')
//     v2 = v2.split('.')
//     var maxLen = Math.max(v1.length, v2.length)
//     var cmp = 0
//     var item1, item2

//     for (var i = 0; i < maxLen && !cmp; i++) {
//       item1 = parseInt(v1[i], 10) || 0
//       item2 = parseInt(v2[i], 10) || 0

//       if (item1 < item2) {
//         cmp = 1
//       } else if (item1 > item2) {
//         cmp = -1
//       }
//     }

//     switch (operator) {
//       case '>':
//         return cmp === -1
//       case '>=':
//         return cmp === 0 || cmp == -1
//       case '<':
//         return cmp === 1
//       case '<=':
//         return cmp === 0 || cmp == 1
//       case '==':
//         return cmp === 0
//       case '!=':
//         return cmp !== 0
//     }
//   }
//   /**
//    * Map对象转化成Object对象, 只能转化key数据类型为string的value
//    * @example
//    * let a = new Map([['k1', 'v1'], ['k2', 'v2'], [{}, 'v3']])
//    * convertMapToObj(a)  => { k1: 'v1', k2: 'v2'}
//    */
//   function convertMapToObj(map) {
//     let result = {}

//     for (let [key, value] of map) {
//       if (isString(key)) {
//         result[key] = value
//       }
//     }

//     return result
//   }

//   /**
//  * new Date()传入的字符，不能有'-', 可以用这个函数处理输入的字符串
//  @example
//  new Date(util.timeFormat('2015-03-02'))
//  */
//   function timeFormat(val) {
//     return val.replace(/-/g, '/')
//   }

//   function applyToCall(fn, ctx, args) {
//     switch (args.length) {
//       case 0:
//         return fn.call(ctx)
//       case 1:
//         return fn.call(ctx, args[0])
//       case 2:
//         return fn.call(ctx, args[0], args[1])
//       case 3:
//         return fn.call(ctx, args[0], args[1], args[2])
//       case 4:
//         return fn.call(ctx, args[0], args[1], args[2], args[3])
//       default:
//         return fn.apply(ctx, args)
//     }
//   }

//   function getTypeof(obj) {
//     return Reflect.apply(Object.prototype.toString, obj, []).match(
//       /\s+(\w+)\]$/
//     )[1]
//   }

//   function isPlainObject(obj) {
//     return getTypeof(obj) == 'Object'
//   }

//   function isNumber(obj) {
//     return getTypeof(obj) == 'Number'
//   }

//   function isString(obj) {
//     return getTypeof(obj) == 'String'
//   }

//   function isArray(obj) {
//     return Array.isArray(obj)
//   }

//   function hasValue(obj) {
//     return typeof obj !== 'undefined'
//   }

//   function isFunction(obj) {
//     return getTypeof(obj) == 'Function'
//   }

//   function isDate(obj) {
//     return getTypeof(obj) == 'Date'
//   }

//   function isObject(obj) {
//     return isPlainObject(obj) || Array.isArray(obj)
//   }

//   function isPromise(obj) {
//     return typeof obj === 'object' && obj && 'function' == typeof obj.then
//   }

//   function isUndefined(obj) {
//     return obj === void 0
//   }

//   function isBoolean(obj) {
//     return getTypeof(obj) == 'Boolean'
//   }

//   function pick(obj, keys) {
//     let result = {}

//     if (!obj) {
//       return result
//     }

//     keys.forEach(item => {
//       if (Reflect.has(obj, item)) {
//         result[item] = obj[item]
//       }
//     })

//     return result
//   }

//   function extend(target, ...source) {
//     source.forEach(item => {
//       ext(target, item)
//     })

//     return target
//   }

//   function deleteKey(obj, arr) {
//     arr.forEach(function(item) {
//       Reflect.deleteProperty(obj, item)
//     })

//     return obj
//   }

//   function handlePromiseError(error) {
//     let windowError = require('lizard/util/window.error')
//     if (error instanceof Error) {
//       windowError.sendError(error)

//       return {
//         statusCode: -2,
//         msg: '页面渲染出错啦，我们正在努力恢复^_^'
//       }
//     }

//     if (typeof error === 'string') {
//       return {
//         msg: error,
//         statusCode: -10
//       }
//     }

//     if (!isPlainObject(error)) {
//       return {
//         msg: '未处理的错误',
//         statusCode: -10
//       }
//     }

//     // 小程序错误
//     if (error.errMsg) {
//       error.msg = error.errMsg
//     }

//     return error
//   }

//   function promiseCatch(error) {
//     let { msg, statusCode } = handlePromiseError(error)

//     if (statusCode !== 0) {
//       Lizard.hint(msg)
//     }
//   }

//   function parseNumber(num) {
//     if (num < 10) {
//       return '0' + num
//     } else {
//       return num + ''
//     }
//   }

//   function getCurrentYear() {
//     var now = new Date(Date.now())

//     return now.getFullYear()
//   }

//   /**
//    *
//    */
//   function once(fn) {
//     let done = 0
//     let result

//     return function(...args) {
//       if (done) {
//         fn = null
//         return result
//       }

//       done = 1
//       result = applyToCall(fn, this, args)

//       return result
//     }
//   }

//   /**
//    * 节流: 一定时间内，只触发一次回调
//    * 场景: 监听页面滚动
//    * @link [throttle](https://underscorejs.org/#throttle)
//    * @example
//    * let fn = util.debounce(function() {}, 300)
//    */
//   function throttle(func, wait, options) {
//     var context, args, result
//     var timeout = null
//     var previous = 0
//     if (!options) options = {}
//     function later() {
//       previous = options.leading === false ? 0 : Date.now()
//       timeout = null
//       result = applyToCall(func, context, args)
//       if (!timeout) context = args = null
//     }
//     return function() {
//       var now = Date.now()
//       if (!previous && options.leading === false) previous = now
//       var remaining = wait - (now - previous)
//       context = this
//       args = arguments
//       if (remaining <= 0 || remaining > wait) {
//         if (timeout) {
//           clearTimeout(timeout)
//           timeout = null
//         }
//         previous = now
//         result = applyToCall(func, context, args)
//         if (!timeout) context = args = null
//       } else if (!timeout && options.trailing !== false) {
//         timeout = setTimeout(later, remaining)
//       }
//       return result
//     }
//   }

//   /**
//    * 防抖动: 每次执行，自动清除上次的计时器，延迟指定时间后，执行回调
//    * 场景: 监听input事件，动态返回查询结果
//    * @link [throttle](https://underscorejs.org/#debounce)
//    * @example
//    * let fn = util.debounce(function() {}, 300)
//    */
//   function debounce(func, wait, immediate = false) {
//     var timeout, args, context, timestamp, result

//     function later() {
//       var last = Date.now() - timestamp

//       if (last < wait && last >= 0) {
//         timeout = setTimeout(later, wait - last)
//       } else {
//         timeout = null
//         if (!immediate) {
//           result = applyToCall(func, context, args)
//           if (!timeout) context = args = null
//         }
//       }
//     }

//     return function(...params) {
//       context = this
//       args = params
//       timestamp = Date.now()
//       var callNow = immediate && !timeout
//       if (!timeout) timeout = setTimeout(later, wait)
//       if (callNow) {
//         result = applyToCall(func, context, args)

//         context = args = null
//       }

//       return result
//     }
//   }

//   /**
//    * 追加url参数
//    * @param {string} url url参数
//    * @param {string|object} key 名字或者对象
//    * @param {string} value 值
//    * @return {string} 返回新的url
//    * @example
//    * util.appendQuery('lechebang.com', 'id', 3);
//    * util.appendQuery('lechebang.com?key=value', { cityId:2,cityName: '北京'});
//    */
//   function appendQuery(url, key, value) {
//     var options = key

//     if (typeof options == 'string') {
//       options = {}
//       options[key] = value
//     }

//     options = param(options)

//     if (url.includes('?')) {
//       url += '&' + options
//     } else {
//       url += '?' + options
//     }

//     return url
//   }

//   // 处理查询参数对象, 如果需要拼接在url参数里面，需要自行调用encodeURIComponent(util.param({k: 'v'}))
//   function param(query, isEncode = true) {
//     let params = []

//     for (let i in query) {
//       let value = query[i]

//       if (isPlainObject(value)) {
//         value = JSON.stringify(value)
//       }

//       params.push(`${i}=${isEncode ? encodeURIComponent(value) : value}`)
//     }

//     return params.join('&')
//   }

//   /**
//    * 价格展示单位为元
//    */
//   function priceInt(value) {
//     return parseInt(value / 100, 10)
//   }

//   /**
//    * 如果价格有小数，就用分数展示
//    * @example
//    * priceCent(122) => 1.22
//    * priceCent(120) => 1.2
//    * priceCent(100) => 1
//    */
//   function priceCent(value) {
//     var cent = value % 100

//     if (cent) {
//       value /= 100
//       value = value.toFixed(2)
//       return parseFloat(value) + ''
//     } else {
//       return priceInt(value, 10) + ''
//     }
//   }

//   const ONEDAY = 24 * 60 * 60 * 1000

//   /**
//    * @example
//    * hourToTimestamp('00:01:01')   61000
//    * hourToTimestamp('01:30')   5400000
//    */
//   function hourToTimestamp(value) {
//     let res = value.split(':')

//     return (
//       res.reduce((pre, current, index) => {
//         let factor = Math.pow(60, 2 - index)

//         return pre + parseInt(current, 10) * factor
//       }, 0) * 1000
//     )
//   }

//   /**
//    * @example
//    * timestampToHour(61000)  '00:01:01'
//    * timestampToHour(61000, 2)   '01:01'
//    * timestampToHour(3 * 24 * 60 * 60 * 1000 +   2 * 60 * 60 * 1000 + 61000, 4)   '03:02:01:01'
//    */
//   function timestampToHour(num, depth = 3) {
//     let result = []
//     let factor = [1, 60, 60 * 60, 24 * 60 * 60]

//     num = num / 1000

//     while (depth--) {
//       let current = factor[depth]
//       let remainder = parseInt(num / current, 10)

//       result.push(remainder)

//       num = num - remainder * current
//     }

//     return result.map(item => parseNumber(item)).join(':')
//   }

//   function noop() {}

//   /**
//    * 获取url参数
//    * @param {string} query url参数
//    * @return {object} url参数对象
//    * @example
//    * util.getQuery('lechebang.com?key=value&city=3')
//    * util.getQuery(location.search)
//    * // 如果参数里面有url或者中文，请先自行先encodeURIComponent字符串
//    */
//   function getQuery(query) {
//     var ret = {}
//     var searchReg = /([^&=?]+)=([^&]+)/g
//     var name, value
//     let match = searchReg.exec(query)

//     while (match) {
//       name = match[1]
//       value = match[2]
//       ret[name] = decodeURIComponent(value)
//       match = searchReg.exec(query)
//     }

//     return ret
//   }

//   function getTimeList(start, end, earliestAppointTimeStr) {
//     let startStamp = hourToTimestamp(start),
//       endStamp = hourToTimestamp(end)

//     const timeList = []

//     while (startStamp < endStamp) {
//       const after = startStamp + 30 * 60 * 1000
//       timeList.push({
//         text: `${timestampToHour(startStamp / 60, 2)}-${timestampToHour(
//           after / 60,
//           2
//         )}`,
//         value: startStamp
//       })

//       startStamp = after
//     }
//     if (earliestAppointTimeStr) {
//       let earliestTimestamp = hourToTimestamp(earliestAppointTimeStr)
//       if (earliestTimestamp > timeList[0].value) {
//         return timeList.filter(({ value }) => value >= earliestTimestamp)
//       }
//     }
//     return timeList
//   }

//   function beautifyJSON(obj) {
//     let result
//     try {
//       result = JSON.stringify(
//         obj,
//         function(k, v) {
//           return v
//         },
//         2
//       )
//     } catch (e) {
//       result = ''
//     }

//     return result
//   }

//   // Memoize an expensive function by storing its results.
//   function memoize(func, hasher) {
//     function memory(key) {
//       let cache = memory.cache
//       let address = '' + (hasher ? hasher.apply(this, arguments) : key)

//       if (!Reflect.has(cache, address))
//         cache[address] = func.apply(this, arguments)

//       return cache[address]
//     }

//     memory.cache = {}

//     return memory
//   }
//   function hasWxAuth() {
//     /*let userInfo = Lizard.state.userInfo || false
//     const providers = ['wechat', 'wechat_little_app']

//     return userInfo && providers.includes(userInfo.provider)*/

//     let state = Lizard.state

//     // 登录了， 或者没有登录，但是存在用户信息
//     if (state.isLogin || state.userInfo) return true

//     return false
//   }
//   function reject(msg) {
//     if (isString(msg)) {
//       msg = {
//         msg: msg
//       }
//     }

//     return Promise.reject(msg)
//   }
//   return {
//     compareVersion,
//     convertMapToObj,
//     timeFormat,
//     noop,
//     applyToCall,
//     debounce,
//     pick,
//     extend,
//     guid,
//     getTypeof,
//     isString,
//     isNumber,
//     isObject,
//     isArray,
//     isPlainObject,
//     isFunction,
//     isDate,
//     isUndefined,
//     isBoolean,
//     isPromise,
//     hasValue,
//     cloneDeep,
//     deleteKey,
//     getCurrentYear,
//     parseNumber,
//     handlePromiseError,
//     promiseCatch,
//     throttle,
//     once,
//     appendQuery,
//     param,
//     priceCent,
//     timestampToHour,
//     hourToTimestamp,
//     ONEDAY,
//     getQuery,
//     getTimeList,
//     beautifyJSON,
//     memoize,
//     hasWxAuth,
//     reject
//   }
// })
