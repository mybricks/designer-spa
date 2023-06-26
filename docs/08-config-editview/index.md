---
title: 配置 属性编辑视图(editView)
description: 通过配置编辑视图(editView)，定义在编辑视图中对于编辑器的扩展以及默认的编辑面板
keywords: [Mybricks,Mybricks低代码,低代码,无代码,图形化编程]
sidebar_position: 8
---

# 配置 属性编辑视图

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
> 通过配置编辑视图(editView)，定义在编辑视图中对于编辑器的扩展以及默认的编辑面板。
>

## 相关文档
[使用及总体配置概述](../00-config-overview/index.md)<br/>


## 代码示例

```typescript jsx
const projectData = {}//当前项目的数据，其中保存页面的dump数据等
const config = {
  editView: {
    editorAppender(editConfig) {//【非必须】对编辑器的扩展，该方法可以对已有编辑器进行覆盖
      if(editConfig.type==='abc'){//如果编辑器是abc类型,则返回自定义编辑器
        return AbcEditor({editConfig} as any)
      }
    },
    items({}, cate0, cate1, cate2) {//【非必须】对"项目"编辑面板进行声明，支持最多三个Tabs
      cate0.title = `项目1`//第一个Tab的标题
      cate0.items = [//编辑项声明
        {
          title: '权限方法',
          type: 'textarea',
          value: {
            get() {
              return projectData.permission
            },
            set(context, v: string) {
              projectData.permission = v
            }
          }
        }
      ]
    }
  }
}
```