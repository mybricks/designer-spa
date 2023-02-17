const path = require('path')

const commonCfg = require('./_webpack.dev')

module.exports = Object.assign({
  entry: {
    index: path.resolve(__dirname, `../examples/data-page/index.tsx`),
    preview: path.resolve(__dirname, `../examples/data-page/preview.tsx`)
  }
}, commonCfg)