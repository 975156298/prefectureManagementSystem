import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@name',
    'life|1-100': 100,
    'type|1': ['猴', '龙', '虎', '人'],
    'deathMode|1': ['善终', '横死']
  }]
})

export default [
  {
    url: '/obituary/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
