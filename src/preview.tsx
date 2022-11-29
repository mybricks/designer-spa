import { render, unmountComponentAtNode } from 'react-dom'
import {render as renderUI} from '@mybricks/render-web'//使用Mybricks-web渲染器

//连接器运行时
import {call} from '@mybricks/plugin-connector-http'

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

function renderMethod (props) {
  render(<Page mainProps={props} />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

function Page({ mainProps }) {
  return (
    <div>
      {
        renderUI(json, {//渲染Mybricks toJSON的结果
          env: {//配置组件运行的各类环境信息
            i18n(text) {//多语言
              return text
            },
            callConnector: call,
            getMainProps: () => { // 获取主应用参数方法，如：token等参数，取决于主应用传入
              return mainProps
            },
            getQuery () { // 获取真实路由参数
              return {}
            },
          },
        })
      }
    </div>
  )
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
 export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  renderMethod(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  unmountComponentAtNode(
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

if (!window.__POWERED_BY_QIANKUN__) { // 非微前端嵌入环境，走默认渲染方式
  renderMethod({})
}