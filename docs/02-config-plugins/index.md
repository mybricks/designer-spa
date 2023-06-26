---
title: Mybricks-SPA 插件配置
description: 通过配置插件，可以扩展引擎的各项能力
keywords: [Mybricks,Mybricks低代码,低代码,无代码,图形化编程]
sidebar_position: 2
---

# 配置 插件

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
> 通过配置插件，可以扩展引擎的各项能力。
>

## 相关文档
[使用及总体配置概述](../00-config-overview/index.md)<br/>


## 代码示例

```typescript jsx
//加载连接器插件
import servicePlugin, {call as callConnectorHttp} from "@mybricks/plugin-connector-http";

const config = {
  plugins:[servicePlugin()]//配置连接器插件
}
```
### 常用插件
[http连接器](https://github.com/mybricks/plugin-connector-http)<br/>
[导入导出工具](https://github.com/mybricks/plugin-tools)<br/>
[领域模型](https://github.com/mybricks/plugin-connector-domain)<br/>


