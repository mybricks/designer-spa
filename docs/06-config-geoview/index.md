# 配置 布局视图

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
> 通过配置布局视图(geoView)，定义在布局视图区域中的定位方式、多场景等相关内容。
>

### 相关文档
[使用及总体配置概述](../00-config-overview/index.md)<br/>


### 代码示例

```typescript jsx
const config = {
  //...
  geoView: {
    nav: {float: false},//导航栏（组件库及大纲视图）是否浮动
    type:'mobile',//画布类型 mobile|pc|defined
    layout: 'absolute',//画布默认布局方式 absolute|normal 绝对定位|排版布局
    width: {//初始画布宽度 对象或者数字
      init: 500,
      editable: true//是否可编辑
    },
    height: 400, //同width
    scenes: [//是否开启多场景，支持数组类配置、对象类配置等方式
      {
        id: 'login',//场景id
        title: '登录',//标题
        template: {//模版（非必须）
          coms: [
            {
              namespace: 'mybricks.basic-comlib.text',//模版中的组件namespace
              deletable: false
            }
          ]
        }
      },
      {
        id: 'main',
        title: '主页'
      }
    ],
    template: {//默认模版（非必须）
      coms: [
        {
          namespace: 'mybricks.normal-pc.tabs',
          deletable: false
        }
      ]
    }
  },
  //...
}
```

### 相关配置说明
[多场景详细配置](../06-1-config-scenes/index.md)<br/>
