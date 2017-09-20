
module.exports = {
    entry: './app.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-env','react']
                }
            },
            {
                test: /\.json$/, loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }


        ]
    },
    node : {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
