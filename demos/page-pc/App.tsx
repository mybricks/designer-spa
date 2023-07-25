import React, {useCallback, useRef} from "react";
import {message} from "antd";
import css from "./App.less";

//加载连接器插件
import servicePlugin, {call as callConnectorHttp} from "@mybricks/plugin-connector-http";
import htmlTpt from './pub-tpt.html'

//在window上获取设计器实例
const Designer = window.mybricks.SPADesigner

//import testLib from './comlib'

//在../../targets/page-pc.html中通过script标签加载设计器

/**
 *   <!-- Mybricks-SPA设计引擎 -->
 *   <script type="text/javascript" src="https://f2.beckwai.com/kos/nlav12333/mybricks/designer-spa/1.2.77/index.min.js"></script>
 */

/**
 * 配置设计器
 * 文档地址：https://docs.mybricks.world/
 */
const config = {
  plugins: [servicePlugin()],//配置插件
  comLibLoader(desc) {//配置组件加载器
    return new Promise<string[]>((resolve, reject) => {
      resolve([
        //基础组件库（提供了基础的组件，如：文本、形状、JS计算、类型转换等）
        `https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/7182_1.0.26-main.0/2023-07-18_21-41-33/edit.js`,
        //PC通用组件库（提供了包括表单容器、表格、卡片等等常用的组件）
        `https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/7632_1.2.15/2023-07-20_11-14-04/edit.js`
      ])
      //resolve([testLib])//也可以加载本地组件库
    })
  },
  pageContentLoader() {//配置加载页面内容
    const pageContent = window.localStorage.getItem('--mybricks--')//本例中，直接从本地存储中加载
    return new Promise<string>((resolve, reject) => {
      let pageContent = window.localStorage.getItem('--mybricks--')
      if (pageContent) {
        pageContent = JSON.parse(pageContent)

        resolve(pageContent)
      } else {
        resolve(null)
        // return
        // import('./demo-data.json').then(data => {
        //   pageContent = JSON.parse(JSON.stringify(data))
        //   resolve(pageContent)
        // })
      }
    })
  },
  geoView: {//配置布局视图
    type: 'pc',//pc或mobile
    nav: {float: false},//大纲及组件视图的展现方式
    scenes: {//多场景【非必选】
      adder: [
        {
          type: 'popup',
          title: '对话框',
          template: {
            namespace: 'mybricks.basic-comlib.popup',
            deletable: false,
            asRoot: true
          }
        }
      ]
    },
  },
  toplView: {//如果不需要这个面板，可以注释
    title: '交互',//逻辑交互面板标题
    cards: {//逻辑卡片
      main: {
        title: '页面'
      },
    },
    fx: {},//支持fx
  },
  com: {//配置组件运行时的环境扩展【非必选】
    env: {
      //renderCom: render,
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
    events: [//配置事件【非必选】
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

export default function App() {
  const designerRef = useRef<{ switchActivity, dump, toJSON }>()

  /**
   * 处理引擎消息
   */
  const onMessage = useCallback((type, msg) => {
    message.destroy()
    message[type](msg)
  }, [])

  /**
   * 保存
   */
  const save = useCallback(() => {
    const json = designerRef.current?.dump()

    window.localStorage.setItem('--mybricks--', JSON.stringify(json))
    message.info(`保存完成`)
  }, [])

  /**
   * 预览
   */
  const preview = useCallback(() => {
    //从设计器中获取DSL（JSON）
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
   * 发布（导出）
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
          <div className={css.tt}>&lt;您自己的应用标题&gt;</div>
          <div className={css.btns}>
            {/*<button onClick={switchSlider}>激活连接器插件</button>*/}
          </div>
          <button className={css.primary} onClick={save}>保存</button>
          <button onClick={preview}>预览</button>
          <button onClick={publish}>发布</button>
        </div>
        <div className={css.designer}>
          <Designer config={config}
                    ref={designerRef}
                    onMessage={onMessage}
                    onEdit={(...args) => {//当有编辑动作发生
                      //console.log(args)
                    }}/>
        </div>
      </div>
    </>
  )
}