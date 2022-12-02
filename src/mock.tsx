import React, {useRef} from "react";
import css from "./MyDesigner.less";
import {render} from 'react-dom'
import Designer from '@mybricks/designer';
import servicePlugin, {mock} from "@mybricks/plugin-connector-http"; //连接器插件和运行时


const config = {
  plugins: [servicePlugin()],
  comLibLoader(desc) {//加载组件库
    return new Promise((resolve, reject) => {
      resolve([`https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/5665_1.0.17/2022-11-02_17-27-26/edit.js`])
      //resolve([testLib])
    })
  },
  pageContentLoader() {//加载页面内容
    return new Promise((resolve, reject) => {
      let pageContent = window.localStorage.getItem('--mybricks--')
      if (pageContent) {
        pageContent = JSON.parse(pageContent)

        resolve(pageContent)
      } else {
        // resolve(null)
        // return
        // import('./demo-data.json').then(data => {
        //   pageContent = JSON.parse(JSON.stringify(data))
        //   resolve(pageContent)
        // })

        resolve(null)
      }
    })
  },
  com: {//组件运行配置
    env: {
      i18n(title) {//多语言
        return title
      },
      callConnector(connector) {//调用连接器
        return mock(connector)
      },
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
        },
        options: [
          {
            id: 'page',
            title: '页面',
            editor: 'textarea'
          }
        ]
      },
    ]
  },
}

function MyDesigner() {
  const designerRef = useRef<{ switchActivity, dump, toJSON }>()

  return (
    <>
      <div className={css.show}>
        <div className={css.toolbar}>
          <div className={css.tt}>&lt;定制您自己的无代码设计解决方案&gt;</div>
        </div>
        <div className={css.designer}>
          <Designer config={config} ref={designerRef}/>
        </div>
      </div>
    </>
  )
}

render(
  <MyDesigner/>, document.querySelector('#root')
)
