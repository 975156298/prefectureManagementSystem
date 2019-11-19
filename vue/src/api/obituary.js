import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/obituary/list',
    method: 'get',
    params
  })
}
