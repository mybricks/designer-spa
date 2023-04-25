const path = require('path')

const commonCfg = require('./webpack.common')

module.exports = Object.assign({
  entry: {
    ['page-pc']: path.resolve(__dirname, `../demos/page-pc/index.tsx`),
    ['page-data']: path.resolve(__dirname, `../demos/page-data/index.tsx`),
    ['preview']: path.resolve(__dirname, `../demos/preview.tsx`),
    ['cloud-component']: path.resolve(__dirname, `../demos/cloud-component/index.tsx`),
  }
}, commonCfg)