import React, {useCallback, useRef, useState, useLayoutEffect} from "react";
import {message} from "antd";
import css from "./MyDesigner.less";

import Designer from '@mybricks/designer';
import servicePlugin, {call as callConnectorHttp} from "@mybricks/plugin-connector-http"; //连接器插件和运行时
import htmlTpt from './pub-tpt.html'

function getConfig ({ projectJson }) {
  return {
    plugins: [servicePlugin()],
    comLibLoader(desc) {//加载组件库
      return new Promise((resolve, reject) => {
        resolve([`https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/5665_1.0.55/2022-11-29_20-46-43/edit.js`])
      })
    },
    editView: {
      // editorLoader(editConfig) {
      //   return PcEditor({editConfig, projectData: {}} as any)
      // }
      items: [ // 扩展页面配置
        {
          title: '调试',
          items: [
            { // 配置调试路由参数，返回为对象结构，存到 projectJson 数据里备用
              title: '路由参数',
              type: 'map', // 键值对类型编辑器
              description: '调试模式下，路由参数配置',
              value: {
                get() {
                  return projectJson.debugQuery
                },
                set(context, v) {
                  projectJson.debugQuery = v
                }
              }
            }
          ]
        }
      ],
    },
    pageContentLoader() {//加载页面内容
      // console.log('pageContentLoader', projectJson)
      return new Promise((resolve, reject) => {
        if (projectJson) {
          resolve(projectJson)
        } else {
          resolve(null)
        }
      })
    },
    geoView: {
      // nav: {float: false},
      theme: {
        css: [
          'https://ali-ec.static.yximgs.com/udata/pkg/eshop/fangzhou/pub/pkg/antd-4.21.6/antd.min.css'
        ]
      }
    },
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
        getQuery () { // 调试路由参数
          return projectJson.debugQuery
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
}

export default function MyDesigner() {
  const designerRef = useRef<{ switchActivity, dump, toJSON }>()
  const [projectJson, setProjectJson] = useState()

  /**
   * @description 获取页面内容数据
   */
  useLayoutEffect(() => {
    const pageContent = window.localStorage.getItem('--mybricks--')
    if (pageContent) {
      setProjectJson(JSON.parse(pageContent))
    }
  }, [])

  const switchSlider = useCallback(() => {
    designerRef.current?.switchActivity('@mybricks/plugins/service')
  }, [])

  /**
   * @description 保存
   */
  const save = useCallback(() => {
    const json = designerRef.current?.dump()

    window.localStorage.setItem('--mybricks--', JSON.stringify(json))
    message.info(`保存完成`)
  }, [])

  /**
   * @description 预览
   */
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

  /**
   * @description 发布
   */
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
          {
            projectJson && <Designer config={getConfig({ projectJson })} ref={designerRef}/>
          }
        </div>
      </div>
    </>
  )
}