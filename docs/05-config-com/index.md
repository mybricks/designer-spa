---
title: Mybricks-SPA 配置组件的运行环境
description: 通过配置组件的运行环境，可以扩展组件事件、多语言、连接器运行方式等内容
keywords: [Mybricks,Mybricks低代码,低代码,无代码,图形化编程]
sidebar_position: 5
---

# 配置 组件的运行环境

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
> 通过配置组件的运行环境，可以扩展组件事件、多语言、连接器运行方式等内容。
>

## 相关文档
[使用及总体配置概述](../00-config-overview/index.md)<br/>


## 代码示例

```typescript jsx
const config = {
  //...
  com: {//配置组件运行时的环境扩展
    env: {
      i18n(title) {//多语言
        return title
      },
      callConnector(connector, params) {//调用连接器
        if (connector.type === 'http') {//服务接口类型
          return callConnectorHttp(connector, params, {
            // 发送请求前的钩子函数
            before(options) {
              return {
                ...options
              }
            }
          })
        } else {
          return Promise.reject('错误的连接器类型.')
        }
      },
      events: [//扩展除自定义之外的事件
        {
          type: 'jump',
          title: '跳转到',
          exe({options}) {//实际执行时的回调
            const page = options.page
            if (page) {
              window.location.href = page
            }
          },
          options: [
            {
              id: 'page',
              title: '页面',
              editor: 'textarea'
            }
          ]
        },
      ]
    }
  },
  //...
}
```
**注意：**
- 关于callConnector：引擎本身没有定义与外界的具体连接（例如请求接口等），需在此处声明具体的连接方式，例如调用某连接器;
- 关于events：此处的配置将出现在：
  ![img_6.png](img_6.png)