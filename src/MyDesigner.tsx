import React, {useCallback, useRef} from "react";
import {message} from "antd";
import css from "./MyDesigner.less";

import Designer from '@mybricks/designer';
import servicePlugin, {call as callConnectorHttp} from "@mybricks/plugin-connector-http"; //连接器插件和运行时
import htmlTpt from './pub-tpt.html'

const config = {
  plugins: [servicePlugin()],
  comLibLoader(desc) {//加载组件库
    return new Promise((resolve, reject) => {
      resolve([`https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/5665_1.0.49/2022-11-23_16-54-39/edit.js `])
      //resolve([testLib])
    })
  },
  // editView: {
  //   editorLoader(editConfig) {
  //     return PcEditor({editConfig, projectData: {}} as any)
  //   }
  // },
  pageContentLoader() {//加载页面内容
    const pageContent = window.localStorage.getItem('--mybricks--')
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
  // geoView: {
  //   nav: {float: false},
  // },
  com: {//组件运行配置
    env: {
      i18n(title) {//多语言
        return title
      },
      callConnector(connector, params) {//调用连接器
        if (connector.type === 'http') {//服务接口类型
          return callConnectorHttp(connector, params, {
            // 发送请求前的钩子函数
            before(options) {
              return {
                ...options
              }
            }
          })
        } else {
          return Promise.reject('错误的连接器类型.')
        }
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

export default function MyDesigner() {
  const designerRef = useRef<{ switchActivity, dump, toJSON }>()

  const switchSlider = useCallback(() => {
    designerRef.current?.switchActivity('@mybricks/plugins/service')
  }, [])

  const save = useCallback(() => {//保存
    const json = designerRef.current?.dump()

    window.localStorage.setItem('--mybricks--', JSON.stringify(json))
    message.info(`保存完成`)
  }, [])

  const preview = useCallback(() => {
    const json = designerRef.current?.toJSON()

    window.localStorage.setItem('--preview--', JSON.stringify(json))

    const win = window.open('', 'preview');
    if (win.location.href === "about:blank") {
      window.open('/preview.html', 'preview')
    } else {
      win.focus()
    }

  }, [])

  const publish = useCallback(() => {
    const title = '我的页面'//页面标题
    const json = designerRef.current?.toJSON()
    let html = htmlTpt.replace(`--title--`, title)//替换
    html = html.replace(`'-projectJson-'`, JSON.stringify(json))//替换

    //-----------------------------------------------

    const linkNode = document.createElement('a')
    linkNode.download = `${title}.html`
    linkNode.style.display = 'none'
    const blob = new Blob([html])
    linkNode.href = URL.createObjectURL(blob)

    document.body.appendChild(linkNode)
    linkNode.click()

    document.body.removeChild(linkNode)
  }, [])

  return (
    <>
      <div className={css.show}>
        <div className={css.toolbar}>
          <div className={css.tt}>&lt;定制您自己的无代码设计解决方案&gt;</div>
          <div className={css.btns}>
            {/*<button onClick={switchSlider}>激活连接器插件</button>*/}
          </div>
          <button className={css.primary} onClick={save}>保存</button>
          <button onClick={preview}>预览</button>
          <button onClick={publish}>发布到本地</button>
        </div>
        <div className={css.designer}>
          <Designer config={config} ref={designerRef}/>
        </div>
      </div>
    </>
  )
}