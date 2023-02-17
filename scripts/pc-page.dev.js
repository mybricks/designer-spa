const path = require('path')

const commonCfg = require('./_webpack.dev')

module.exports = Object.assign({
  entry: {
    index: path.resolve(__dirname, `../examples/pc-page/index.tsx`),
    preview: path.resolve(__dirname, `../examples/pc-page/preview.tsx`)
  }
}, commonCfg)