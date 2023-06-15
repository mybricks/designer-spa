# 编辑器（Editor）与开发自定义编辑器

> Mybricks支持自定义编辑器，开发者可以根据自己的业务场景，开发自己的编辑器，以便于更好的服务于业务。
>

<br/>

## 引擎内置编辑器

> mybricks提供了各类内置的编辑器，以方便在组件开发时直接使用

## mybricks提供的开源编辑库

[Mybricks-PC端通用组件库](https://github.com/mybricks/comlib-pc-normal)

## 自定义编辑器

> mybricks支持开发者自定义编辑器，这些编辑器往往以一组编辑器（编辑库）的方式进行分发使用
>

### 编辑器构成

(以文本编辑器为例)

```typescript jsx
import {useCallback} from "react";

/**
 * 文本编辑器
 *
 * @param EditorProps
 * EditorProps包括以下属性：
 *  value:{ 对当前编辑器的value进行处理
 *    get:()=>any,
 *    set:(val:any)=>void
 *   }
 *  options:any  编辑器配置项
 *  connectors:{ 获取所有连接器
 *    getAll:()=>
 *    {
          id: string,
          type:string,
          title: string,
          inputSchema,//输入schema
          outputSchema,//输出chema
          createTime: number,
          lastModifiedTime: number
        }[] 
 */
export default function ({editConfig}: EditorProps): JSX.Element {
  const {value, options, connectors} = editConfig
  const {get, set} = value

  const [nowValue, updateValue] = useState(get())

  const setValue = useCallback((evt) => {
    const val = evt.target.value
    updateValue(val)
  }, [])

  const saveValue = useCallback(() => {
    set(nowValue)
  }, [nowValue])

  return (
    <div>
      <textarea value={nowValue}
                onChange={setValue}
                onBlur={saveValue}></textarea>
    </div>
  )
}
```

**上面的编辑器在组件中使用用例如下**

```typescript jsx
const editors = {
  ':root': [
    {
      title: '文本',
      type: 'text',
      options: {},
      value: {
        get({data}) {
          return data.text
        }, set({data}, val) {
          data.text = val
        }
      }
    }
  ]
}
```


