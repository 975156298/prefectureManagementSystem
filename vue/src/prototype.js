import Vue from 'vue'

Vue.prototype.FormParams = (objectVal, filterKeys = []) => {
  const newObject = {}
  const keys = Object.keys(objectVal)
  keys.forEach((item) => {
    if (objectVal[item]) {
      newObject[item] = objectVal[item]
    }
  })
  if (filterKeys.length > 0) {
    return Vue.prototype.FilterObjectKey(filterKeys, newObject)
  } else {
    return newObject
  }
}

Vue.prototype.FilterObjectKey = function(keys, objectVal) { // 对象过滤键，keys 为数组
  const newObject = {}
  if (keys instanceof Array && objectVal instanceof Object) {
    for (const key in objectVal) {
      if (keys.indexOf(key) === -1) {
        newObject[key] = objectVal[key]
      }
    }
    return newObject
  }
  return false
}

Vue.prototype.DeepClone = (data) => {
  if (typeof data === 'object') {
    const newData = JSON.stringify(data)
    return JSON.parse(newData)
  }
  return data
}
Vue.prototype.RemoveRepeat = (data) => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data.indexOf(data[i]) !== i) {
      data.splice(i, 1)
    }
  }
  return data
}
