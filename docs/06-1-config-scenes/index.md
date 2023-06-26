---
title: 配置 多场景(geoView/scenes)
description: mybricks-SPA 引擎在页面搭建时支持通过多场景（画布）的方式进行页面搭建，每个场景（画布）都可以独立的进行页面搭建，也可以通过场景（画布）之间的关联进行页面搭建。
keywords: [Mybricks,Mybricks低代码,低代码,无代码,图形化编程]
sidebar_position: 6.1
---

# 配置 多场景

> **mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
> mybricks-SPA 引擎在页面搭建时支持通过多场景（画布）的方式进行页面搭建，每个场景（画布）都可以独立的进行页面搭建，也可以通过场景（画布）之间的关联进行页面搭建。
>

![img.png](img.png)

### 相关文档

[引擎总体配置概述](../01-config/index.md)<br/>
[布局视图总体配置概述](../06-config-geoview/index.md)<br/>

### geoView 结构视图 中配置使用多场景

代码如下：

```typescript jsx
const config = {
  //...
  geoView: {
    //...
    scenes: {
      presets: [//【非必须】预设的场景列表
        {
          id: 'login',
          title: '登录',
          type: 'popup',
          template: {
            coms: [
              {
                namespace: 'mybricks.basic-comlib.text',
                deletable: false
              }
            ]
          }
        },
        {
          id: 'main',
          title: '主页',
          type: 'normal'
        }
      ],
      adder: [//【非必须】可添加的场景类型
        {
          type: 'popup',
          title: '对话框',
          template: {
            namespace: 'mybricks.basic-comlib.popup',//模版
            deletable: false,
            asRoot: true
          }
        },
        {
          type: 'normal',
          title: '页面'
        }
      ]
    },
  },
  //...
}
```

### scenes/presets 预设场景

> 预设场景，指的是当项目初始化时，默认已经存在的场景。<br/>
>

```typescript jsx
const config = {
  geoView: {
    scenes: {
      presets: [//【非必须】预设的场景列表
        {
          id: 'login',//具名的场景id，在toJSON编译阶段可以根据此id做特定的编译出码
          title: '登录',//场景的标题
          type: 'popup',//类型 popup | normal
          template: { //【非必须】当配置场景模版时，场景中将自动添加模版中的组件
            coms: [//配置多个组件
              {
                namespace: 'mybricks.basic-comlib.text',
                deletable: false//组件不可删除
              }
            ]
          }
        },
        {
          id: 'main',
          title: '主页',
          type: 'normal',
          template: {//配置单个组件
            namespace: 'mybricks.basic-comlib.text',
            deletable: false
          }
        }
      ]
    },
  },
  //...
}
```


### scenes/adder 可添加的场景

> 在布局视图的#图标中可添加的场景菜单<br/>


```typescript jsx
const config = {
  geoView: {
    scenes: {
      adder: [//【非必须】可添加的场景类型
        {
          type: 'popup',
          title: '对话框',
          template: {
            namespace: 'mybricks.basic-comlib.popup',
            deletable: false,
            asRoot: true
          }
        },
        {
          type: 'normal',
          title: '页面'
        }
      ]
    },
  },
}
```

### 场景的类型

#### popup

> popup类型的场景一般用于弹出框，例如对话框、抽屉等。<br/>
> popup场景实际的弹窗交互由模版组件完成，例如上例中配置的
> mybricks.basic-comlib.popup <br/>
> 关于 mybricks.basic-comlib.popup，请参考[组件源码](https://github.com/mybricks/comlib-basic/tree/main/src/popup)

#### normal

> 普通类型的场景


### 场景的模版

```typescript jsx
//类型1
const template1 =  {//【当配置场景模版时，场景中将自动添加模版中的组件
  coms: [//配置多个组件
    {
      namespace: 'mybricks.basic-comlib.text',//组件对应的namespace
      deletable: false//组件不可删除
    }
  ]
}

//类型2
const template2 =  {
  namespace: 'mybricks.basic-comlib.text',//组件对应的namespace
  deletable: false//组件不可删除
}
```

<br/>

**组件属性**
```typescript jsx
const componentInTemplate = {
  namespace: 'mybricks.basic-comlib.text',//【必选】组件对应的namespace
  deletable: false,//组件不可删除
  asRoot: true,//组件作为根组件（场景中只能有一个根组件）
  asFirst: true,//组件作为首个组件（场景中只能有一个首个组件）
  asLast: true,//组件作为最后一个组件（场景中只能有一个最后一个组件）
}

```
