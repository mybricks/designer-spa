import React, {useCallback, useRef} from "react";
import {message} from "antd";
import css from "./MyDesigner.less";

import Designer from '@mybricks/designer-spa'

import htmlTpt from './pub-tpt.html'

//import servicePlugin from '@mybricks/plugin-connector-http'


const config = {
  //plugins: [servicePlugin()],
  comlibLoader(desc) {//加载组件库
    return new Promise((resolve, reject) => {
      resolve([`https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/5665_1.0.7/2022-10-18_19-31-09/edit.js`])
      //resolve([testLib])
    })
  },
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
  com: {//组件运行配置
    env: {
      i18n(title) {//多语言
        return title
      },
      callConnector(connector, params) {//调用连接器
        if (connector.type === 'http') {//服务接口类型
          return callConnectorHttp({script: connector.script, params})
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
  const designerRef = useRef<{ switchActivity,dump, toJSON }>()

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

    window.open('/preview.html')
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

//---------------------------------------------------------------------------------

function callConnectorHttp({script, params}) {
  return new Promise((resolve, reject) => {
    try {
      const fn = eval(`(${script})`)
      fn(params, {then: resolve, onError: reject}, {
        ajax(opts) {
          let url = opts.url
          let headers
          let body

          if (opts.method.toUpperCase() === 'GET') {
            if (params) {
              let arr = []
              for (let objKey in params) {
                arr.push(objKey + "=" + params[objKey]);
              }
              url += `?${arr.join("&")}`
            }
          } else if (opts.method.toUpperCase() === 'POST') {
            if (params) {
              body = JSON.stringify(params)
              //headers = {'Content-Type': 'x-www-form-urlencoded;charset=UTF-8'}
              headers = {'Content-Type': 'application/json'}
            }
          }

          return new Promise((resolve1, reject1) => {
            window.fetch(url, {method: opts.method, body, headers})
              .then(response => {
                if (String(response.status).match(/^2\d{2}$/g)) {
                  if (response && typeof response.json === 'function') {
                    try {
                      return response.json()
                    } catch (ex) {
                      reject1(ex.message)
                    }
                  } else {
                    resolve1('')
                  }
                } else {
                  reject1(`服务连接错误（状态码 ${response.status}）`)
                }
              })
              .then(data => {
                resolve1(data)
              })
              .catch(err => {
                reject1(err.message)
              })
          })
        }
      })
    } catch (ex) {
      reject(`连接器script错误.`)
    }
  })
}
