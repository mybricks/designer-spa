# mybricks-SPA引擎配置

>**mybricks-SPA** 是mybricks引擎家族面向单页应用的企业级设计引擎。
>
>本篇文章将介绍如何配置mybricks-SPA引擎，以便于在开发环境中使用。
>

<br/>

## 引擎在React中的使用
> mybricks-SPA引擎目前提供的是React版本，因此在使用mybricks-SPA引擎之前，需要先了解React的基本使用方法。

```typescript jsx
<Designer config={config} ref={designerRef}/>
//config 引擎配置项，designerRef 引擎实例
```


## 引擎配置（config）部分
mybricks-SPA引擎的配置包括以下两大部分：
### 全局配置
> 全局配置包括了组件库加载器、内容加载器、组件属性扩展等内容

### 视图配置<br/>
mybricks-SPA支持对以下各视图区域进行配置/定制,如下图：<br/>
<img src="./img_5.png" style="width:500px"/><br/>
>V1:侧边栏视图<br/>
>V2:结构视图<br/>
>V3:交互视图<br/>
>V4:状态视图<br/>
>V5:属性视图<br/>
>V6:AI视图<br/>

#### V1:侧边栏视图配置
侧边栏主要由插件构成，配置插件的代码样例如下：
```typescript jsx
import servicePlugin, {call as callConnectorHttp} from "@mybricks/plugin-connector-http";
const config = {
  //...
  plugins: [servicePlugin()],//配置插件
  //...
}
```
> 目前mybricks github上已经开源了几款常用的插件，包括http连接器、debug等插件。

#### V2:结构视图配置
