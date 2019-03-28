'use strict'
const path = require('path')
module.exports = {
    // context: path.resolve(__dirname, '../'),
    entry: {
        app: __dirname + '/src/sw/index.js'
    },
    output: {
        path:__dirname +  '/src',
        filename: 'sw.js'
    },
    module: {
        rules: [  // rules为数组，保存每个加载器的配置
            {
                test: /\.js$/,  // test属性必须配置，值为正则表达式，用于匹配文件
                loader: 'babel-loader',  //
                exclude: /node_module/,  // 对于匹配的文件进行过滤，排除node_module目录下的文件
            }
        ]
    }
}
