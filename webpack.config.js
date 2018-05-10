const path = require('path')
const webpack = require('webpack');

module.exports = {
    context:__dirname, /* running this from root directory - ALWAYS */
    entry: [
         'react-hot-loader/patch',
         'webpack-dev-server/client?http://0.0.0.0:8081',
         'webpack/hot/only-dev-server',
        './js/main.jsx'
    ],
    devtool: 'cheap-eval-source-map', /* inline all my source maps into my code */
    output: {
        path: path.join(__dirname, 'public'), /* we will always land in public directory */
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    stats: {
        colors: true, /* color in terminal */
        reasons: true,
        chunks: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
    devServer: {
        hot: true,
        port: 8081,
        host: '0.0.0.0',
        disableHostCheck: true,
        inline: true,
        publicPath: '/public/',
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                enforce: 'pre', /* ensures that it runs before babel */
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    }
}