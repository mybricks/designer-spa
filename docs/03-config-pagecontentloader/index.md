---
title: Mybricks-SPA 内容加载器配置
description: 内容加载器(pageContentLoader）是配置引擎加载编辑内容的入口
keywords: [Mybricks,Mybricks低代码,低代码,无代码,图形化编程]
sidebar_position: 3
---

# 配置 内容加载器

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
> 内容加载器(pageContentLoader）是配置引擎加载编辑内容的入口。
>

## 相关文档
[使用及总体配置概述](../00-config-overview/index.md)<br/>


## 代码示例

```typescript jsx
const config = {
  pageContentLoader() {//配置加载页面内容
    const pageContent = window.localStorage.getItem('--mybricks--')//本例中，直接从本地存储中加载
    return new Promise<string>((resolve, reject) => {
      let pageContent = window.localStorage.getItem('--mybricks--')
      if (pageContent) {
        pageContent = JSON.parse(pageContent)

        resolve(pageContent)
      } else {
        resolve(null)
      }
    })
  }
}
```
**注意：**
- 内容加载器必须返回一个Promise对象;
- 加载的内容必须为此前通过ref.dump的内容;
- 如果内容为空，resolve(null)即可;

#### 引擎中保存内容的方法
```typescript jsx
export default function MyApp(){
  const designerRef = useRef()

  const save = useCallback(() => {
    const json = designerRef.current.dump()//通过调用dump方法，获取当前引擎中的内容

    window.localStorage.setItem('--mybricks--', JSON.stringify(json))
    message.info(`保存完成`)
  }, [])
  
  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <div className={css.title}>应用标题</div>
          <div className={css.btns}>
            <button onClick={save}>保存</button>
          </div>
        </div>
        <div className={css.designer}>
          <Designer config={}
                    ref={designerRef}/>
        </div>
      </div>
    </>
  )
}
```