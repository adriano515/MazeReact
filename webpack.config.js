
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
