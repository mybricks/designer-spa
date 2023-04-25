import React, {
  useRef,
  useCallback
} from 'react';

import { message } from 'antd';
/** 云组件编译、转换为可执行函数、渲染库 */
import { compile } from '@mybricks/render-com';

/** 插件，拓展云组件的IO以及编辑能力 */
import io from './plugins/io';

import css from './app.less';

/** 离线状态，搭建数据保存至localStorage */
class Storage {
  pageContentKey = '--mybricks-cloud-component--';

  set (key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  get (key) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  remove (key) {
    return localStorage.removeItem(key);
  }

  savePageContent(content) {
    return this.set(this.pageContentKey, content);
  }

  getPageContent() {
    return this.get(this.pageContentKey);
  }

  clearPageContent() {
    this.remove(this.pageContentKey);
    window.location.reload();
  }
}
const storage = new Storage();
/** 设计引擎 */
const Designer = (window as any).mybricks.SPADesigner;
/** 设计引擎config配置 */
const config = {
  /** 插件扩展，当前demo仅扩展顶层逻辑卡片的IO */
  plugins: [io()],
  /** 组件库加载 */
  comLibLoader() {
    return new Promise<string[]>((resolve) => {
      resolve([`https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/5665_1.1.12/2023-03-31_12-19-17/edit.js`])
    })
  },
  /** 搭建数据初始化 */
  pageContentLoader() {
    return new Promise<string>((resolve) => {
      resolve(storage.getPageContent());
    })
  },
  toplView: {
    title: '交互',
    cards: {
      main: {
        title: '组件',
        /** 可添加输入输出(IO)并修改ID */
        ioEditable: true
      }
    }
  },
}

export default function () {
  const designerRef = useRef<{ dump, toJSON }>(null!);

  /** 保存 */
  const save = useCallback(() => {
    storage.savePageContent(designerRef.current.dump());
    message.info(`保存完成`);
  }, []);

  /** 下载到本地 */
  const download = useCallback(async () => {
    const comJson = await compile({
      title: 'demo云组件',
      version: '1.0.0',
      namespace: 'demo-cloud-component',
      fileId: ''
    }, designerRef.current.toJSON());
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(comJson));
    downloadLink.download = 'com.json';
    downloadLink.click();
  }, []);

  /** 清除本地数据 */
  const clear = useCallback(() => {
    storage.clearPageContent();
  }, []);

  return (
    <div className={css.show}>
      <div className={css.toolbar}>
        <div className={css.tt}>&lt;您自己的应用标题&gt;</div>
        <div className={css.btns}>
        </div>
        <button className={css.primary} onClick={save}>保存</button>
        <button onClick={download}>下载到本地</button>
        <button onClick={clear}>清空本地数据</button>
      </div>
      <div className={css.designer}>
        <Designer config={config} ref={designerRef}/>
      </div>
    </div>
  );
}
