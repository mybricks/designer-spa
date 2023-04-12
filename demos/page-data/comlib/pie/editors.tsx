export default {
  ':root': [
    {
      title: '标题',
      type: 'text',
      value: {
        get({data, slots, inputs, outputs}) {
          return data.title
        },
        set({data, slots, inputs, outputs}, val) {
          data.title = val
        }
      }
    },
    {
      title: '自定义编辑器',
      type: 'my.test',
      value: {
        get({data, slots, inputs, outputs}) {
          return data.title
        },
        set({data, slots, inputs, outputs}, val) {
          data.title = val
        }
      }
    }
  ]
}