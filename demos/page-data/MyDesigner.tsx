import React, {useCallback, useRef} from "react";
import {message} from "antd";
import css from "./MyDesigner.less";

//import Designer, {T_DesignerConfig} from '@mybricks/designer-spa';
import servicePlugin, {call as callConnectorHttp} from "@mybricks/plugin-connector-http"; //连接器插件和运行时

const Designer = window.mybricks.SPADesigner

import testLib from './comlib'

const config = {
  plugins: [servicePlugin()],
  comLibLoader(desc) {//加载组件库
    return new Promise((resolve, reject) => {
      resolve([
        testLib
      ])
    })
  },
  geoView: {
    //layout: 'absolute'//按照绝对定位显示布局
  },
  toplView: {
    //display: false
  },
  editView: {
    //width:500,
    editorAppender(props) {//加载自定义编辑器
      const {type} = props
      if (type === 'my.test') {//只实现特定的编辑器
        return <TestEditor {...props}/>
      }
    },
    // render({type, data}) {
    //   if (type === 'default') {
    //     return (
    //       <div>
    //         <h1>默认面板</h1>
    //       </div>
    //     )
    //   } else if (type === 'component') {
    //     return (
    //       <div style={{padding: 10}}>
    //         <h1>组件面板(修改成类似QuickBI的面板）</h1>
    //         <button style={{
    //           border: '1px solid red'
    //         }} onClick={e => {
    //           data.data = [
    //             {
    //               type: '新添加的类型1',
    //               value: 30
    //             },
    //             {
    //               type: '新添加的类型2',
    //               value: 30
    //             }
    //           ]
    //         }}>改变值
    //         </button>
    //       </div>
    //     )
    //   }
    // }
  },
  pageContentLoader() {//加载页面内容
    return new Promise<string>((resolve, reject) => {
      let pageContent = window.localStorage.getItem('--mybricks--')
      if (pageContent) {
        pageContent = JSON.parse(pageContent)

        resolve(pageContent)
      } else {
        resolve(null)
      }
    })
  }
}

export default function MyDesigner() {
  const designerRef = useRef<{ switchActivity, dump, toJSON }>()

  const save = useCallback(() => {//保存
    const json = designerRef.current?.dump()

    window.localStorage.setItem('--mybricks--', JSON.stringify(json))
    message.info(`保存完成`)
  }, [])

  const toJSON = useCallback(() => {
    const json = designerRef.current?.toJSON()
    console.log(json)
  }, [])

  return (
    <>
      <div className={css.show}>
        <div className={css.toolbar}>
          <div className={css.tt}>&lt;数据可视化&gt;</div>
          <div className={css.btns}>
            {/*<button onClick={switchSlider}>激活连接器插件</button>*/}
          </div>
          <button className={css.primary} onClick={save}>保存</button>
          <button onClick={toJSON}>toJSON</button>
        </div>
        <div className={css.designer}>
          <Designer config={config} ref={designerRef}/>
        </div>
      </div>
    </>
  )
}

/**
 * 自定义编辑器
 * @param type 编辑器类型
 * @param options 编辑器配置
 * @param value 获取/设置值
 * @constructor
 */
function TestEditor({type, options, value}) {
  const setValue = useCallback(() => {
    value.set(`新标题-${Math.random()}`)
  }, [])

  return (
    <div>
      <button style={{
        border: '1px solid #EEE',
        backgroundColor: '#FFF',
        padding: '3px 20px',
        margin: 5
      }} onClick={setValue}>测试按钮
      </button>
    </div>
  )
}