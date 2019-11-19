import Mock from 'mockjs'

const data = {
  speciesType: [
    {label: '猴', value: '猴'},
    {label: '龙', value: '龙'},
    {label: '虎', value: '虎'},
    {label: '人', value: '人'}
  ],
  deathMode: [
    {label: '善终', value: '善终'},
    {label: '横死', value: '横死'}
  ]
}

export default [
  {
    url: '/common/getConfig',
    type: 'post',
    response: config => {
      const params = config.body
      const items = {}
      params.config.forEach(item => {
        items[item] = data[item]
      })
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  }
]
