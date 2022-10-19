import {createRoot} from '@mybricks/rxui'
import SPADesigner from '@mybricks/designer-spa-base'
import PcEditor from '@fangzhou/pc-editors';

import {memo, useMemo, forwardRef} from "react";

import servicePlugin from '@mybricks/plugin-service'

export default forwardRef((props, ref) => {
  useMemo(() => {
    if (window.antd) {
      window['m-ui'] = window.antd///TODO
    }
  }, [])

  const {config, onMessage, onEdit, onClick} = props

  return (
    <DesignerRender
      {...props}
      _ref={ref}
      _onError_={(ex, type) => {
        console.error(ex)
        if (type === 'render') {
          return (
            <div>
              系统出错了，请及时保存内容
            </div>
          )
        }
      }}/>
  )
})

function DesignerRender({config, _ref}) {
  const myConfig = Object.assign(config || {}, {
    plugins: [servicePlugin],
    // comlibLoader(desc) {//加载组件库
    //   return new Promise((resolve, reject) => {
    //     resolve([testLib])
    //   })
    // },
    // pageContentLoader() {
    //   const pageContent = window.localStorage.getItem('--mybricks--')
    //   return new Promise((resolve, reject) => {
    //     resolve(pageContent ? JSON.parse(pageContent) : null)
    //   })
    // },
    geoView: {
      type: 'pc',
      theme: {
        css: [
          'https://ali-ec.static.yximgs.com/udata/pkg/eshop/fangzhou/pub/pkg/antd-4.16.13/dist/antd.min.css',
          // 'https://ali-ec.static.yximgs.com/udata/pkg/eshop/fangzhou/res/global.7ec1844a853a56ed.css'
        ]
      }
    },
    toplView: {
      title: '交互'
    },
    editView: {
      editorLoader(editConfig) {
        return PcEditor({editConfig, projectData: {}} as any)
      }
    },
    // com: {
    //   env: {
    //     i18n(title) {
    //       return title
    //     },
    //     callConnector(connector, params) {
    //       if (connector.type === 'http') {
    //         return callConnectorHttp({script: connector.script, params})
    //       } else {
    //         return Promise.reject('错误的连接器类型.')
    //       }
    //     },
    //   },
    //   events: [
    //     {
    //       type: 'jump',
    //       title: '跳转到',
    //       exe({options}) {
    //         const page = options.page
    //         if (page) {
    //           window.location.href = page
    //         }
    //       },
    //       options: [
    //         {
    //           id: 'page',
    //           title: '页面',
    //           editor: 'textarea'
    //         }
    //       ]
    //     },
    //   ]
    // }
  })

  const jsx = useMemo(() => {
    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}} ref={el => {
        if (el) {
          createRoot(el).render(
            <SPADesigner config={myConfig}
                         ref={({dump, dumpJSON}) => {
                           _ref.current = {dump, dumpJSON}
                         }}/>)
        }
      }}>
      </div>
    )
  }, [])

  return jsx
}


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