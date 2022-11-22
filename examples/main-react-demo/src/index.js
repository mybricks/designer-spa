import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun'

const root = ReactDOM.createRoot(document.getElementById('root'));

/** 
 * 这里以 qiankun 微前端框架接入为例子
 * 更多 API参考 https://qiankun.umijs.org/zh/api
 * **/

// 注册子应用路由
registerMicroApps([
  {
    name: 'reactApp', // 子应用名称
    // 子应用地址，.html / .js  介可
    entry: 'https://ali-ec.static.yximgs.com/kos/nlav12333/fangzhou/pub/fangzhou-fangzhou-pEvCqc/index.20221118.154217.txt',
    container: '#container', // 渲染的容器ID
    activeRule: '/app-react', // 激活路由
    props: { // 传入 token 参数
      token: '123456',
    }
  }
]);
// 启动
start();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
