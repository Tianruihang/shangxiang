
module.exports = {
    devServer: {
        // port: 8080,
        //配置跨域
        proxy: {
            '/api': {
                //本地服务接口地址
                // target: 'http://127.0.0.1:9872',
                target: 'http://101.126.5.141:9872',
                ws: true,
                changeOrigin: true, // 是否修改请求的来源（以避免跨域问题）
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        },
        // disableHostCheck: true
        
    },
}