import request from '@/utils/request'

// 公共的获取配置接口
export function getConfig(data) {
  return request({
    url: '/common/getConfig',
    method: 'post',
    data
  })
}
