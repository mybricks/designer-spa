import {render} from 'react-dom'
import {render as renderUI} from '@mybricks/render-web'//使用Mybricks-web渲染器

//准备编译的数据，结构为 {slot,script}，根据 toJSON 导出
let json = localStorage.getItem('--preview--')

if (!json) {
  throw new Error('数据错误')
}

try {
  json = JSON.parse(json)
} catch (ex) {
  throw ex
}


//----------------------------------------------------------------------------

render(<Page/>, document.querySelector('#root'))

function Page() {
  return (
    <div>
      {
        renderUI(json, {//渲染Mybricks toJSON的结果
          env: {//配置组件运行的各类环境信息
            i18n(text) {//多语言
              return text
            }
          }
        })
      }
    </div>
  )
}