
module.exports = {
    devServer: {
        // port: 8080,
        //配置跨域
        proxy: {
            '/api': {
                //本地服务接口地址
                target: 'http://127.0.0.1:9872',
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        // disableHostCheck: true
        
    },
}