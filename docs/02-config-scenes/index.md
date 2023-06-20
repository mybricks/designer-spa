# 配置多场景

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的可视化建模仿真引擎。
>
>本篇文章将介绍如何配置mybricks-SPA引擎，以便于在开发环境中使用。
>


## 相关文档
[引擎总体配置概述](../01-config/index.md)<br/>


#### geoView 结构视图 中配置使用多场景
代码如下：
```typescript jsx
const config = {
  //...
  geoView: {
    //【其他部分参考 配置概述 中的内容】
    scenes: {
      adder: [//可添加的场景类型
        {
          type: 'popup',//popup类型的场景
          title: '对话框',
          template: {
            namespace: 'mybricks.basic-comlib.popup',//场景中的模版
            deletable: false,//不可删除
            asRoot: true//作为根组件
          }
        }
      ]
    },
  },
  //...
}
```