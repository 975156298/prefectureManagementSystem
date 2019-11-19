import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/obituary/list',
    method: 'get',
    params
  })
}

export function delData(id) {
  return request({
    url: '/obituary/delData',
    method: 'post',
    data: {
      id
    }
  })
}

export function delMultipleData(data) {
  return request({
    url: '/obituary/delMultipleData',
    method: 'post',
    data
  })
}
