---
title: 引擎总体配置
description: 介绍如何配置mybricks-SPA引擎，以便于在开发环境中使用
keywords: [Mybricks,Mybricks低代码,低代码,无代码,图形化编程]
sidebar_position: 1
---

# 使用引擎实例完成各类操作

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
>本篇文章将介绍如何配置mybricks-SPA引擎，以便于在开发环境中使用。
>

<br/>

## 相关文档
[引擎总体配置概述](../docs/02-config-scenes/index.md)<br/>


## 引擎在React中的使用
> mybricks-SPA引擎目前提供的是React版本，因此在使用mybricks-SPA引擎之前，需要先了解React的基本使用方法。

```typescript jsx
<Designer config={config} ref={designerRef} onMessage={onMessage}/>
//config 引擎配置项，designerRef 引擎实例
```

## 事件监听（on...）部分
mybricks-SPA引擎的监听包括：
```typescript jsx
<SPADesigner config={config}
             ref={designerRef}
             onMessage={onMessage}
             onEdit={onEdit}
             onDebug={onDebug}
/>
```
