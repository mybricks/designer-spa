export default ({env, outputs}) => {
  if (env.runtime) {//当开始运行
    outputs['datasource']([
      {
        type: '类型1',
        value: 10
      },
      {
        type: '类型2',
        value: 50
      },
      {
        type: '类型3',
        value: 30
      }
    ])
  }
}