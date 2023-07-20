---
title: 引擎实例API
description: 介绍如何配置mybricks-SPA引擎，以便于在开发环境中使用
keywords: [Mybricks,Mybricks低代码,低代码,无代码,图形化编程]
sidebar_position: 1
---

# 引擎实例API

> **mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
>本篇文章将介绍通过使用mybricks-SPA引擎实例API，在代码中完成各类操作。
>

<br/>

## 获取引擎实例对象

在页面中使用Mybricks-SPA引擎，通过ref获取引擎实例

```typescript jsx
import React, {useCallback, useRef} from "react";

export default function App() {
  const designerRef = useRef()

  return (
    <Designer config={config} ref={designerRef}/>
  )
}
//config 引擎配置项，designerRef 引擎实例
```

## API

### 设置页面主题（setTheme）

```typescript jsx
designerRef.current.setTheme('newTheme')//newTheme为主题名称
```

组件中可以根据对该主题进行响应

```typescript jsx
export default function ({env}) {
  if (env.canvas.theme === 'newTheme') {
    return (
      <div>风格1</div>
    )
  } else {
    return (
      <div>风格2</div>
    )
  }
}
```