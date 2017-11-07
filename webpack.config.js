const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    watch: true,
    target: 'electron',
    entry: {
        'entry': './app/src/entry.js',
        'main/main': './app/src/main/main.js'
    },
    output: {
        path: __dirname + '/app/build',
        publicPath: 'build/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        }
    )
]

}
