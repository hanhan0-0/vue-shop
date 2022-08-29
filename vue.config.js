const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //关闭eslint
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: "http://gmall-h5-api.atguigu.cn",
                //重写路径
                // pathRewrite:{
                //     pathRewrite: {'^/api1': ''}
                // }

            }
        }

    }
})