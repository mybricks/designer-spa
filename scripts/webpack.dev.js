const path = require('path')

const ignoreWarningPlugin = require('./ignoreWarningPlugin')

const WebpackBar = require('webpackbar');

const outputPath = path.resolve(__dirname, `../_assets`)

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, `../src/index.tsx`),
    preview: path.resolve(__dirname, `../src/preview.tsx`)
  },
  output: {
    path: outputPath,
    filename: './[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: [{
    'react': {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    },
    'react-dom': {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM"
    },
    'antd': {
      commonjs: 'antd',
      commonjs2: 'antd',
      amd: 'antd',
      root: "antd"
    },
    '@ant-design/icons': 'icons',
    '@ant-design/charts': 'charts',
  }],
  devtool: 'cheap-source-map',//devtool: 'cheap-source-map',
  // resolve: {
  //     alias: {
  //         '@es/spa-designer': require('path').resolve(__dirname, '../'),
  //     }
  // },
  devServer: {
    static: {
      directory: outputPath,
    },
    port: 8000,
    host: '0.0.0.0',
    // compress: true,
    // hot: true,
    client: {
      logging: 'warn',
      // overlay: true,
      // progress: true,
    },
    // open:true,
    proxy: []
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              silent: true,
              transpileOnly: true,
              compilerOptions: {
                module: 'es6',
                target: 'es6'
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /^[^\.]+\.less$/i,
        use: [
          {
            loader: 'style-loader',
            options: {injectType: "singletonStyleTag"},
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:5]'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            },
          }
        ]
      }
    ]
  },
  optimization: {
    concatenateModules: false//name_name
  },
  plugins: [
    new WebpackBar(),
    new ignoreWarningPlugin(),   // All warnings will be ignored
  ]

}