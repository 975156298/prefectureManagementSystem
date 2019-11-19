import Mock from 'mockjs'

const data = Mock.mock({
  'items|90': [{
    id: '@id',
    name: '@name',
    createTime: '@datetime',
    'life|1-100': 100,
    deathTime: function() {
      let startStr = this.createTime.slice(0, 4)
      const endStr = this.createTime.slice(4)
      startStr = JSON.parse(startStr) + this.life + ''
      return startStr + endStr
    },
    'type|1': ['猴', '龙', '虎', '人'],
    'deathMode|1': ['善终', '横死']
  }]
})

export default [
  {
    url: '/obituary/list',
    type: 'get',
    response: config => {
      const params = config.query
      const items = data.items.filter(item => {
        return (params.type === '' || params.type === item.type) && (params.mode === '' || params.mode === item.deathMode)
      })
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items.filter((item, index) => {
            return index >= (params.pageNum - 1) * params.pageSize && index < params.pageNum * params.pageSize
          })
        }
      }
    }
  },
  {
    url: '/obituary/delData',
    type: 'post',
    response: config => {
      data.items = data.items.filter(item => {
        return item.id !== config.body.id
      })
      return {
        code: 20000,
        data: {
         message: 'success'
        }
      }
    }
  },
  {
    url: '/obituary/delMultipleData',
    type: 'post',
    response: config => {
      data.items = data.items.filter(item => {
        return config.body.id.indexOf(item.id) === -1
      })
      return {
        code: 20000,
        data: {
          message: 'success'
        }
      }
    }
  }
]
