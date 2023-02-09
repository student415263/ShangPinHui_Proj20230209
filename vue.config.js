

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')




const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, 
  //关闭自动校验:
  lintOnSave: false, 
  productionSourceMap: false,

  configureWebpack: (config) => {
    const plugins = []
    plugins.push(new NodePolyfillPlugin())
  },
 

  devServer: {       //开启代理服务器 (方式1)   配置多个代理
    proxy: {
      '/api': {       //'/api'是自行设置的请求前缀
        target: 'http://gmall-h5-api.atguigu.cn',
        /* pathRewrite:{'^/api':''}, */  //路径重写，（正则）匹配以api开头的路径为空（将请求前缀删除）
        ws: true,//用于支持websocket
        changeOrigin: true, //用于控制请求头中的host值
      }, 
    },
    
   

  },


})






