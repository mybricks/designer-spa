import {render} from 'react-dom'


//连接器运行时
import {call, mock} from '@mybricks/plugin-connector-http'


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

const {render: renderUI} = window._mybricks_render_web

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
            },
            callConnector: mock,
            getQuery() {
              return 'aaa'
            },
            events: [//配置事件
              {
                type: 'jump',
                title: '跳转到',
                exe({options}) {
                  const page = options.page
                  if (page) {
                    window.location.href = page
                  }
                }
              },
            ]
          },
          //observable
        })
      }
    </div>
  )
}