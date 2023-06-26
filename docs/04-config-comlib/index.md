---
title: 配置 组件库加载器(comLibLoader)及添加方式(comlibAdder)
description: 通过组件库加载器(comLibLoader）与添加器(comlibAdder)，可以配置引擎加载及新增组件库的方式
keywords: [Mybricks,Mybricks低代码,低代码,无代码,图形化编程]
sidebar_position: 4
---

# 配置 组件库加载器及添加方式

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
> 通过组件库加载器(comLibLoader）与添加器(comlibAdder)，可以配置引擎加载及新增组件库的方式。
>

## 相关文档
[使用及总体配置概述](../00-config-overview/index.md)<br/>


## 代码示例

```typescript jsx
const config = {
  comLibLoader(desc) {//当在组件库面板中发生添加、删除、更新组件操作时，通过desc传递命令
    return new Promise<string[]>((resolve, reject) => {
      if (desc) {
        if (desc.cmd === 'addCom') {//添加组件 或 更新组件、删除组件
          const selfLib = {
            comAray: [
              {
                id: 'test',
                title: '测试组件',
                version: '1.0.1',
                namespace: 'test.a',
                runtime() {
                  return (
                    <div>TODO</div>
                  )
                }
              }
            ],
            id: desc.libId,
            title: '我的组件库',
            defined: true
          }

          resolve(selfLib)
        }
        return
      }
      
      resolve([
        `https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/5665_1.1.12/2023-03-31_12-19-17/edit.js`
      ])
    })
  }
  //...
}
```
**注意：**
- 组件库加载器必须返回一个Promise对象;
- 加载的内容可以为 组件库edit地址 或 对象 构成的数组

#### comLibAdder（组件库添加）
```typescript jsx
const config = {
  //...
  comLibAdder(){
    //打开选择组件库的对话框
    //对话框完成后回调：
    return new Promise((resolve) => {
      resolve([`组件库edit.js地址`])
    })
  }
  //...
}
```