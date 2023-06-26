# 配置 交互视图

>**mybricks-SPA** 是mybricks引擎家族面向各类页面应用场景的企业级低代码设计引擎。
>
> 通过配置交互视图(toplView)，定义在交互视图区域中的各类卡片、Fx、变量等使用方法。
>

## 相关文档
[使用及总体配置概述](../00-config-overview/index.md)<br/>


## 代码示例

```typescript jsx
const config = {
  //...
  toplView: {
    display: false,//是否显示，可以配置toplView但不显示，这样就可以使用debug功能
    title: '交互',//标题
    cards: {
      main: {//主卡片配置，用于声明global级别的流程定义
        title: '页面',
        ioEditable: true,//inputs、outputs是否可编辑
        inputs: [
          {
            id: 'input0',
            title: '输入0',
            schema: {
              type: 'string'
            }
          }
        ],
        outputs: [
          {
            id: 'output0',
            title: '输出0',
            schema: {
              type: 'number'
            }
          }
        ]
      },
    },
    fx: {},//是否开启fx功能
  },
  //...
}
```